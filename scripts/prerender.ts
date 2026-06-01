import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderBoardAsks,
  renderCapitalSequence,
  renderDocs,
  renderOverview,
  renderPriorityLane,
  renderVerification
} from "../src/services/render.js";
import { boardAsks, capitalSequence, payload, priorityLane, riskMap, summary, verification } from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/priority-lane", ["priority-lane/index.html", renderPriorityLane()]],
  ["/board-asks", ["board-asks/index.html", renderBoardAsks()]],
  ["/capital-sequence", ["capital-sequence/index.html", renderCapitalSequence()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://priority.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://priority.kineticgain.com/</loc></url><url><loc>https://priority.kineticgain.com/priority-lane/</loc></url><url><loc>https://priority.kineticgain.com/board-asks/</loc></url><url><loc>https://priority.kineticgain.com/capital-sequence/</loc></url><url><loc>https://priority.kineticgain.com/verification/</loc></url><url><loc>https://priority.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/priority-lane.json": priorityLane(),
  "api/board-asks.json": boardAsks(),
  "api/capital-sequence.json": capitalSequence(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
