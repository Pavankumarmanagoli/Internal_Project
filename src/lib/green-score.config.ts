/**
 * ============================================================================
 * WHAT'S YOUR GREEN — SCORING CONFIGURATION (DRAFT / UNAPPROVED)
 * ============================================================================
 *
 * SINGLE SOURCE OF TRUTH for every question, asset definition, weight,
 * classification, threshold and result message used by the assessment.
 *
 * Everything in this file is PROVISIONAL, development-only placeholder logic.
 * It must be reviewed and replaced by an approved methodology before any
 * public launch. No UI component should hard-code financial methodology.
 *
 * Provisional formula:
 *   score = (green-qualified amount / total assessed amount) * 100
 *
 * Provisional bands: 0-19 Red, 20-49 Yellow, 50-100 Green.
 * ============================================================================
 */

export const METHODOLOGY = {
  version: "0.1.0-draft",
  status: "DRAFT — NOT PROFESSIONALLY APPROVED",
  label: "Draft methodology preview",
  note: "Provisional development logic. Educational preview only. Not financial advice.",
} as const;

/* -------------------------------------------------------------------------- */
/* Assets                                                                      */
/* -------------------------------------------------------------------------- */

export type AssetKey =
  "cash" | "taxable" | "retirement" | "otherFinancial" | "realEstateEquity" | "businessEquity";

/**
 * Pillar weights are provisional fractions (0-1) describing how much of an
 * asset class is typically considered accessible / usable / leverageable.
 */
export interface AssetDefinition {
  key: AssetKey;
  label: string;
  short: string;
  help: string;
  optional: boolean;
  weights: { accessible: number; usable: number; leverageable: number };
}

export const ASSETS: AssetDefinition[] = [
  {
    key: "cash",
    label: "Cash and cash equivalents",
    short: "Cash",
    help: "Checking, savings, money market, short-term CDs. An approximate total is fine.",
    optional: false,
    weights: { accessible: 1, usable: 1, leverageable: 0.6 },
  },
  {
    key: "taxable",
    label: "Taxable investments",
    short: "Taxable investments",
    help: "Brokerage accounts holding stocks, bonds, funds or ETFs.",
    optional: false,
    weights: { accessible: 0.8, usable: 0.7, leverageable: 0.7 },
  },
  {
    key: "retirement",
    label: "Retirement assets",
    short: "Retirement",
    help: "401(k), 403(b), IRA and similar tax-deferred accounts.",
    optional: false,
    weights: { accessible: 0.25, usable: 0.2, leverageable: 0.15 },
  },
  {
    key: "otherFinancial",
    label: "Other financial assets",
    short: "Other financial",
    help: "Cash-value life insurance, annuities, trusts or similar holdings.",
    optional: false,
    weights: { accessible: 0.45, usable: 0.4, leverageable: 0.5 },
  },
  {
    key: "realEstateEquity",
    label: "Real estate equity (optional)",
    short: "Real estate",
    help: "Approximate market value minus what you still owe. Leave blank to skip.",
    optional: true,
    weights: { accessible: 0.15, usable: 0.15, leverageable: 0.45 },
  },
  {
    key: "businessEquity",
    label: "Business or private-company equity (optional)",
    short: "Business equity",
    help: "Approximate value of ownership in a private business. Leave blank to skip.",
    optional: true,
    weights: { accessible: 0.1, usable: 0.1, leverageable: 0.25 },
  },
];

export const ASSET_MAP: Record<AssetKey, AssetDefinition> = ASSETS.reduce(
  (acc, a) => ({ ...acc, [a.key]: a }),
  {} as Record<AssetKey, AssetDefinition>,
);

/* -------------------------------------------------------------------------- */
/* Choice questions                                                            */
/* -------------------------------------------------------------------------- */

export type ChoiceKey = "ageRange" | "accessSpeed" | "penaltyFree" | "borrowing";

export interface ChoiceOption {
  value: string;
  label: string;
  /** Provisional multipliers applied to the matching pillar (1 = neutral). */
  modifiers?: Partial<Record<"accessible" | "usable" | "leverageable", number>>;
}

export interface ChoiceQuestion {
  key: ChoiceKey;
  label: string;
  help?: string;
  options: ChoiceOption[];
}

