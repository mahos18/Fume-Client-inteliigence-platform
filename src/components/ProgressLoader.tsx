const STEPS = [
  "Uploading PDF",
  "Extracting Conversation",
  "Analyzing Conversation",
  "Generating Insights",
  "Building Dashboard",
];

interface ProgressLoaderProps {
  // Index (0-based) of the step currently in progress.
  // Pass STEPS.length once everything is done, to mark all steps complete.
  currentStep: number;
  errorMessage?: string | null;
}

export default function ProgressLoader({ currentStep, errorMessage }: ProgressLoaderProps) {
  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-center text-sm font-semibold text-gray-700">
        Analyzing Conversation
      </h2>
      <ul className="space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;
          const isErrored = isActive && !!errorMessage;

          return (
            <li key={step} className="flex items-center gap-3">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                  isErrored
                    ? "bg-red-600 text-white"
                    : isDone
                    ? "bg-blue-600 text-white"
                    : isActive
                    ? "border-2 border-blue-600 text-blue-600"
                    : "border border-gray-300 text-gray-300"
                }`}
              >
                {isErrored ? "!" : isDone ? "✓" : ""}
              </span>
              <span
                className={`text-sm ${
                  isErrored
                    ? "font-medium text-red-600"
                    : isDone
                    ? "text-gray-400 line-through"
                    : isActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-400"
                }`}
              >
                {step}
                {isActive && !errorMessage && <span className="ml-1 animate-pulse">...</span>}
              </span>
            </li>
          );
        })}
      </ul>

      {errorMessage && (
        <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
