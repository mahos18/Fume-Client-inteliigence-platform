# Client Intelligence Platform

AI-powered conversation analysis dashboard for health coaches. Built as a
frontend-only demo (Vite + React + TypeScript + Tailwind CSS v4) using mock
AI output that mirrors the shape of a real LLM response.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Flow

1. **Upload** — Select any PDF on the landing page and click "Analyze Conversation".
2. **Processing** — A simulated step-by-step loader (Uploading PDF -> Extracting
   Conversation -> Analyzing Conversation -> Generating Insights -> Building Dashboard).
3. **Dashboard** — Renders entirely from `src/data/mockAnalysis.ts`:
   - Weekly Client Summary
   - Health Metrics (Nutrition, Exercise, Steps, Sleep, Water, Symptoms, Stress)
   - Coach Insights (Engagement, Barriers, Pending Actions, Risk Flags, Recommendation)
   - Evidence Table
   - AI Transparency (Confirmed Facts / Client Reported / AI Inference / Missing Information)
   - Human Review (notes textarea, Approve/Edit/Reject, status dropdown)

## Replacing mock data with a real LLM

Everything renders from the single `analysisResult` object exported from
`src/data/mockAnalysis.ts`, typed by `AnalysisResult` in `src/types/analysis.ts`.
To go live, replace that export with the parsed JSON response from your LLM
call — as long as it matches the same shape (`value` / `classification` /
`confidence` / `evidence` on every data point), no component code needs to change.

## Live mode: Grok (xAI) integration

The app now runs a real pipeline when a key is configured, and falls back to
the mock data (with a visible banner) if it isn't:

1. **Get an API key** at the [xAI Console](https://console.x.ai) → API Keys.
2. Copy the example env file and paste in your key:
   ```bash
   cp .env.example .env
   ```
   ```
   VITE_XAI_API_KEY=xai-your-real-key-here
   # optional: VITE_XAI_MODEL=grok-4.3 (this is already the default)
   ```
3. Restart `npm run dev` (Vite only reads `.env` on startup).
4. Upload any PDF transcript and click "Analyze Conversation" — it will:
   - Extract text from the PDF entirely in-browser (`src/services/pdfExtractor.ts`, via `pdfjs-dist`)
   - Send that text to Grok with a strict extraction prompt (`src/services/grokService.ts`)
   - Parse and validate the JSON response before handing it to the dashboard
   - Fall back to mock data with an amber warning banner if the key is missing, the call fails, or the response can't be parsed

### How hallucination prevention is enforced in the prompt

The system prompt sent to Grok (see `SYSTEM_PROMPT` in `grokService.ts`) requires:
- Every non-"Missing" field to include a **verbatim quote** from the transcript
- **"Missing"** classification (confidence 0, no evidence) instead of inventing an answer when the transcript doesn't cover something
- Confidence scores calibrated by classification tier (facts/reported statements score higher than inferences)
- A single JSON object as output, matching the exact `AnalysisResult` TypeScript shape — no prose, no markdown fences

The client-side `validateAnalysisResult` check fails fast (falling back to mock
data) if the response is missing required top-level fields, so a malformed
response never silently renders a broken dashboard.

### ⚠️ Security note before deploying anywhere public

This calls the Grok API directly from the browser, which means your API key
ships inside the JavaScript bundle — anyone can read it in devtools. That's
fine for local development and this assignment, but for any real deployment,
move `grokService.ts`'s `fetch` call into a small backend endpoint (a single
serverless function is enough) that holds the key server-side and proxies the
request. The frontend code doesn't need to change beyond pointing at your own
`/api/analyze` route instead of `api.x.ai` directly.

## Project structure

```
src/
  components/
    UploadPage.tsx          - landing page + PDF picker
    ProgressLoader.tsx      - simulated multi-step analysis loader
    Dashboard.tsx            - assembles all dashboard sections
    SummaryCard.tsx          - weekly summary card
    MetricCard.tsx           - single health metric card
    CoachInsights.tsx        - engagement/barriers/actions/risks/recommendation
    EvidenceTable.tsx        - full evidence table
    TransparencyPanel.tsx    - confirmed/reported/inferred/missing breakdown
    ReviewPanel.tsx          - human review controls
    ClassificationBadge.tsx  - shared colored classification badge
    ConfidenceBar.tsx        - shared confidence indicator
    EvidenceList.tsx         - shared evidence quote list
  data/
    mockAnalysis.ts          - mock AI output (swap for real API response)
  types/
    analysis.ts              - shared TypeScript interfaces
  App.tsx                    - view routing (upload -> loading -> dashboard)
```

## Classification legend

Every AI-derived data point carries one of four classifications, shown as a
colored badge:

- **Confirmed Fact** (green) — objectively verifiable from the transcript
- **Client Reported** (blue) — stated directly by the client
- **AI Inference** (amber) — inferred/derived by the model, not stated outright
- **Missing** (gray) — not discussed in the conversation
