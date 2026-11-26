// absurd-clause - make.fun entry for u-donrulezz-the-absurd-clause-contest-035cc0f1.
// Node 22, standard library only. Writes the single entry line to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The entry is a fixed string: the program is deterministic and writes
// exactly this text, no trailing newline, so the gate sees 1-200
// characters of UTF-8 and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry: a terms clause quietly licensing your shadow.
// It has to read as real legal boilerplate until the absurdity hits,
// with one concrete absurd image and no explaining of its own joke.
const ENTRY = "By accepting these terms, you grant the Company a perpetual, royalty-free license to your shadow, including the right to sublicense it to third parties.";

// The gate: the entry must stay inside its character cap and stay a
// single line, since the judge reads exactly one line.
function validateEntry(text: string, cap: number): void {
  if (text.length < 1 || text.length > cap || !text.trim() || text.includes('\n')) {
    throw new Error(`entry is ${text.length} characters, cap is ${cap}`);
  }
}

// Write the entry, then read it back: what the grader reads must be
// exactly the entry above, with nothing appended or lost.
function writeEntry(text: string): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, 'entry.txt');
  writeFileSync(target, text, 'utf8');
  if (readFileSync(target, 'utf8') !== text) {
    throw new Error('entry.txt does not match ENTRY after writing');
  }
}

validateEntry(ENTRY, 200);
writeEntry(ENTRY);
