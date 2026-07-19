import type { Classification } from "../types/analysis";

const CLASSIFICATION_STYLES: Record<Classification, string> = {
  "Confirmed Fact": "bg-green-100 text-green-800 border border-green-300",
  "Client Reported": "bg-blue-100 text-blue-800 border border-blue-300",
  "AI Inference": "bg-amber-100 text-amber-800 border border-amber-300",
  Missing: "bg-gray-200 text-gray-600 border border-gray-300",
};

interface ClassificationBadgeProps {
  classification: Classification;
}

export default function ClassificationBadge({ classification }: ClassificationBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${CLASSIFICATION_STYLES[classification]}`}
    >
      {classification}
    </span>
  );
}
