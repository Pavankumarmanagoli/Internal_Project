import { createFileRoute } from "@tanstack/react-router";
import { DISCLAIMER, METHODOLOGY } from "@/lib/green-score.config";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Educational Use Disclaimer — What's Your Green" },
      {
        name: "description",
        content:
          "What's Your Green is an educational tool. Results come from a draft, unapproved model and are not financial advice.",
      },
      { property: "og:title", content: "Educational Use Disclaimer — What's Your Green" },
      {
        property: "og:description",
        content: "Educational use only. Not financial, tax, legal or investment advice.",
      },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <article className="container-page max-w-2xl py-16">
      <h1 className="font-display text-4xl">Educational use disclaimer</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Methodology {METHODOLOGY.version} — {METHODOLOGY.status}
      </p>
      <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
        <p>{DISCLAIMER}</p>
        <p>
          The scoring model, weights, thresholds and wording used in this preview are provisional
          development placeholders. They have not been reviewed or approved by a qualified
          professional and may change entirely.
        </p>
        <p>
          Nothing here creates an advisory relationship. Speak with a qualified professional before
          making financial decisions.
        </p>
      </div>
    </article>
  );
}
