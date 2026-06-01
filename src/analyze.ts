import type {
  BoardInvestmentPriorityExport,
  BoardInvestmentPriorityItem,
  BoardInvestmentPriorityReport,
  Finding
} from "./types.js";

function average(items: BoardInvestmentPriorityItem[], pick: (item: BoardInvestmentPriorityItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: BoardInvestmentPriorityItem): Finding[] {
  const findings: Finding[] = [];

  if (item.action === "FUND" && item.priorityScore >= 88 && item.convictionScore >= 85) {
    findings.push({
      code: "fund-now",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane is ready for a board-level fund-now recommendation."
    });
  }

  if (item.action === "PROTECT" && item.boardConfidenceScore >= 85 && item.downsideExposureScore <= 45) {
    findings.push({
      code: "protect-core",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane behaves like protected core infrastructure and should not be weakened by opportunistic cuts."
    });
  }

  if (item.action === "TRIM" && item.savingsLeverageScore >= 80) {
    findings.push({
      code: "trim-overlap",
      severity: "medium",
      track: item.track,
      audience: item.audience,
      message: "This lane has enough reusable proof to support an immediate trim-and-reallocate recommendation."
    });
  }

  if (item.action === "HOLD" && item.downsideExposureScore >= 68) {
    findings.push({
      code: "hold-until-proof",
      severity: item.boardConfidenceScore < 70 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "This lane should hold until downside exposure and proof quality stop clustering together."
    });
  }

  if (item.downsideExposureScore >= 70 && item.urgencyScore >= 70) {
    findings.push({
      code: "downside-overhang",
      severity: "high",
      track: item.track,
      audience: item.audience,
      message: "Downside exposure is outrunning the current board story and needs a ranked intervention path."
    });
  }

  if (item.boardConfidenceScore < 74 || item.requiredEvidence.length > 4) {
    findings.push({
      code: "thin-board-proof",
      severity: item.boardConfidenceScore < 65 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "The next board ask still rests on thin proof and should be tightened before expansion capital is approved."
    });
  }

  return findings;
}

export function analyze(items: BoardInvestmentPriorityItem[], options: { now?: string } = {}): BoardInvestmentPriorityReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const fundTracks = items.filter((item) => item.action === "FUND").length;
  const protectTracks = items.filter((item) => item.action === "PROTECT").length;
  const capitalToReallocateMillions = Math.round(
    items.reduce((sum, item) => sum + item.savingsLeverageScore * 0.55 + item.downsideExposureScore * 0.35, 0)
  );

  return {
    generatedAt,
    items: items.length,
    averagePriorityScore: average(items, (item) => item.priorityScore),
    averageSavingsLeverageScore: average(items, (item) => item.savingsLeverageScore),
    averageDownsideExposureScore: average(items, (item) => item.downsideExposureScore),
    averageConvictionScore: average(items, (item) => item.convictionScore),
    averagePaybackWindowScore: average(items, (item) => item.paybackWindowScore),
    averageBoardConfidenceScore: average(items, (item) => item.boardConfidenceScore),
    averageUrgencyScore: average(items, (item) => item.urgencyScore),
    fundTracks,
    protectTracks,
    capitalToReallocateMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: BoardInvestmentPriorityItem[], now?: string): BoardInvestmentPriorityExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
