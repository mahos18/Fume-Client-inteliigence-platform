import type { AnalysisResult } from "../types/analysis";

// Mock AI output. Replace this object with the real LLM/API response
// (same shape as AnalysisResult) to go live.
export const analysisResult: AnalysisResult = {
  clientName: "Priya Sharma",
  weekOf: "July 13 - July 19, 2026",

  weeklySummary: {
    value:
      "Client maintained consistent check-ins this week and reported steady progress on nutrition goals, though exercise frequency dropped due to travel. Sleep quality was flagged as a concern by the client.",
    classification: "AI Inference",
    confidence: 82,
    evidence: [
      {
        quote:
          "I've been sticking to the meal plan pretty well, but I was traveling for work so I missed a few workouts.",
        speaker: "Client",
      },
      {
        quote: "I noticed you mentioned sleep has been rough again.",
        speaker: "Coach",
      },
    ],
  },

  healthMetrics: {
    nutrition: {
      value: "Adherent (5/7 days)",
      classification: "Client Reported",
      confidence: 88,
      evidence: [
        {
          quote: "I followed the meal plan five out of seven days this week.",
          speaker: "Client",
        },
      ],
    },
    exercise: {
      value: "2 sessions (below target of 4)",
      classification: "Client Reported",
      confidence: 90,
      evidence: [
        {
          quote: "I only got two workouts in because of the work trip.",
          speaker: "Client",
        },
      ],
    },
    steps: {
      value: "~6,200 avg/day",
      classification: "AI Inference",
      confidence: 60,
      evidence: [
        {
          quote: "I was walking around the airport a lot but not doing my usual routes.",
          speaker: "Client",
        },
      ],
    },
    sleep: {
      value: "Poor (5-6 hrs/night)",
      classification: "Client Reported",
      confidence: 85,
      evidence: [
        {
          quote: "My sleep has been rough, maybe five or six hours a night.",
          speaker: "Client",
        },
      ],
    },
    water: {
      value: "Not discussed",
      classification: "Missing",
      confidence: 0,
      evidence: [],
    },
    symptoms: {
      value: "Mild fatigue reported",
      classification: "Client Reported",
      confidence: 78,
      evidence: [
        {
          quote: "I've just been feeling a bit more tired than usual.",
          speaker: "Client",
        },
      ],
    },
    stress: {
      value: "Elevated (work-related)",
      classification: "AI Inference",
      confidence: 70,
      evidence: [
        {
          quote: "Work has been hectic with the travel and deadlines.",
          speaker: "Client",
        },
      ],
    },
  },

  coachInsights: {
    engagement: {
      value: "Moderate-High",
      classification: "AI Inference",
      confidence: 75,
      evidence: [
        {
          quote: "Sorry for the late reply, work has been crazy, but I'm still on track overall.",
          speaker: "Client",
        },
      ],
    },
    barriers: {
      value: ["Work travel disrupting routine", "Poor sleep reducing energy for workouts"],
      classification: "AI Inference",
      confidence: 72,
      evidence: [
        {
          quote: "I missed a few workouts because of the work trip.",
          speaker: "Client",
        },
        {
          quote: "My sleep has been rough, maybe five or six hours a night.",
          speaker: "Client",
        },
      ],
    },
    pendingActions: {
      value: ["Confirm updated workout schedule for next week", "Follow up on sleep hygiene tips sent last session"],
      classification: "Client Reported",
      confidence: 80,
      evidence: [
        {
          quote: "Can you send me a lighter workout plan for next week, I'll be traveling again.",
          speaker: "Client",
        },
      ],
    },
    riskFlags: {
      value: ["Declining sleep trend (2nd consecutive week)"],
      classification: "AI Inference",
      confidence: 65,
      evidence: [
        {
          quote: "It's been like this for a couple weeks now, not just this week.",
          speaker: "Client",
        },
      ],
    },
    coachRecommendation: {
      value:
        "Prioritize a sleep check-in next session and offer a travel-friendly workout plan to rebuild consistency.",
      classification: "AI Inference",
      confidence: 68,
      evidence: [
        {
          quote: "I just need something simple I can do in a hotel room.",
          speaker: "Client",
        },
      ],
    },
  },

  evidenceTable: [
    {
      metric: "Nutrition",
      finding: "Adherent 5/7 days",
      evidenceQuote: "I followed the meal plan five out of seven days this week.",
      speaker: "Client",
      classification: "Client Reported",
      confidence: 88,
    },
    {
      metric: "Exercise",
      finding: "2 sessions completed, below target",
      evidenceQuote: "I only got two workouts in because of the work trip.",
      speaker: "Client",
      classification: "Client Reported",
      confidence: 90,
    },
    {
      metric: "Sleep",
      finding: "5-6 hours per night, self-described as poor",
      evidenceQuote: "My sleep has been rough, maybe five or six hours a night.",
      speaker: "Client",
      classification: "Client Reported",
      confidence: 85,
    },
    {
      metric: "Stress",
      finding: "Elevated, linked to work travel",
      evidenceQuote: "Work has been hectic with the travel and deadlines.",
      speaker: "Client",
      classification: "AI Inference",
      confidence: 70,
    },
    {
      metric: "Water Intake",
      finding: "Not mentioned in conversation",
      evidenceQuote: "N/A",
      speaker: "Coach",
      classification: "Missing",
      confidence: 0,
    },
  ],

  transparency: {
    confirmedFacts: [
      "Session took place during the week of July 13-19, 2026.",
      "Client completed 2 exercise sessions.",
    ],
    clientReported: [
      "Followed meal plan 5 of 7 days.",
      "Sleeping 5-6 hours per night.",
      "Feeling more tired than usual.",
      "Traveling for work again next week.",
    ],
    aiInference: [
      "Overall engagement classified as Moderate-High based on response tone and timeliness.",
      "Stress levels inferred as elevated from references to workload and travel.",
      "Sleep decline flagged as a 2-week trend based on conversational context.",
    ],
    missingInformation: [
      "Water intake was not discussed this week.",
      "Exact daily step count was not confirmed by the client.",
    ],
  },
};
