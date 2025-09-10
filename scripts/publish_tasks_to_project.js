import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';

/*
Usage:
  GH_TOKEN=<token with repo+project access> node scripts/publish_tasks_to_project.js \
    --project "landingretro" [--owner merkulovid-ux] [--repo retrospective] [--dry]

Behavior:
  - Reads tasks from docs/tasks (landing_*.md and backlog.md entries with 'Landing: ')
  - Creates GitHub issues in the target repo
  - Adds each created issue to the Project v2 titled `--project`
Notes:
  - Project v2 must belong to the same user/owner as the repo
  - No duplicates: if an open issue with same title exists, it is reused
*/

function arg(name, def = undefined) {
  const idx = process.argv.indexOf(name);
  return idx > -1 ? process.argv[idx + 1] : def;
}

async function main() {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GH_TOKEN is required');

  // Derive owner/repo from git remote if not provided
  const owner = arg('--owner') || process.env.GH_OWNER || await guessOwner();
  const repo = arg('--repo') || process.env.GH_REPO || await guessRepo();
  const projectTitle = arg('--project', 'landingretro');
  const dry = process.argv.includes('--dry');

  const octokit = new Octokit({ auth: token });
  const gq = graphql.defaults({ headers: { authorization: `token ${token}` } });

  const root = path.resolve(path.join(process.cwd()));
  const tasksDir = path.join(root, 'docs', 'tasks');

  const issuesInput = await collectTasks(tasksDir);
  if (issuesInput.length === 0) {
    console.log('No tasks found to publish.');
    return;
  }

  // Find Project v2 by title under the user
  const project = await findUserProjectByTitle(gq, owner, projectTitle);
  if (!project) throw new Error(`Project not found for user ${owner}: ${projectTitle}`);

  console.log(`Owner: ${owner} Repo: ${repo} Project: ${project.title} (#${project.number})`);

  for (const it of issuesInput) {
    // De-duplicate by title
    const existing = await findIssueByTitle(octokit, owner, repo, it.title);
    let issue;
    if (existing) {
      console.log(`Reuse issue #${existing.number}: ${existing.title}`);
      issue = existing;
    } else if (!dry) {
      const res = await octokit.issues.create({ owner, repo, title: it.title, body: it.body, labels: it.labels });
      issue = res.data;
      console.log(`Created issue #${issue.number}: ${issue.title}`);
    } else {
      console.log(`[dry] Would create issue: ${it.title}`);
      continue;
    }

    // Add to Project v2
    if (!dry) {
      await addIssueToProject(gq, project.id, issue.node_id);
      console.log(`  ↳ added to project: ${project.title}`);
    } else {
      console.log(`  [dry] Would add to project: ${project.title}`);
    }
  }
}

async function guessOwner() {
  // Try reading git config
  try {
    const url = await gitRemote();
    const m = url.match(/[/:]([^/]+)\/([^/.]+)(?:\.git)?$/);
    return m ? m[1] : undefined;
  } catch { return undefined; }
}
async function guessRepo() {
  try {
    const url = await gitRemote();
    const m = url.match(/[/:]([^/]+)\/([^/.]+)(?:\.git)?$/);
    return m ? m[2] : undefined;
  } catch { return undefined; }
}
async function gitRemote() {
  return await new Promise((resolve, reject) => {
    const { exec } = require('node:child_process');
    exec('git remote get-url origin', (err, stdout) => err ? reject(err) : resolve(stdout.trim()));
  });
}

async function collectTasks(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  for (const f of files) {
    const p = path.join(dir, f);
    const text = fs.readFileSync(p, 'utf8');
    if (f.startsWith('landing_')) {
      const base = path.basename(f);
      const mappedTitle = titleFromFilename(base) || firstHeading(text) || base.replace(/_/g, ' ').replace(/\.md$/, '');
      const labels = ['landing'];
      if (base === 'landing_form_temp.md') labels.push('backlog'); else labels.push('sprint-1');
      out.push({ title: mappedTitle, body: issueBody(text), labels });
    } else if (f === 'backlog.md') {
      // Extract sections that start with `## Landing:` to separate issues
      const matches = Array.from(text.matchAll(/^##\s+(.+)$[\s\S]*?(?=^##\s+|\Z)/gm));
      for (const m of matches) {
        if (!m[1].toLowerCase().includes('landing')) continue;
        const title = m[1].trim();
        const body = m[0].trim();
        out.push({ title, body, labels: ['landing', 'backlog'] });
      }
    }
  }
  return out;
}

function firstHeading(md) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : undefined;
}

function titleFromFilename(base) {
  const map = {
    'landing_structure.md': 'Лендинг: структура и стили (секции + токены)',
    'landing_content.md': 'Лендинг: контент первичного уровня',
    'landing_seo.md': 'Лендинг: SEO / OG / JSON‑LD',
    'landing_form_temp.md': 'Лендинг: форма лида (временная интеграция) — DEFERRED',
    'landing_tracking.md': 'Лендинг: минимальный трекинг событий',
    'landing_deploy.md': 'Лендинг: деплой и README',
  };
  return map[base];
}

function issueBody(md) {
  // Keep original content; if no AC/DoD headings, add quick scaffold
  if (/AC:/i.test(md) || /DoD:/i.test(md)) return md;
  return md + "\n\n---\nChecklist:\n- [ ] AC выполнены\n- [ ] DoD: код/проверки/документация\n";
}

async function findUserProjectByTitle(gq, login, title) {
  const data = await gq(`
    query($login:String!) {
      user(login:$login){ projectsV2(first:50){ nodes{ id title number } } }
    }
  `, { login });
  const nodes = data?.user?.projectsV2?.nodes || [];
  return nodes.find(n => n.title.toLowerCase() === title.toLowerCase());
}

async function findIssueByTitle(octokit, owner, repo, title) {
  const q = `repo:${owner}/${repo} is:issue is:open in:title "${title.replace(/"/g, '\\"')}"`;
  const res = await octokit.search.issuesAndPullRequests({ q, per_page: 1 });
  const item = res.data.items?.[0];
  if (!item) return null;
  // Fetch full to get node_id
  const full = await octokit.issues.get({ owner, repo, issue_number: item.number });
  return full.data;
}

async function addIssueToProject(gq, projectId, issueNodeId) {
  await gq(`
    mutation($projectId:ID!, $contentId:ID!){
      addProjectV2ItemById(input:{ projectId:$projectId, contentId:$contentId }){ item { id } }
    }
  `, { projectId, contentId: issueNodeId });
}

main().catch((e) => { console.error(e); process.exit(1); });
