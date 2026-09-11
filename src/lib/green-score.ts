/**
 * Pure scoring logic. No UI, no side effects, no hard-coded methodology —
 * every number comes from green-score.config.ts.
 */
import {
  ASSETS,
  BANDS,
  CHOICE_QUESTIONS,
  type AssetKey,
  type Band,
  type ChoiceKey,
} from "./green-score.config";

export type Pillar = "accessible" | "usable" | "leverageable";

export interface Answers {
  amounts: Partial<Record<AssetKey, number>>;
  choices: Partial<Record<ChoiceKey, string>>;
}

export interface ScoreResult {
  total: number;
  qualified: number;
  score: number;
  band: Band;
  pillars: Record<Pillar, { amount: number; percent: number }>;
  breakdown: Array<{ key: AssetKey; label: string; amount: number; qualified: number }>;
  hasAssets: boolean;
}

const PILLARS: Pillar[] = ["accessible", "usable", "leverageable"];

const safeAmount = (value: unknown): number => {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(n, 1e15);
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Provisional multiplier for a pillar, derived from follow-up answers. */
function pillarModifier(answers: Answers, pillar: Pillar): number {
  let modifier = 1;
  (Object.keys(CHOICE_QUESTIONS) as ChoiceKey[]).forEach((key) => {
    const selected = answers.choices?.[key];
    if (!selected) return;
    const option = CHOICE_QUESTIONS[key].options.find((o) => o.value === selected);
    const value = option?.modifiers?.[pillar];
    if (typeof value === "number") modifier *= value;
  });
  return modifier;
}

export function computeGreenScore(answers: Answers): ScoreResult {
  const amounts = answers?.amounts ?? {};
  const modifiers = {
    accessible: pillarModifier(answers, "accessible"),
    usable: pillarModifier(answers, "usable"),
    leverageable: pillarModifier(answers, "leverageable"),
  } as Record<Pillar, number>;

  let total = 0;
  let qualified = 0;
  const pillarAmounts: Record<Pillar, number> = { accessible: 0, usable: 0, leverageable: 0 };
  const breakdown: ScoreResult["breakdown"] = [];

  ASSETS.forEach((asset) => {
    const amount = safeAmount(amounts[asset.key]);
    if (amount === 0) return;
    total += amount;

    const perPillar = PILLARS.map((pillar) => {
      const weight = clamp01(asset.weights[pillar] * modifiers[pillar]);
      pillarAmounts[pillar] += amount * weight;
      return weight;
    });

    const greenWeight = clamp01(perPillar.reduce((a, b) => a + b, 0) / PILLARS.length);
    const assetQualified = amount * greenWeight;
    qualified += assetQualified;
    breakdown.push({
      key: asset.key,
      label: asset.short,
      amount,
      qualified: assetQualified,
    });
  });

  const hasAssets = total > 0;
  const rawScore = hasAssets ? (qualified / total) * 100 : 0;
  const score = hasAssets ? Math.round(Math.min(100, Math.max(0, rawScore))) : 0;

  const band = BANDS.find((b) => score >= b.min && score <= b.max) ?? BANDS[0]!;

  const pillars = PILLARS.reduce(
    (acc, pillar) => ({
      ...acc,
      [pillar]: {
        amount: pillarAmounts[pillar],
        percent: hasAssets ? Math.round((pillarAmounts[pillar] / total) * 100) : 0,
      },
    }),
    {} as ScoreResult["pillars"],
  );

  return { total, qualified, score, band, pillars, breakdown, hasAssets };
}

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
