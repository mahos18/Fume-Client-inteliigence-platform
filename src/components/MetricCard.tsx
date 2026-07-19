import type { DataPoint } from "../types/analysis";
import ClassificationBadge from "./ClassificationBadge";
import ConfidenceBar from "./ConfidenceBar";
import EvidenceList from "./EvidenceList";

interface MetricCardProps {
  label: string;
  data: DataPoint;
}

export default function MetricCard({ label, data }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
        <ClassificationBadge classification={data.classification} />
      </div>
      <p className="mb-2 text-lg font-semibold text-gray-900">{data.value}</p>
      <div className="mb-3">
        <ConfidenceBar confidence={data.confidence} />
      </div>
      <EvidenceList evidence={data.evidence} />
    </div>
  );
}
