import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { CurrencyInput, parseCurrency } from "@/components/site/CurrencyInput";
import { DraftBadge } from "@/components/site/DraftBadge";
import {
  ASSET_MAP,
  CHOICE_QUESTIONS,
  STEPS,
  type AssetKey,
  type ChoiceKey,
} from "@/lib/green-score.config";
import { emptyAnswers, loadAnswers, saveAnswers } from "@/lib/assessment-session";
import type { Answers } from "@/lib/green-score";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Green Score Assessment — What's Your Green" },
      {
        name: "description",
        content:
          "An eight-step guided assessment using approximate values. Nothing leaves your browser.",
      },
      { property: "og:title", content: "Green Score Assessment — What's Your Green" },
      {
        property: "og:description",
        content: "Answer eight short screens and see how flexible your wealth really is.",
      },
      { property: "og:url", content: "/calculator" },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
  }),
  component: CalculatorPage,
});

type Drafts = Partial<Record<AssetKey, string>>;

function CalculatorPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [drafts, setDrafts] = useState<Drafts>({});
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  // Restore any answers saved earlier in this browser session.
  useEffect(() => {
    const saved = loadAnswers();
    setAnswers(saved);
    setDrafts(
      Object.fromEntries(
        Object.entries(saved.amounts ?? {}).map(([k, v]) => [k, v ? String(v) : ""]),
      ) as Drafts,
    );
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveAnswers(answers);
  }, [answers, ready]);

  const step = STEPS[stepIndex] ?? STEPS[0]!;
  const progress = useMemo(() => Math.round(((stepIndex + 1) / STEPS.length) * 100), [stepIndex]);

  function validate(): boolean {
    const next: Partial<Record<string, string>> = {};

    (step.assets ?? []).forEach((key) => {
      const raw = drafts[key] ?? "";
      const parsed = parseCurrency(raw);
      if (parsed === null) {
        if (!ASSET_MAP[key].optional && raw.trim() === "") {
          next[key] = "Enter an approximate amount, or 0 if this doesn't apply to you.";
        }
        return;
      }
      if (Number.isNaN(parsed)) next[key] = "Use numbers only, for example 25000.";
      else if (parsed < 0) next[key] = "Amounts can't be negative.";
    });

    (step.choices ?? []).forEach((key) => {
      if (!answers.choices?.[key]) next[key] = "Choose one option to continue.";
    });

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function commitAmounts() {
    setAnswers((prev) => {
      const amounts = { ...prev.amounts };
      (step.assets ?? []).forEach((key) => {
        const parsed = parseCurrency(drafts[key] ?? "");
        if (parsed === null || Number.isNaN(parsed)) delete amounts[key];
        else amounts[key] = parsed;
      });
      return { ...prev, amounts };
    });
  }

  function handleContinue() {
    if (!validate()) return;
    commitAmounts();
    if (stepIndex === STEPS.length - 1) {
      navigate({ to: "/results" });
      return;
    }
    setStepIndex((i) => i + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    commitAmounts();
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
  }

  if (!ready) {
    return (
      <div className="container-page max-w-2xl py-20" aria-busy="true">
        <div className="h-2 w-full animate-pulse rounded-full bg-muted" />
        <div className="mt-8 h-48 animate-pulse rounded-3xl bg-muted" />
        <p className="sr-only">Loading assessment…</p>
      </div>
    );
  }

  return (
    <div className="container-page max-w-2xl py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <DraftBadge />
        <p className="text-sm text-muted-foreground" aria-hidden>
          Step {stepIndex + 1} of {STEPS.length}
        </p>
      </div>

      <div
        className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Assessment progress: step ${stepIndex + 1} of ${STEPS.length}`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section
        key={step.id}
        className="rise-in mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-9"
      >
        <h1 className="font-display text-2xl sm:text-3xl">{step.title}</h1>
        {step.subtitle ? (
          <p className="mt-2 leading-relaxed text-muted-foreground">{step.subtitle}</p>
        ) : null}

        <div className="mt-8 space-y-8">
          {(step.assets ?? []).map((key) => {
            const asset = ASSET_MAP[key];
            return (
              <CurrencyInput
                key={key}
                label={asset.label}
                help={asset.help}
                optional={asset.optional}
                value={drafts[key] ?? ""}
                error={errors[key]}
                onChange={(raw) => {
                  setDrafts((d) => ({ ...d, [key]: raw }));
                  setErrors((e) => ({ ...e, [key]: undefined }));
                }}
              />
            );
          })}

          {(step.choices ?? []).map((key) => (
            <ChoiceField
              key={key}
              choiceKey={key}
              value={answers.choices?.[key]}
              error={errors[key]}
              onSelect={(value) => {
                setAnswers((prev) => ({
                  ...prev,
                  choices: { ...prev.choices, [key]: value },
                }));
                setErrors((e) => ({ ...e, [key]: undefined }));
              }}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            disabled={stepIndex === 0}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
          >
            {step.review ? "See my score" : "Continue"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </section>

      <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
        <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        Your answers stay in this browser session only. We never ask for Social Security numbers,
        account numbers or logins.{" "}
        <Link to="/privacy" className="underline underline-offset-4">
          Privacy
        </Link>
      </p>
    </div>
  );
}

function ChoiceField({
  choiceKey,
  value,
  error,
  onSelect,
}: {
  choiceKey: ChoiceKey;
  value?: string | undefined;
  error?: string | undefined;
  onSelect: (value: string) => void;
}) {
  const question = CHOICE_QUESTIONS[choiceKey];
  return (
    <fieldset>
      <legend className="text-sm font-medium text-foreground">{question.label}</legend>
      {question.help ? <p className="mt-1 text-sm text-muted-foreground">{question.help}</p> : null}
      <div className="mt-3 grid gap-2">
        {question.options.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-sm transition-colors ${
                selected
                  ? "border-primary bg-forest-soft text-accent-foreground"
                  : "border-input bg-card hover:bg-secondary"
              }`}
            >
              <input
                type="radio"
                name={choiceKey}
                value={option.value}
                checked={selected}
                onChange={() => onSelect(option.value)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
