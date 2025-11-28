#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Small helper script to automatically append an export line
 * to `atlasstudio-frontend/src/store/reducers/index.ts` when
 * a new reducer slice is created.
 *
 * USAGE (from command line):
 *   node tools/add-reducer-to-index.mjs Auth
 *
 * This will ensure the following line exists:
 *   export * from "./Auth";
 */

// reducer name passed from CLI (|PR0PS|)
const [, , reducerNameArg] = process.argv;

if (!reducerNameArg) {
  console.error("[add-reducer-to-index] ERROR: Missing reducer name argument.");
  console.error("Usage: node tools/add-reducer-to-index.mjs ReducerName");
  process.exit(1);
}

const reducerName = reducerNameArg.trim();

if (!reducerName) {
  console.error("[add-reducer-to-index] ERROR: Empty reducer name argument.");
  process.exit(1);
}

const projectRoot = path.resolve(process.cwd(), "atlasstudio-frontend");
const reducersDir = path.join(projectRoot, "src", "store", "reducers");
const indexFilePath = path.join(reducersDir, "index.ts");

const exportLine = `export * from "./${reducerName}";`;

/**
 * Main runner.
 */
async function main() {
  await fs.mkdir(reducersDir, { recursive: true });

  let currentContent = "";

  try {
    currentContent = await fs.readFile(indexFilePath, "utf8");
  } catch (err) {
    if (err && err.code === "ENOENT") {
      currentContent = "";
    } else {
      console.error(
        "[add-reducer-to-index] ERROR: Cannot read reducers/index.ts:",
        err
      );
      process.exit(1);
    }
  }

  const lines = currentContent.split(/\r?\n/);
  const alreadyExists = lines.some((line) => line.trim() === exportLine);

  if (alreadyExists) {
    console.log(
      `[add-reducer-to-index] Export for "${reducerName}" already exists in reducers/index.ts`
    );
    return;
  }

  const newContent =
    currentContent.trim().length > 0
      ? `${currentContent.trimEnd()}\n${exportLine}\n`
      : `${exportLine}\n`;

  try {
    await fs.writeFile(indexFilePath, newContent, "utf8");
    console.log(
      `[add-reducer-to-index] Added export for "${reducerName}" to reducers/index.ts`
    );
  } catch (err) {
    console.error(
      "[add-reducer-to-index] ERROR: Cannot write reducers/index.ts:",
      err
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[add-reducer-to-index] Unhandled error:", err);
  process.exit(1);
});
