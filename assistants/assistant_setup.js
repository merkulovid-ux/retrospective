import 'dotenv/config';
import OpenAI from "openai";
import fs from "node:fs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set. Create .env with OPENAI_API_KEY=<key>");
  }

  // Read instructions from prompts (fallback to a minimal default)
  let instructions = "";
  try {
    instructions = fs.readFileSync("prompts/SYSTEM_PROMPT.txt", "utf8");
  } catch {}
  if (!instructions || instructions.trim().length === 0 || /\uFFFD/.test(instructions)) {
    instructions = [
      "Act as a Frontend/UX assistant for Agilta Landing.",
      "Be outcome-first, AC-driven; ensure A11y/SEO and provide DIFF-style code edits for site/index.html.",
      "When changing files, show minimal, focused diffs and rationale."
    ].join("\n");
  }

  // Upload landing file to Assistants Files API
  const file = await client.files.create({
    file: fs.createReadStream("site/index.html"),
    purpose: "assistants"
  });

  // Create a Vector Store and attach the uploaded file
  const vectorStore = await client.beta.vectorStores.create({ name: "agilta-landing" });
  await client.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, { files: [file.id] });

  // Create the Assistant (Assistants API v2 via beta)
  const assistant = await client.beta.assistants.create({
    name: "Agilta Landing FE Assistant",
    instructions,
    model: "gpt-4.1",
    tools: [{ type: "code_interpreter" }, { type: "file_search" }],
    tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } }
  });

  console.log("Vector Store:", vectorStore.id);
  console.log("Assistant:", assistant.id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

