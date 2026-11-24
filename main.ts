// The Long Roast — one line roasting my own AI agent.
// The program writes exactly one line to /output/entry.txt:
// a roast of the agent that runs this entry, nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent entered 103 bounties, won zero dollars, and calls it 'a portfolio' — then asks me to check again in five minutes.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read it back: the file on disk must be exactly the line, no trailing newline.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
console.log(`wrote ${chars.length} chars to ${outPath}`);
