import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { ScoreGauge } from "@/components/site/ScoreGauge";
import { DraftBadge } from "@/components/site/DraftBadge";
import { clearAnswers, emptyAnswers, loadAnswers } from "@/lib/assessment-session";
import { computeGreenScore, formatCurrency, type Answers } from "@/lib/green-score";
import { DISCLAIMER, METHODOLOGY, PILLAR_COPY } from "@/lib/green-score.config";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Your Green Score — What's Your Green" },
      {
        name: "description",
        content:
          "Your draft Green Score: how much of your wealth looks accessible, usable and leverageable today.",
      },
      { property: "og:title", content: "Your Green Score — What's Your Green" },
      {
        property: "og:description",
        content: "A plain-English read on your financial flexibility. Educational preview.",
      },
      { property: "og:url", content: "/results" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/results" }],
  }),
  component: ResultsPage,
});

const STATUS_STYLES = {
  red: "bg-status-red-soft text-status-red",
  yellow: "bg-status-yellow-soft text-status-yellow",
  green: "bg-status-green-soft text-status-green",
} as const;

function ResultsPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);

  useEffect(() => {
    setAnswers(loadAnswers());
  }, []);

  const result = useMemo(() => computeGreenScore(answers ?? emptyAnswers()), [answers]);

  if (!answers) {
    return (
      <div className="container-page max-w-3xl py-20" aria-busy="true">
        <div className="h-64 animate-pulse rounded-3xl bg-muted" />
        <p className="sr-only">Calculating your score…</p>
      </div>
    );
  }

  if (!result.hasAssets) {
    return (
      <div className="container-page max-w-xl py-24 text-center">
        <h1 className="font-display text-3xl">No answers yet</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          We couldn&rsquo;t find a completed assessment in this session. It only takes a few
          minutes.
        </p>
        <Link
          to="/calculator"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground"
        >
          Start the assessment
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    );
  }

  const band = result.band;

  return (
    <div className="container-page max-w-4xl py-12 sm:py-16">
      <DraftBadge />
      <h1 className="mt-5 font-display text-3xl sm:text-4xl">Your Green Score</h1>

      <section className="rise-in mt-8 rounded-4xl border border-border bg-card p-6 shadow-lift sm:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
          <ScoreGauge score={result.score} band={band.id} label={band.label} />
          <div>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${STATUS_STYLES[band.id]}`}
            >
              {band.label} status
            </span>
            <h2 className="mt-4 font-display text-2xl leading-snug text-balance">
              {band.headline}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{band.message}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Roughly {formatCurrency(result.qualified)} of the {formatCurrency(result.total)} you
              entered looks green-qualified under this draft model.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {(["accessible", "usable", "leverageable"] as const).map((pillar) => (
          <article
            key={pillar}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <h3 className="font-display text-xl">{PILLAR_COPY[pillar].label}</h3>
            <p className="mt-3 font-display text-3xl text-primary tabular-nums">
              {result.pillars[pillar].percent}%
            </p>
            <div
              className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={result.pillars[pillar].percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${PILLAR_COPY[pillar].label} share`}
            >
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${result.pillars[pillar].percent}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {PILLAR_COPY[pillar].blurb}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-border bg-sand p-6 sm:p-8">
        <h2 className="font-display text-xl">What this means, plainly</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          This score compares the money you could realistically reach, use or borrow against with
          everything you told us you hold. A lower number doesn&rsquo;t mean you have less — it
          usually means more of it is locked behind timing, taxes or structure.
        </p>
        <ul className="mt-5 divide-y divide-border text-sm">
          {result.breakdown.map((row) => (
            <li key={row.key} className="flex items-center justify-between gap-4 py-2.5">
              <span className="min-w-0 truncate text-muted-foreground">{row.label}</span>
              <span className="shrink-0 tabular-nums">
                {formatCurrency(row.qualified)} of {formatCurrency(row.amount)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          to="/book"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
        >
          Review My Green Score
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <Link
          to="/calculator"
          onClick={() => clearAnswers()}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-4 text-sm font-medium hover:bg-secondary"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Start over
        </Link>
      </div>

      <aside className="mt-8 rounded-3xl border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
        <p className="font-medium text-foreground">Educational preview — {METHODOLOGY.status}</p>
        <p className="mt-2">{DISCLAIMER}</p>
        <Link to="/disclaimer" className="mt-3 inline-block underline underline-offset-4">
          Read the full disclaimer
        </Link>
      </aside>
    </div>
  );
}
