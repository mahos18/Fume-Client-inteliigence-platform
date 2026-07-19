import type { TransparencyPanelData } from "../types/analysis";

interface TransparencySectionProps {
  title: string;
  items: string[];
  accentClass: string;
}

function TransparencySection({ title, items, accentClass }: TransparencySectionProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className={`mb-2 text-sm font-semibold ${accentClass}`}>{title}</h3>
      {items.length === 0 ? (
        <p className="text-xs italic text-gray-400">None identified.</p>
      ) : (
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface TransparencyPanelProps {
  data: TransparencyPanelData;
}

export default function TransparencyPanel({ data }: TransparencyPanelProps) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-gray-800">AI Transparency</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TransparencySection
          title="Confirmed Facts"
          items={data.confirmedFacts}
          accentClass="text-green-700"
        />
        <TransparencySection
          title="Client Reported"
          items={data.clientReported}
          accentClass="text-blue-700"
        />
        <TransparencySection
          title="AI Inference"
          items={data.aiInference}
          accentClass="text-amber-700"
        />
        <TransparencySection
          title="Missing Information"
          items={data.missingInformation}
          accentClass="text-gray-500"
        />
      </div>
    </section>
  );
}
