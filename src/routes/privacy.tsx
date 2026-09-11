import { createFileRoute } from "@tanstack/react-router";
import { SITE_CONFIG } from "@/lib/green-score.config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — What's Your Green" },
      {
        name: "description",
        content:
          "Placeholder privacy notice for the What's Your Green educational assessment preview.",
      },
      { property: "og:title", content: "Privacy — What's Your Green" },
      {
        property: "og:description",
        content: "Placeholder privacy notice pending legal review.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="container-page max-w-2xl py-16">
      <h1 className="font-display text-4xl">Privacy</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        [Placeholder document — must be written and legally reviewed before launch.]
      </p>
      <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
        <p>
          Answers you enter in the assessment stay in your browser for the current session only.
          They are not sent to a server by this preview build.
        </p>
        <p>
          {SITE_CONFIG.formSubmissionsStored
            ? "Contact details submitted through the booking form are stored so we can reply."
            : "Contact form submissions are not stored in this preview build. No storage or email delivery is connected yet."}
        </p>
        <p>
          Questions about this placeholder notice can go to {SITE_CONFIG.contactEmail} [placeholder
          address].
        </p>
      </div>
    </article>
  );
}
