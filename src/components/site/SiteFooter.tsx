import { Link } from "@tanstack/react-router";
import { METHODOLOGY, SITE_CONFIG } from "@/lib/green-score.config";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-sand">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg">
            What&rsquo;s Your <span className="text-primary">Green</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            An educational look at how accessible, usable and leverageable your wealth really is.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {METHODOLOGY.status} · v{METHODOLOGY.version}
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
          <Link to="/calculator" className="text-muted-foreground hover:text-foreground">
            Assessment
          </Link>
          <Link to="/book" className="text-muted-foreground hover:text-foreground">
            Book a review
          </Link>
          <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground">
            Disclaimer
          </Link>
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}`}
            className="text-muted-foreground hover:text-foreground"
          >
            Email
          </a>
          <a
            href={`tel:${SITE_CONFIG.contactPhone.replace(/[^\d+]/g, "")}`}
            className="text-muted-foreground hover:text-foreground"
          >
            Phone
          </a>
        </nav>
      </div>
      <div className="border-t border-border/70">
        <p className="container-page py-6 text-xs leading-relaxed text-muted-foreground">
          Educational use only. Not financial, tax, legal or investment advice. Private development
          preview — content, methodology and contact details are placeholders pending review.
        </p>
      </div>
    </footer>
  );
}
