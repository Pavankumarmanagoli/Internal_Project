import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, KeyRound, Unlock, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-abstract.jpg";
import { DraftBadge } from "@/components/site/DraftBadge";
import { PILLAR_COPY, SITE_CONFIG } from "@/lib/green-score.config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "What's Your Green — How accessible is your wealth?" },
      {
        name: "description",
        content:
          "A calm, educational assessment of how accessible, usable and leverageable your wealth really is. Takes only a few minutes.",
      },
      { property: "og:title", content: "What's Your Green — How accessible is your wealth?" },
      {
        property: "og:description",
        content:
          "Your net worth doesn't always reveal how much financial flexibility you really have.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

const pillars = [
  { key: "accessible", icon: KeyRound },
  { key: "usable", icon: Unlock },
  { key: "leverageable", icon: TrendingUp },
] as const;

const steps = [
  { title: "Take the assessment", body: "Eight short screens with approximate values." },
  { title: "Get your score", body: "A single percentage with a clear colour status." },
  { title: "Understand your position", body: "Plain-English context, no jargon." },
  { title: "Review your options", body: "Optionally talk it through with a real person." },
];

function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-sand">
        <div className="container-page grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="rise-in">
            <DraftBadge />
            <h1 className="mt-6 font-display text-4xl leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
              How accessible is your wealth?
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              Your net worth doesn&rsquo;t always reveal how much financial flexibility you really
              have.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-forest-deep"
              >
                Get Your Green Score
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <p className="text-sm text-muted-foreground">Takes only a few minutes.</p>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Translucent green and sand-coloured layers overlapping on warm paper"
              width={1280}
              height={1024}
              className="w-full rounded-3xl border border-border object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-page py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-soft text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-5 font-display text-2xl">{PILLAR_COPY[key].label}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{PILLAR_COPY[key].blurb}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="border-y border-border bg-card">
        <div className="container-page grid gap-8 py-20 md:grid-cols-[minmax(0,1fr)_1.2fr]">
          <h2 className="font-display text-3xl leading-tight text-balance sm:text-4xl">
            A big balance sheet can still leave you stuck.
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Money held in retirement accounts, property or a private business is real — but
              reaching it can mean waiting, paying penalties, selling something you wanted to keep,
              or asking permission from someone else.
            </p>
            <p>
              Most people have never measured that difference. This assessment is a simple,
              educational way to look at it: what share of your wealth could you actually put to
              work today?
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="container-page scroll-mt-24 py-20">
        <h2 className="font-display text-3xl sm:text-4xl">How it works</h2>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="font-display text-sm text-primary">
                Step {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* About */}
      <section id="about" className="border-y border-border bg-sand">
        <div className="container-page grid items-start gap-10 py-20 md:grid-cols-[auto_minmax(0,1fr)]">
          <div
            className="flex h-40 w-40 shrink-0 items-center justify-center rounded-3xl border border-dashed border-border bg-card text-center text-xs text-muted-foreground"
            role="img"
            aria-label="Placeholder photo — to be replaced before launch"
          >
            [Placeholder photo]
          </div>
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">About</h2>
            <p className="mt-4 text-lg font-medium">{SITE_CONFIG.about.name}</p>
            <p className="text-sm text-muted-foreground">{SITE_CONFIG.about.role}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {SITE_CONFIG.about.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container-page scroll-mt-24 py-20">
        <h2 className="font-display text-3xl sm:text-4xl">Contact</h2>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <dt className="text-sm text-muted-foreground">Business email [placeholder]</dt>
            <dd className="mt-2 text-lg">
              <a
                className="underline underline-offset-4"
                href={`mailto:${SITE_CONFIG.contactEmail}`}
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </dd>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <dt className="text-sm text-muted-foreground">Business phone [placeholder]</dt>
            <dd className="mt-2 text-lg">
              <a
                className="underline underline-offset-4"
                href={`tel:${SITE_CONFIG.contactPhone.replace(/[^\d+]/g, "")}`}
              >
                {SITE_CONFIG.contactPhone}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      {/* Final CTA */}
      <section className="container-page pb-8">
        <div className="rounded-4xl bg-forest-deep px-7 py-14 text-center text-primary-foreground shadow-lift sm:px-12">
          <h2 className="font-display text-3xl text-balance sm:text-4xl">
            See where your wealth actually stands.
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed opacity-85">
            A few minutes, no account, no personal identifiers.
          </p>
          <Link
            to="/calculator"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-base font-medium text-foreground transition-transform hover:-translate-y-0.5"
          >
            Get Your Green Score
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
