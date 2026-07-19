import type { EvidenceRow } from "../types/analysis";
import ClassificationBadge from "./ClassificationBadge";
import ConfidenceBar from "./ConfidenceBar";

interface EvidenceTableProps {
  rows: EvidenceRow[];
}

export default function EvidenceTable({ rows }: EvidenceTableProps) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-gray-800">Evidence Table</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Metric</th>
              <th className="px-4 py-3 font-medium">Finding</th>
              <th className="px-4 py-3 font-medium">Evidence Quote</th>
              <th className="px-4 py-3 font-medium">Speaker</th>
              <th className="px-4 py-3 font-medium">Classification</th>
              <th className="px-4 py-3 font-medium">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, idx) => (
              <tr key={idx} className="align-top">
                <td className="px-4 py-3 font-medium text-gray-800">{row.metric}</td>
                <td className="px-4 py-3 text-gray-700">{row.finding}</td>
                <td className="px-4 py-3 italic text-gray-600">
                  {row.evidenceQuote === "N/A" ? row.evidenceQuote : `"${row.evidenceQuote}"`}
                </td>
                <td className="px-4 py-3 text-gray-700">{row.speaker}</td>
                <td className="px-4 py-3">
                  <ClassificationBadge classification={row.classification} />
                </td>
                <td className="px-4 py-3">
                  <ConfidenceBar confidence={row.confidence} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
