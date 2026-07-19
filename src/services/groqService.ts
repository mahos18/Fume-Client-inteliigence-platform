import type { AnalysisResult } from "../types/analysis";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
const GROQ_MODEL = (import.meta.env.VITE_GROQ_MODEL as string | undefined) ?? "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a clinical-grade conversation analysis engine for health coaches.
You will be given a raw text transcript of a conversation between a health coach and a client.

Rules:
1. Every data point must be one of: "Confirmed Fact", "Client Reported", "AI Inference", "Missing".
2. Every non-"Missing" data point MUST include at least one evidence quote copied VERBATIM
   from the transcript, with the correct speaker ("Client" or "Coach").
3. If you cannot find a supporting quote, classify as "Missing" with empty evidence and confidence 0.
   Never invent a quote.
4. "confidence" is an integer 0-100. Confirmed Facts / Client Reported: 80-100. AI Inference: 50-80. Missing: 0.
5. Respond with ONLY a single JSON object — no markdown fences, no commentary — matching exactly:

{
  "clientName": string,
  "weekOf": string,
  "weeklySummary": DataPoint<string>,
  "healthMetrics": {
    "nutrition": DataPoint<string>, "exercise": DataPoint<string>, "steps": DataPoint<string>,
    "sleep": DataPoint<string>, "water": DataPoint<string>, "symptoms": DataPoint<string>, "stress": DataPoint<string>
  },
  "coachInsights": {
    "engagement": DataPoint<string>, "barriers": DataPoint<string[]>, "pendingActions": DataPoint<string[]>,
    "riskFlags": DataPoint<string[]>, "coachRecommendation": DataPoint<string>
  },
  "evidenceTable": Array<{ "metric": string, "finding": string, "evidenceQuote": string, "speaker": "Client"|"Coach", "classification": Classification, "confidence": number }>,
  "transparency": { "confirmedFacts": string[], "clientReported": string[], "aiInference": string[], "missingInformation": string[] }
}

type Classification = "Confirmed Fact" | "Client Reported" | "AI Inference" | "Missing";
type DataPoint<T> = { value: T, classification: Classification, confidence: number, evidence: Array<{ quote: string, speaker: "Client"|"Coach" }> };

Return valid JSON only.`;

interface GroqChatResponse {
  choices: { message: { content: string } }[];
}

export async function analyzeTranscriptWithGroq(transcriptText: string): Promise<AnalysisResult> {
  if (!GROQ_API_KEY) {
    throw new Error("Missing VITE_GROQ_API_KEY. Add it to your .env file.");
  }

  const response = await fetch(GROQ_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" }, // Groq supports forced JSON mode
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Analyze this transcript and return the JSON described above:\n\n${transcriptText}` },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`Groq API request failed (${response.status}): ${errorBody}`);
  }

  const data = (await response.json()) as GroqChatResponse;
  const rawContent = data.choices?.[0]?.message?.content;
  if (!rawContent) throw new Error("Groq API returned an empty response.");

  const cleaned = rawContent.replace(/^```(json)?/i, "").replace(/```$/, "").trim();
  let parsed: AnalysisResult;
  try {
    parsed = JSON.parse(cleaned) as AnalysisResult;
  } catch {
    throw new Error("Groq did not return valid JSON.");
  }

  const required: (keyof AnalysisResult)[] = [
    "clientName", "weekOf", "weeklySummary", "healthMetrics", "coachInsights", "evidenceTable", "transparency",
  ];
  for (const key of required) {
    if (!(key in parsed)) throw new Error(`Groq response missing field: "${key}"`);
  }

  return parsed;
}