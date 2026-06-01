import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardInvestmentPriorityEngine } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleBoardInvestmentPriorityEngine, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(sampleBoardInvestmentPriorityEngine.length);
  });

  it("computes positive board-priority metrics", () => {
    const report = analyze(sampleBoardInvestmentPriorityEngine, { now: "2026-06-01T00:00:00Z" });
    expect(report.averagePriorityScore).toBeGreaterThan(0);
    expect(report.averageSavingsLeverageScore).toBeGreaterThan(0);
  });

  it("counts fund and protect tracks", () => {
    const report = analyze(sampleBoardInvestmentPriorityEngine, { now: "2026-06-01T00:00:00Z" });
    expect(report.fundTracks).toBeGreaterThan(0);
    expect(report.protectTracks).toBeGreaterThan(0);
  });

  it("emits findings", () => {
    const report = analyze(sampleBoardInvestmentPriorityEngine, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.length).toBeGreaterThan(0);
  });

  it("rolls up capital to reallocate", () => {
    const report = analyze(sampleBoardInvestmentPriorityEngine, { now: "2026-06-01T00:00:00Z" });
    expect(report.capitalToReallocateMillions).toBeGreaterThan(0);
  });
});
