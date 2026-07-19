import type { AnalysisResult } from "../types/analysis";
import SummaryCard from "./SummaryCard";
import MetricCard from "./MetricCard";
import CoachInsightsPanel from "./CoachInsights";
import EvidenceTable from "./EvidenceTable";
import TransparencyPanel from "./TransparencyPanel";
import ReviewPanel from "./ReviewPanel";

interface DashboardProps {
  data: AnalysisResult;
  onStartOver: () => void;
  usedFallbackData?: boolean;
}

const METRIC_LABELS: { key: keyof AnalysisResult["healthMetrics"]; label: string }[] = [
  { key: "nutrition", label: "Nutrition Adherence" },
  { key: "exercise", label: "Exercise" },
  { key: "steps", label: "Steps" },
  { key: "sleep", label: "Sleep" },
  { key: "water", label: "Water Intake" },
  { key: "symptoms", label: "Symptoms" },
  { key: "stress", label: "Stress" },
];

export default function Dashboard({ data, onStartOver, usedFallbackData }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Client Intelligence Platform</h1>
            <p className="text-xs text-gray-500">
              AI-powered conversation analysis for health coaches.
            </p>
          </div>
          <button
            onClick={onStartOver}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Analyze another conversation
          </button>
        </div>
      </header>

      {usedFallbackData && (
        <div className="mx-auto mt-4 max-w-6xl px-4">
          <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800">
            Showing mock demo data — the Grok API call didn't complete (check your API key in{" "}
            <code className="rounded bg-amber-100 px-1">.env</code> or your network connection).
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <SummaryCard
          clientName={data.clientName}
          weekOf={data.weekOf}
          data={data.weeklySummary}
        />

        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-800">Health Metrics</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METRIC_LABELS.map(({ key, label }) => (
              <MetricCard key={key} label={label} data={data.healthMetrics[key]} />
            ))}
          </div>
        </section>

        <CoachInsightsPanel insights={data.coachInsights} />

        <EvidenceTable rows={data.evidenceTable} />

        <TransparencyPanel data={data.transparency} />

        <ReviewPanel />
      </main>
    </div>
  );
}
