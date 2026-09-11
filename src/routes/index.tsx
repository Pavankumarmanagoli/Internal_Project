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
        <div className="container-page py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              About What&rsquo;s Your Green
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              A clearer way to understand the flexibility behind your wealth
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              What&rsquo;s Your Green is a guided financial-access assessment. It helps you look
              beyond a single net-worth number and consider how readily your assets may be accessed,
              used or leveraged when opportunities and life decisions arise.
            </p>
            <blockquote className="mt-8 border-l-2 border-primary pl-6 font-display text-2xl leading-relaxed text-foreground">
              &ldquo;A strong financial position is not only about what you own. It is also about
              how confidently your resources can support what comes next.&rdquo;
            </blockquote>
          </div>

          <div className="mt-12">
            <h3 className="font-display text-2xl">How we can help</h3>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <article className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h4 className="text-lg font-medium">See your position clearly</h4>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Turn approximate financial information into a simple, easy-to-understand Green
                  Score.
                </p>
              </article>
              <article className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h4 className="text-lg font-medium">Identify possible constraints</h4>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Recognize where timing, penalties, taxes or asset structure may limit financial
                  flexibility.
                </p>
              </article>
              <article className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h4 className="text-lg font-medium">Start a useful conversation</h4>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Use your result as a starting point for a review with an expert and explore the
                  questions that matter to you.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container-page scroll-mt-24 py-20">
        <h2 className="font-display text-3xl sm:text-4xl">Contact</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Connect with the What&rsquo;s Your Green team to discuss your score and the questions it
          raises.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {SITE_CONFIG.contactPeople.map((person) => (
            <article
              key={person}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-soft font-display text-lg text-primary"
                aria-hidden
              >
                {person.charAt(0)}
              </div>
              <h3 className="mt-4 text-lg font-medium">{person}</h3>
              <p className="mt-1 text-sm text-muted-foreground">What&rsquo;s Your Green team</p>
            </article>
          ))}
        </div>
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
        <div className="mt-8 rounded-3xl border border-border bg-sand p-7 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h3 className="font-display text-2xl">Want to improve your Green Score?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Book a call with an expert. The Calendly destination is a demo link for this version
              and will be replaced with the approved calendar in the next release.
            </p>
          </div>
          <a
            href={SITE_CONFIG.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 hover:bg-forest-deep sm:mt-0"
          >
            Book a Call with an Expert
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
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
