import { useState } from "react";
import UploadPage from "./components/UploadPage";
import ProgressLoader from "./components/ProgressLoader";
import Dashboard from "./components/Dashboard";
import { analysisResult as mockAnalysisResult } from "./data/mockAnalysis";
import { extractTextFromPdf } from "./services/pdfExtractor";
import type { AnalysisResult } from "./types/analysis";
import { analyzeTranscriptWithGroq } from "./services/groqService";


type View = "upload" | "loading" | "dashboard";

// Small helper so fast steps don't just flicker by unreadably.
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const [view, setView] = useState<View>("upload");
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult>(mockAnalysisResult);
  const [usedFallback, setUsedFallback] = useState(false);

  async function handleAnalyze(file: File) {
    setView("loading");
    setErrorMessage(null);
    setUsedFallback(false);
    setCurrentStep(0);

    try {
      // Step 0: Uploading PDF
      await wait(400);
      setCurrentStep(1);

      // Step 1: Extracting Conversation (real PDF text extraction)
      const transcriptText = await extractTextFromPdf(file);
      setCurrentStep(2);

      // Step 2: Analyzing Conversation (real Grok API call)
      const analysis = await analyzeTranscriptWithGroq(transcriptText);
      setCurrentStep(3);

      // Step 3: Generating Insights (already returned structured -> brief pause for UX)
      await wait(300);
      setCurrentStep(4);

      // Step 4: Building Dashboard
      await wait(300);
      setResult(analysis);
      setCurrentStep(5);
      await wait(300);
      setView("dashboard");
    } catch (err) {
      console.error("Analysis pipeline failed, falling back to mock data:", err);
      const message = err instanceof Error ? err.message : "Unknown error while analyzing the conversation.";
      setErrorMessage(message);
      setUsedFallback(true);

      // Give the person a moment to read the error, then show mock data
      // so the rest of the app remains demoable even without a working key.
      await wait(1800);
      setResult(mockAnalysisResult);
      setCurrentStep(5);
      await wait(300);
      setView("dashboard");
    }
  }

  function handleStartOver() {
    setView("upload");
    setErrorMessage(null);
    setUsedFallback(false);
    setCurrentStep(0);
  }

  if (view === "upload") {
    return <UploadPage onAnalyze={handleAnalyze} />;
  }

  if (view === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <ProgressLoader currentStep={currentStep} errorMessage={errorMessage} />
      </div>
    );
  }

  return (
    <Dashboard data={result} onStartOver={handleStartOver} usedFallbackData={usedFallback} />
  );
}

export default App;
