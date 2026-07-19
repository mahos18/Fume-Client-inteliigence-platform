import type { CoachInsights as CoachInsightsData, DataPoint } from "../types/analysis";
import ClassificationBadge from "./ClassificationBadge";
import ConfidenceBar from "./ConfidenceBar";
import EvidenceList from "./EvidenceList";

interface InsightBlockProps {
  label: string;
  data: DataPoint<string> | DataPoint<string[]>;
}

function InsightBlock({ label, data }: InsightBlockProps) {
  const isList = Array.isArray(data.value);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
        <ClassificationBadge classification={data.classification} />
      </div>

      {isList ? (
        <ul className="mb-2 list-disc space-y-1 pl-5 text-sm text-gray-900">
          {(data.value as string[]).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mb-2 text-sm text-gray-900">{data.value as string}</p>
      )}

      <div className="mb-3">
        <ConfidenceBar confidence={data.confidence} />
      </div>
      <EvidenceList evidence={data.evidence} />
    </div>
  );
}

interface CoachInsightsProps {
  insights: CoachInsightsData;
}

export default function CoachInsightsPanel({ insights }: CoachInsightsProps) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-gray-800">Coach Insights</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InsightBlock label="Engagement Level" data={insights.engagement} />
        <InsightBlock label="Key Barriers" data={insights.barriers} />
        <InsightBlock label="Pending Actions" data={insights.pendingActions} />
        <InsightBlock label="Risk Flags" data={insights.riskFlags} />
        <div className="md:col-span-2">
          <InsightBlock label="Recommended Coach Action" data={insights.coachRecommendation} />
        </div>
      </div>
    </section>
  );
}
