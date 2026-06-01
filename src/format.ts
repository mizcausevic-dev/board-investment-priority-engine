import type { BoardInvestmentPriorityReport } from "./types.js";

export function toSummary(report: BoardInvestmentPriorityReport) {
  return [
    `Priority lanes: ${report.items}`,
    `Average priority: ${report.averagePriorityScore}`,
    `Average savings leverage: ${report.averageSavingsLeverageScore}`,
    `Average downside exposure: ${report.averageDownsideExposureScore}`,
    `Average conviction: ${report.averageConvictionScore}`,
    `Average payback window: ${report.averagePaybackWindowScore}`,
    `Average board confidence: ${report.averageBoardConfidenceScore}`,
    `Average urgency: ${report.averageUrgencyScore}`,
    `Fund tracks: ${report.fundTracks}`,
    `Protect tracks: ${report.protectTracks}`,
    `Capital to reallocate ($M): ${report.capitalToReallocateMillions}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
