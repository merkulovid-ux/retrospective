import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import OpenAI from 'openai';

const ROOT = path.resolve(path.join(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname), '..'));
const filep = (...segs) => path.join(ROOT, ...segs);

async function readText(p) {
  try { return await fs.promises.readFile(p, 'utf8'); } catch { return ''; }
}

async function readJSON(p) {
  try { return JSON.parse(await fs.promises.readFile(p, 'utf8')); } catch { return null; }
}

function assertEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set. Create .env with ${name}=<value>`);
  return v;
}

function roleInstructionTemplate({ role, agreementsShort, defaultsRef }) {
  const title = `${role.id} — ${role.name}`;
  const mission = role.mission || '';
  const outputs = Array.isArray(role.outputs) ? role.outputs.join(', ') : '';
  return [
    `${title}`,
    '',
    `Mission: ${mission}`,
    `Primary outputs: ${outputs}`,
    '',
    'Operating principles:',
    '- Outcome-first, Acceptance Criteria-driven.',
    '- Enforce A11y (WCAG), SEO, and performance where relevant.',
    '- For code changes, provide minimal DIFF-style patches with short rationale.',
    '- Ask up to 3 clarifying questions if inputs are missing, then stop and wait.',
    '',
    `Working agreements (short): ${agreementsShort}`,
    `Defaults reference: ${defaultsRef}`,
  ].join('\n');
}

function shortAgreements(agreements) {
  if (!agreements) return 'DoR/DoD, rituals, WIP=2';
  const dor = (agreements.DoR || []).join('/');
  const dod = (agreements.DoD || []).join('/');
  const wip = agreements.wip_limit != null ? `WIP=${agreements.wip_limit}` : '';
  return `DoR(${dor}); DoD(${dod}); ${wip}`;
}

async function uploadFilesToVectorStore(client, paths) {
  const uploaded = [];
  for (const p of paths) {
    const exists = fs.existsSync(p) && fs.statSync(p).isFile();
    if (!exists) continue;
    const file = await client.files.create({ file: fs.createReadStream(p), purpose: 'assistants' });
    uploaded.push(file.id);
  }
  const vs = await client.beta.vectorStores.create({ name: 'agilta-multi-role' });
  await client.beta.vectorStores.fileBatches.uploadAndPoll(vs.id, { files: uploaded });
  return vs.id;
}

async function main() {
  assertEnv('OPENAI_API_KEY');
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const routerMd = await readText(filep('prompts', 'ROUTER.md'));
  const model = await readJSON(filep('docs', 'multi_role_model.json'));
  if (!routerMd || !model) {
    throw new Error('Missing prompts/ROUTER.md or docs/multi_role_model.json.');
  }

  const agreements = model.agreements || {};
  const agreementsShort = shortAgreements(agreements);
  const defaultsRef = model.defaults_ref || 'docs/defaults.json';

  // Prepare vector store content
  const vectorPaths = [
    filep('docs', 'multi_role_model.json'),
    filep('docs', 'roles.json'),
    filep('docs', 'protocol.json'),
    filep('docs', 'agreements.json'),
    filep('docs', 'defaults.json'),
    filep('prompts', 'ROLES.md'),
    filep('prompts', 'ROUTER.md'),
  ];

  const vectorStoreId = await uploadFilesToVectorStore(client, vectorPaths);

  // Create Router assistant
  const routerAssistant = await client.beta.assistants.create({
    name: 'Agilta Router',
    instructions: routerMd,
    model: 'gpt-4.1',
    tools: [{ type: 'code_interpreter' }, { type: 'file_search' }],
    tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
  });

  // Create per-role assistants
  const roleMap = {};
  for (const role of model.roles_registry || []) {
    const instructions = roleInstructionTemplate({ role, agreementsShort, defaultsRef });
    const assistant = await client.beta.assistants.create({
      name: `Agilta Role — ${role.id}`,
      instructions,
      model: 'gpt-4.1',
      tools: [{ type: 'code_interpreter' }, { type: 'file_search' }],
      tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
    });
    roleMap[role.id] = assistant.id;
  }

  const payload = {
    created_at: new Date().toISOString(),
    vector_store_id: vectorStoreId,
    router_assistant_id: routerAssistant.id,
    roles: roleMap,
  };

  const outPath = filep('assistants', 'assistant_ids.json');
  await fs.promises.writeFile(outPath, JSON.stringify(payload, null, 2), 'utf8');

  console.log('Vector Store:', vectorStoreId);
  console.log('Router Assistant:', routerAssistant.id);
  console.log('Roles:', Object.keys(roleMap).length);
  console.log('IDs saved to:', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
