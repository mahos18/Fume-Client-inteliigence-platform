import type { DataPoint } from "../types/analysis";
import ClassificationBadge from "./ClassificationBadge";
import ConfidenceBar from "./ConfidenceBar";
import EvidenceList from "./EvidenceList";

interface SummaryCardProps {
  clientName: string;
  weekOf: string;
  data: DataPoint;
}

export default function SummaryCard({ clientName, weekOf, data }: SummaryCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Weekly Client Summary</h2>
          <p className="text-xs text-gray-500">
            {clientName} · {weekOf}
          </p>
        </div>
        <ClassificationBadge classification={data.classification} />
      </div>
      <p className="mb-3 text-sm leading-relaxed text-gray-700">{data.value}</p>
      <div className="mb-3">
        <ConfidenceBar confidence={data.confidence} />
      </div>
      <EvidenceList evidence={data.evidence} />
    </div>
  );
}
