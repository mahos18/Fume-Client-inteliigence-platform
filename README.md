# Client Intelligence Platform

**AI-powered conversation analysis for health coaches.**

Upload a PDF of a coach–client conversation and get back a structured weekly
analysis — health metrics, engagement signals, and coach recommendations —
where **every single claim is traceable to a verbatim quote from the transcript**,
tagged with a classification and a confidence score, and reviewed by a human
before it's trusted.

Built as a product-thinking exercise: the goal isn't a polished UI, it's a
demonstration of evidence grounding, hallucination prevention, structured
AI outputs, and a human review workflow.

---

## Why this exists

Most "AI wrapper" demos pipe a prompt into a model and print whatever comes
back. That's fine for a toy, but unusable in a domain like health coaching,
where a wrong inference ("client is sleeping fine") could shape real advice.

This project treats every AI output as a claim that needs to justify itself:

- **Where did this come from?** — an `evidence` array of verbatim quotes
- **How grounded is it?** — a `classification`: `Confirmed Fact`, `Client Reported`,
  `AI Inference`, or `Missing`
- **How sure is the model?** — a `confidence` score, calibrated by classification tier
- **Who signs off on it?** — a human review step (Approve / Edit / Reject) before
  anything is considered final

If the transcript doesn't say something, the model is required to say
`Missing` — never to guess and fill the gap.

---

## How it works

```
 PDF upload
     │
     ▼
 Extract text from PDF (client-side, pdfjs-dist — no backend)
     │
     ▼
 Send transcript text to an LLM (Groq / Llama 3.3) with a
 strict system prompt that forces:
   - a fixed JSON schema (matches the AnalysisResult TypeScript type)
   - a verbatim quote for every non-"Missing" field
   - "Missing" instead of invented answers
     │
     ▼
 Parse + validate the JSON response
 (fails fast and falls back to demo data if the shape is wrong)
     │
     ▼
 Render the dashboard from that single JSON object
     │
     ▼
 Human review: coach notes, Approve / Edit / Reject, status tracking
```

Everything downstream of the LLM call — every card, badge, and table — reads
from one typed object (`AnalysisResult`). Swap the mock data for a live API
response of the same shape, and no component code changes.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React + TypeScript (Vite) |
| Styling | Tailwind CSS v4 |
| PDF text extraction | `pdfjs-dist` (runs fully in the browser) |
| LLM | Groq API (`llama-3.3-70b-versatile` by default, OpenAI-compatible) |
| Backend | None — everything runs client-side for this demo |
| Auth / DB | None |

---

## Getting started

```bash
git clone <your-repo-url>
cd client-intelligence-platform
npm install
cp .env.example .env
```

Add your [Groq API key](https://console.groq.com) (free tier available) to `.env`:

```
VITE_GROQ_API_KEY=gsk_your-real-key-here
VITE_GROQ_MODEL=llama-3.3-70b-versatile
```

Then:

```bash
npm run dev
```

Open the printed local URL, upload any PDF, and click **Analyze Conversation**.

> **No key?** The app still works — if the Groq call fails or no key is set,
> it falls back to built-in mock data with a visible warning banner, so the
> UI is always demoable.

---

## Project structure

```
src/
  components/
    UploadPage.tsx          landing page + PDF picker
    ProgressLoader.tsx      step-by-step analysis progress (real pipeline state)
    Dashboard.tsx            assembles every dashboard section
    SummaryCard.tsx          weekly summary card
    MetricCard.tsx           single health metric card
    CoachInsights.tsx        engagement / barriers / actions / risks / recommendation
    EvidenceTable.tsx        full evidence table
    TransparencyPanel.tsx    confirmed facts / client reported / AI inference / missing
    ReviewPanel.tsx          human review controls (notes, approve/edit/reject, status)
    ClassificationBadge.tsx  shared colored classification badge
    ConfidenceBar.tsx        shared confidence indicator
    EvidenceList.tsx         shared evidence-quote list
  services/
    pdfExtractor.ts          client-side PDF -> text extraction
    groqService.ts           Groq API call, prompt, JSON parsing + validation
  data/
    mockAnalysis.ts          mock AI output (swap for a live API response)
  types/
    analysis.ts              shared TypeScript interfaces (AnalysisResult, DataPoint<T>, ...)
  App.tsx                    view routing + pipeline orchestration
```

---

## The data model

Every AI-derived value in the app — a metric, an insight, a table row — is a
`DataPoint<T>`:

```ts
interface DataPoint<T = string> {
  value: T;
  classification: "Confirmed Fact" | "Client Reported" | "AI Inference" | "Missing";
  confidence: number; // 0-100
  evidence: { quote: string; speaker: "Client" | "Coach" }[];
}
```

The LLM prompt is written to produce exactly this shape, field for field —
schema-first, prompt-second, so there's one source of truth for what "correct
output" looks like.

---

## Hallucination prevention, specifically

The system prompt (`src/services/groqService.ts`) enforces:

1. Every non-`"Missing"` field must carry **at least one quote copied verbatim**
   from the transcript, with the correct speaker attributed.
2. If no supporting quote exists, the model must return `"Missing"` with an
   empty evidence array and `confidence: 0` — never invent one.
3. Confidence is calibrated by classification tier (facts and direct client
   statements score high; inferences score in a middle band; missing data
   scores zero).
4. The response must be a single JSON object, matching the `AnalysisResult`
   type exactly — no prose, no markdown fences.

On the client, `analyzeTranscriptWithGroq` re-validates the parsed response
before it's ever handed to the dashboard, so a malformed or incomplete
response fails loudly (and falls back to demo data) instead of silently
rendering broken UI.

---

## Human review

AI output here is a **draft**, not a final answer. The Human Review panel at
the bottom of the dashboard lets a coach:
- Add notes / corrections
- Approve, Edit, or Reject the analysis
- Track status (`Pending` / `Approved` / `Edited` / `Rejected`)

This is deliberate: in a real deployment, no AI-generated health inference
should reach a client without a human checking it first.

---

## Known limitations (by design, for this assignment)

- **No backend** — the Groq API key is called directly from the browser, so
  it's visible in the JS bundle. Fine for local dev/demo; before any public
  deployment, move the API call behind a small backend/serverless proxy that
  holds the key server-side.
- **No persistence** — nothing is saved between sessions; refreshing resets state.
- **No auth** — single-user, local-only by design.
- **Single-shot LLM call** — no retries, streaming, or multi-turn correction if
  the model's first response is malformed (it currently just falls back to
  mock data instead).

## Possible next steps

- Move the LLM call behind a lightweight backend endpoint to protect the API key.
- Add retry-with-repair logic: if JSON validation fails, send the error back to
  the model and ask it to correct its own output.
- Persist review decisions (approve/edit/reject) so a coach's history is tracked.
- Add streaming so the dashboard can render progressively instead of waiting
  for the full response.

---

## License

MIT — use this however you'd like.
