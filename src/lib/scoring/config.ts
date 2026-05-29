export const scoringConfig = {
  conformingLoanLimit: 806_500,
  jumboThresholdMultiplier: 1.0,
  cashOutEquityThresholdPercent: 20,
  lowDownPaymentThresholdPercent: 5,
  creditTiers: {
    excellent: { min: 740, label: "Excellent (740+)" },
    good: { min: 700, label: "Good (700-739)" },
    fair: { min: 660, label: "Fair (660-699)" },
    poor: { min: 580, label: "Below Average (580-659)" },
    veryPoor: { min: 0, label: "Needs Improvement (Below 580)" },
  },
  gradeThresholds: {
    "A+": 90,
    A: 80,
    B: 70,
    C: 60,
    D: 0,
  },
  urgencyWeights: {
    "0-30-days": 100,
    "1-3-months": 75,
    "3-6-months": 50,
    "6-plus-months": 25,
    exploring: 10,
  },
};
