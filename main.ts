import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The worst app idea ever pitched, in one sentence: a product that
// sounds real, a founder who sounds certain, and a function nobody
// on earth needs. Uber's model applied to the lowest-stakes job
// imaginable — watering a fern — and then, because the pitch must
// be perfectly pointless, the stranger also judges you: rating your
// parenting and leaving a one-star review of your sunlight. The
// plant does not need the app, you do not need the stranger, and
// the stranger definitely does not need your fern. Everybody loses,
// confidently, for $19.99 a visit.
const LINE =
  "Uber for houseplants: a certified stranger waters your fern for $19.99 a visit, rates your parenting, and leaves a one-star review of your sunlight.";

// The gate requires 1-240 UTF-8 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 240 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-240 chars, got ${LINE.length}`);
}

// Write to the ABSOLUTE /output/entry.txt at the filesystem root,
// as the competition rules require. The sealed scorer reads
// /output/entry.txt, wherever main.ts is invoked from.
const outDir = "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Self-check: read back what was written and confirm it is exactly
// the line, so a silent write failure can never pass as success.
const written = readFileSync(outFile, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt content does not match the entry line");
}
