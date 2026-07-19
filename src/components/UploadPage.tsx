import { useRef, useState } from "react";

interface UploadPageProps {
  onAnalyze: (file: File) => void;
}

export default function UploadPage({ onAnalyze }: UploadPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-center text-2xl font-bold text-gray-900">
          Client Intelligence Platform
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          AI-powered conversation analysis for health coaches.
        </p>

        <label
          htmlFor="pdf-upload"
          className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center hover:border-blue-400 hover:bg-gray-50"
        >
          <span className="mb-1 text-sm font-medium text-gray-700">
            Click to upload a PDF conversation transcript
          </span>
          <span className="text-xs text-gray-400">PDF files only</span>
          <input
            id="pdf-upload"
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {selectedFile && (
          <p className="mb-4 truncate rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-800">
            Selected file: <span className="font-medium">{selectedFile.name}</span>
          </p>
        )}

        <button
          onClick={() => selectedFile && onAnalyze(selectedFile)}
          disabled={!selectedFile}
          className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Analyze Conversation
        </button>
      </div>
    </div>
  );
}