export const CHOICE_QUESTIONS: Record<ChoiceKey, ChoiceQuestion> = {
  ageRange: {
    key: "ageRange",
    label: "Which age range best describes you?",
    help: "Used only to frame your results. Provisional question.",
    options: [
      { value: "under35", label: "Under 35" },
      { value: "35-49", label: "35 – 49" },
      { value: "50-59", label: "50 – 59" },
      { value: "60plus", label: "60 or older" },
    ],
  },
  accessSpeed: {
    key: "accessSpeed",
    label: "If you needed a meaningful amount of money, how quickly could you reach it?",
    options: [
      { value: "days", label: "Within a few days", modifiers: { accessible: 1.1 } },
      { value: "weeks", label: "Within a few weeks", modifiers: { accessible: 1 } },
      { value: "months", label: "It would take months", modifiers: { accessible: 0.8 } },
      { value: "unsure", label: "I'm not sure", modifiers: { accessible: 0.9 } },
    ],
  },
  penaltyFree: {
    key: "penaltyFree",
    label:
      "Could you use those funds without penalties, taxes or selling something you'd rather keep?",
    options: [
      { value: "mostly", label: "Mostly yes", modifiers: { usable: 1.1 } },
      { value: "some", label: "Some of it", modifiers: { usable: 0.95 } },
      { value: "rarely", label: "Rarely", modifiers: { usable: 0.75 } },
      { value: "unsure", label: "I'm not sure", modifiers: { usable: 0.9 } },
    ],
  },
  borrowing: {
    key: "borrowing",
    label: "Could you borrow against your assets today without disrupting your plans?",
    options: [
      { value: "yes", label: "Yes, I already could", modifiers: { leverageable: 1.15 } },
      { value: "partly", label: "Partly", modifiers: { leverageable: 1 } },
      { value: "no", label: "No", modifiers: { leverageable: 0.7 } },
      { value: "unsure", label: "I'm not sure", modifiers: { leverageable: 0.85 } },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* Steps (8 provisional screens)                                               */
/* -------------------------------------------------------------------------- */

export interface Step {
  id: string;
  title: string;
  subtitle?: string;
  /** Currency inputs shown on this screen. */
  assets?: AssetKey[];
  /** Choice questions shown on this screen. */
  choices?: ChoiceKey[];
  review?: boolean;
}

export const STEPS: Step[] = [
  {
    id: "about-you",
    title: "First, a little context",
    subtitle: "Provisional question — no personal identifiers are ever requested.",
    choices: ["ageRange"],
  },
  {
    id: "cash",
    title: "Cash and cash equivalents",
    subtitle: "Approximate values are perfectly fine.",
    assets: ["cash"],
  },
  {
    id: "taxable",
    title: "Taxable investments",
    subtitle: "Round to the nearest thousand if that's easier.",
    assets: ["taxable"],
  },
  {
    id: "retirement",
    title: "Retirement assets",
    subtitle: "A recent statement balance is close enough.",
    assets: ["retirement"],
  },
  {
    id: "other",
    title: "Other financial assets",
    subtitle: "Anything financial that didn't fit the previous screens.",
    assets: ["otherFinancial"],
  },
  {
    id: "property-business",
    title: "Property and business (optional)",
    subtitle: "Skip either one by leaving it blank.",
    assets: ["realEstateEquity", "businessEquity"],
  },
  {
    id: "access",
    title: "Access and usability",
    subtitle: "Two quick questions about how your money behaves in real life.",
    choices: ["accessSpeed", "penaltyFree"],
  },
  {
    id: "leverage",
    title: "Leverageability",
    subtitle: "One last question, then your score.",
    choices: ["borrowing"],
    review: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Bands and messaging                                                         */
/* -------------------------------------------------------------------------- */

export type BandId = "red" | "yellow" | "green";

export interface Band {
  id: BandId;
  label: string;
  min: number;
  max: number;
  headline: string;
  message: string;
}

export const BANDS: Band[] = [
  {
    id: "red",
    label: "Red",
    min: 0,
    max: 19,
    headline: "Most of your wealth appears locked up",
    message:
      "Based on this draft model, only a small share of what you hold looks accessible, usable or leverageable today. That is common — it usually reflects how assets were set up, not how much you have.",
  },
  {
    id: "yellow",
    label: "Yellow",
    min: 20,
    max: 49,
    headline: "You have some flexibility, with room to improve",
    message:
      "This draft model suggests a meaningful portion of your wealth is reachable, while a larger portion is tied up by timing, taxes or structure.",
  },
  {
    id: "green",
    label: "Green",
    min: 50,
    max: 100,
    headline: "A strong share of your wealth looks flexible",
    message:
      "Under this draft model, much of what you hold appears accessible, usable or leverageable. The next question is usually whether that flexibility is positioned where you want it.",
  },
];

export const PILLAR_COPY = {
  accessible: {
    label: "Accessible",
    blurb: "How quickly you could reach money if you needed it.",
  },
  usable: {
    label: "Usable",
    blurb: "How much you could actually use without penalties or forced trade-offs.",
  },
  leverageable: {
    label: "Leverageable",
    blurb: "How much could work for you without being sold or interrupted.",
  },
} as const;

export const DISCLAIMER =
  "What's Your Green is an educational tool. This score is generated by a draft, unapproved model and is not financial, tax, legal or investment advice, and not a recommendation to buy or sell anything. Figures you enter are approximations and results will vary.";

/* -------------------------------------------------------------------------- */
/* CONFIGURATION POINTS — replace before public launch                         */
/* -------------------------------------------------------------------------- */

export const SITE_CONFIG = {
  /** PLACEHOLDER — replace with the real business email. */
  contactEmail: "hello@example.com",
  /** PLACEHOLDER — replace with the real business phone number. */
  contactPhone: "(000) 000-0000",
  /** PLACEHOLDER — external scheduler URL (Calendly, etc.). Empty hides the button. */
  bookingUrl: "",
  /** PLACEHOLDER — set true only once a real submission endpoint is connected. */
  formSubmissionsStored: false,
  /** PLACEHOLDER — advisor/brand bio block on the landing page. */
  about: {
    name: "[Placeholder Name]",
    role: "[Placeholder Role]",
    bio: "[Placeholder bio — one short paragraph describing who runs What's Your Green and why this assessment exists. To be written and approved before launch.]",
  },
} as const;
