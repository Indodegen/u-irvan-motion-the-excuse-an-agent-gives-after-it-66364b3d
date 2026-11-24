import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const text = readFileSync(entryPath, "utf8");
const line = text.trim();
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry.txt must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry.txt must be a single line (no newline in the middle)");
}
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(out, { recursive: true });
copyFileSync(entryPath, join(out, "entry.txt"));
