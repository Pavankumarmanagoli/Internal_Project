import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", to: "/", hash: "how-it-works" },
  { label: "About", to: "/", hash: "about" },
  { label: "Contact", to: "/", hash: "contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3.5">
        <Link
          to="/"
          className="min-w-0 truncate font-display text-lg tracking-tight text-foreground"
          aria-label="What's Your Green — home"
        >
          What&rsquo;s Your <span className="text-primary">Green</span>
        </Link>

        <div className="flex shrink-0 items-center gap-1 sm:gap-6">
          <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/calculator"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep sm:inline-flex"
          >
            Get Your Green Score
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-card md:hidden"
        >
          <div className="container-page flex flex-col py-2">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/calculator"
              onClick={() => setOpen(false)}
              className="my-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Get Your Green Score
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
