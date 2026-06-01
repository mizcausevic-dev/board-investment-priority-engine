import express from "express";
import {
  renderBoardAsks,
  renderCapitalSequence,
  renderDocs,
  renderOverview,
  renderPriorityLane,
  renderVerification
} from "./services/render.js";
import { boardAsks, capitalSequence, payload, priorityLane, riskMap, summary, verification } from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/priority-lane", (_req, res) => res.type("html").send(renderPriorityLane()));
  app.get("/board-asks", (_req, res) => res.type("html").send(renderBoardAsks()));
  app.get("/capital-sequence", (_req, res) => res.type("html").send(renderCapitalSequence()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/priority-lane", (_req, res) => res.json(priorityLane()));
  app.get("/api/board-asks", (_req, res) => res.json(boardAsks()));
  app.get("/api/capital-sequence", (_req, res) => res.json(capitalSequence()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

const port = Number(process.env.PORT || 4010);

if (process.env.NODE_ENV !== "test") {
  createApp().listen(port, () => {
    console.log(`board-investment-priority-engine listening on http://127.0.0.1:${port}`);
  });
}
