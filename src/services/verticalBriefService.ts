import { analyze } from "../analyze.js";
import { sampleBoardInvestmentPriorityEngine } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardInvestmentPriorityEngine, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averagePriorityScore: report.averagePriorityScore,
    averageSavingsLeverageScore: report.averageSavingsLeverageScore,
    averageDownsideExposureScore: report.averageDownsideExposureScore,
    averageConvictionScore: report.averageConvictionScore,
    averagePaybackWindowScore: report.averagePaybackWindowScore,
    averageBoardConfidenceScore: report.averageBoardConfidenceScore,
    averageUrgencyScore: report.averageUrgencyScore,
    fundTracks: report.fundTracks,
    protectTracks: report.protectTracks,
    capitalToReallocateMillions: report.capitalToReallocateMillions,
    highFindings,
    recommendation:
      "Fund the AI and revenue lanes, protect the identity and biotech cores, hold FinTech until proof quality improves, and trim overlapping procurement packaging."
  };
}

export function priorityLane() {
  return sampleBoardInvestmentPriorityEngine.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    priorityTheme: item.priorityTheme,
    boardQuestion: item.boardQuestion,
    recommendedMove: item.recommendedMove,
    nextBoardAsk: item.nextBoardAsk
  }));
}

export function boardAsks() {
  return sampleBoardInvestmentPriorityEngine.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    priorityTheme: item.priorityTheme,
    priorityScore: item.priorityScore,
    convictionScore: item.convictionScore,
    boardConfidenceScore: item.boardConfidenceScore,
    nextBoardAsk: item.nextBoardAsk,
    companyTags: item.companyTags
  }));
}

export function capitalSequence() {
  return sampleBoardInvestmentPriorityEngine.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    urgencyScore: item.urgencyScore,
    paybackWindowScore: item.paybackWindowScore,
    savingsLeverageScore: item.savingsLeverageScore,
    downsideExposureScore: item.downsideExposureScore,
    headline: item.headline,
    relatedSurfaces: item.relatedSurfaces,
    requiredEvidence: item.requiredEvidence
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic board-priority data only - no live fund plans, internal models, or investment committee packets are included.",
    "Priority, savings leverage, downside exposure, conviction, payback window, board-confidence, and urgency metrics are modeled from the sample executive-intelligence set in this repo.",
    "This surface is read-only and designed to show how Kinetic Gain can package fund, protect, hold, and trim decisions into one board-readable operating layer.",
    "Company tags and track labels are synthetic design aids rather than audited market signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    priorityLane: priorityLane(),
    boardAsks: boardAsks(),
    capitalSequence: capitalSequence(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardInvestmentPriorityEngine
  };
}
