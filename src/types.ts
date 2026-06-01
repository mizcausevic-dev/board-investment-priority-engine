export type InvestmentTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type PriorityAction = "FUND" | "PROTECT" | "HOLD" | "TRIM";

export interface BoardInvestmentPriorityItem {
  id: string;
  owner: string;
  audience: string;
  track: InvestmentTrack;
  action: PriorityAction;
  priorityTheme: string;
  boardQuestion: string;
  currentPosture: string;
  recommendedMove: string;
  priorityScore: number;
  savingsLeverageScore: number;
  downsideExposureScore: number;
  convictionScore: number;
  paybackWindowScore: number;
  boardConfidenceScore: number;
  urgencyScore: number;
  headline: string;
  narrative: string;
  nextBoardAsk: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface BoardInvestmentPriorityExport {
  generatedAt: string;
  items: BoardInvestmentPriorityItem[];
}

export type FindingCode =
  | "fund-now"
  | "protect-core"
  | "hold-until-proof"
  | "trim-overlap"
  | "downside-overhang"
  | "thin-board-proof";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: InvestmentTrack;
  audience: string;
  message: string;
}

export interface BoardInvestmentPriorityReport {
  generatedAt: string;
  items: number;
  averagePriorityScore: number;
  averageSavingsLeverageScore: number;
  averageDownsideExposureScore: number;
  averageConvictionScore: number;
  averagePaybackWindowScore: number;
  averageBoardConfidenceScore: number;
  averageUrgencyScore: number;
  fundTracks: number;
  protectTracks: number;
  capitalToReallocateMillions: number;
  findingsList: Finding[];
  ok: boolean;
}
