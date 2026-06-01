import { describe, expect, it } from "vitest";
import { boardAsks, capitalSequence, payload, priorityLane, riskMap, summary, verification } from "./verticalBriefService.js";

describe("board investment priority service", () => {
  it("returns the summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the priority lane", () => {
    expect(priorityLane()[0]?.audience).toBeTruthy();
  });

  it("returns the board asks view", () => {
    expect(boardAsks()[0]?.priorityScore).toBeGreaterThan(0);
  });

  it("returns the capital sequence view", () => {
    expect(capitalSequence()[0]?.urgencyScore).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification()[0]).toContain("Synthetic");
  });

  it("keeps the headline in the payload sample", () => {
    expect(payload().sample[0]?.headline).toBeTruthy();
  });
});
