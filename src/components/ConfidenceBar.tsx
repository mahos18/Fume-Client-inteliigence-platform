interface ConfidenceBarProps {
  confidence: number;
}

export default function ConfidenceBar({ confidence }: ConfidenceBarProps) {
  const barColor =
    confidence >= 75 ? "bg-blue-600" : confidence >= 40 ? "bg-amber-500" : "bg-gray-400";

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-24 rounded-full bg-gray-200">
        <div
          className={`h-1.5 rounded-full ${barColor}`}
          style={{ width: `${confidence}%` }}
        />
      </div>
      <span className="text-xs text-gray-600">{confidence}%</span>
    </div>
  );
}
