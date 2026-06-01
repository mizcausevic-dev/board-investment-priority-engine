import { readFileSync } from "node:fs";
import { analyze } from "./analyze.js";
import { toSummary } from "./format.js";
import type { BoardInvestmentPriorityItem } from "./types.js";

const defaultPath = "fixtures/board-investment-priority-engine.json";

if (process.argv.includes("--help")) {
  console.error("Usage: board-investment-priority-engine <file> --format <summary|json>");
  process.exit(0);
}

const file = process.argv[2] || defaultPath;
const formatFlag = process.argv.indexOf("--format");
const format = formatFlag >= 0 ? process.argv[formatFlag + 1] : "summary";

try {
  const path = file;
  const items = JSON.parse(readFileSync(path, "utf8")) as { items: BoardInvestmentPriorityItem[] };
  const report = analyze(items.items, { now: "2026-06-01T00:00:00Z" });

  if (format === "json") {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(toSummary(report));
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
