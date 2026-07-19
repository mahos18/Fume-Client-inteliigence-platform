import type { EvidenceQuote } from "../types/analysis";

interface EvidenceListProps {
  evidence: EvidenceQuote[];
}

export default function EvidenceList({ evidence }: EvidenceListProps) {
  if (evidence.length === 0) {
    return <p className="text-xs italic text-gray-400">No supporting evidence found.</p>;
  }

  return (
    <ul className="space-y-1.5">
      {evidence.map((item, idx) => (
        <li key={idx} className="border-l-2 border-gray-200 pl-2 text-xs text-gray-600">
          <span className="font-medium text-gray-500">{item.speaker}: </span>
          <span className="italic">"{item.quote}"</span>
        </li>
      ))}
    </ul>
  );
}
