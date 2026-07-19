// Core classification used across every AI-derived data point.
// This is the single source of truth for how "grounded" a piece of
// information is, and drives the colored badge shown in the UI.
export type Classification =
  | "Confirmed Fact"
  | "Client Reported"
  | "AI Inference"
  | "Missing";

// A single quoted piece of evidence backing a finding.
export interface EvidenceQuote {
  quote: string;
  speaker: "Client" | "Coach";
}

// Generic wrapper for any AI-derived data point.
// Every metric and insight in the app is expressed as a DataPoint<T>
// so that value / classification / confidence / evidence always travel together.
export interface DataPoint<T = string> {
  value: T;
  classification: Classification;
  confidence: number; // 0-100
  evidence: EvidenceQuote[];
}

// ---- Health Metrics ----
export interface HealthMetrics {
  nutrition: DataPoint;
  exercise: DataPoint;
  steps: DataPoint;
  sleep: DataPoint;
  water: DataPoint;
  symptoms: DataPoint;
  stress: DataPoint;
}

// ---- Coach Insights ----
export interface CoachInsights {
  engagement: DataPoint;
  barriers: DataPoint<string[]>;
  pendingActions: DataPoint<string[]>;
  riskFlags: DataPoint<string[]>;
  coachRecommendation: DataPoint;
}

// ---- Evidence Table Row ----
export interface EvidenceRow {
  metric: string;
  finding: string;
  evidenceQuote: string;
  speaker: "Client" | "Coach";
  classification: Classification;
  confidence: number;
}

// ---- AI Transparency ----
export interface TransparencyPanelData {
  confirmedFacts: string[];
  clientReported: string[];
  aiInference: string[];
  missingInformation: string[];
}

// ---- Human Review ----
export type ReviewStatus = "Pending" | "Approved" | "Edited" | "Rejected";

// ---- Full Analysis Result ----
// This is the single object the entire dashboard renders from.
// Replace `mockAnalysis` with a real API response of this same shape
// to go live with an actual LLM.
export interface AnalysisResult {
  clientName: string;
  weekOf: string;
  weeklySummary: DataPoint;
  healthMetrics: HealthMetrics;
  coachInsights: CoachInsights;
  evidenceTable: EvidenceRow[];
  transparency: TransparencyPanelData;
}
