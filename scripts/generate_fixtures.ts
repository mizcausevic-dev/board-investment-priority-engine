import { toExport } from "../src/analyze.js";
import { sampleBoardInvestmentPriorityEngine } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = sampleBoardInvestmentPriorityEngine.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync(
  "fixtures/board-investment-priority-engine.json",
  JSON.stringify(toExport(sampleBoardInvestmentPriorityEngine), null, 2)
);

writeFileSync(
  "fixtures/board-investment-priority-engine-clean.json",
  JSON.stringify(toExport(clean), null, 2)
);
