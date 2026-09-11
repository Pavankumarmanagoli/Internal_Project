import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/green-score.config";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Review — What's Your Green" },
      {
        name: "description",
        content: "Request a short, no-pressure conversation about your Green Score results.",
      },
      { property: "og:title", content: "Book a Review — What's Your Green" },
      {
        property: "og:description",
        content: "Request a call or book a time to walk through your results.",
      },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

type Fields = { name: string; email: string; phone: string; state: string };
type Status = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[\d\s()+.-]{7,20}$/;

function BookPage() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", phone: "", state: "" });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(): boolean {
    const next: Partial<Fields> = {};
    if (fields.name.trim().length < 2) next.name = "Please enter your name.";
    if (!emailPattern.test(fields.email.trim())) next.email = "Enter a valid email address.";
    if (!phonePattern.test(fields.phone.trim())) next.phone = "Enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      // CONFIGURATION POINT: no submission endpoint is connected in this preview.
      // Wire a real endpoint here, then set SITE_CONFIG.formSubmissionsStored = true.
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="container-page max-w-xl py-24 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden />
        <h1 className="mt-5 font-display text-3xl">Request noted</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          This preview build does not send or store submissions yet, so nothing was transmitted.
          Until a real endpoint is connected, please reach out directly at{" "}
          {SITE_CONFIG.contactEmail} [placeholder] or {SITE_CONFIG.contactPhone} [placeholder].
        </p>
      </div>
    );
  }

  return (
    <div className="container-page max-w-2xl py-14">
      <h1 className="font-display text-3xl sm:text-4xl">Review your Green Score</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        A short, no-pressure conversation about what your result means. Educational only.
      </p>

      <div className="mt-8 rounded-3xl border border-dashed border-border bg-sand p-6">
        <p className="flex items-center gap-2 font-medium">
          <CalendarCheck className="h-5 w-5 text-primary" aria-hidden />
          Booking link [placeholder]
        </p>
        {SITE_CONFIG.bookingUrl ? (
          <a
            href={SITE_CONFIG.bookingUrl}
            className="mt-4 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Choose a time
          </a>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Add a scheduler URL to <code>SITE_CONFIG.bookingUrl</code> to show a &ldquo;Choose a
            time&rdquo; button here. Until then, use the request form below.
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
      >
        <h2 className="font-display text-2xl">Request a call</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            id="name"
            label="Name"
            value={fields.name}
            error={errors.name}
            onChange={(v) => set("name", v)}
            autoComplete="name"
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={fields.email}
            error={errors.email}
            onChange={(v) => set("email", v)}
            autoComplete="email"
          />
          <Field
            id="phone"
            label="Phone"
            type="tel"
            value={fields.phone}
            error={errors.phone}
            onChange={(v) => set("phone", v)}
            autoComplete="tel"
          />
          <Field
            id="state"
            label="State (optional)"
            value={fields.state}
            onChange={(v) => set("state", v)}
            autoComplete="address-level1"
          />
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          [Consent copy placeholder — to be written and approved.] By submitting you agree to be
          contacted about your assessment. This preview does not store or transmit submissions.
        </p>

        {status === "error" ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            Something went wrong. Please try again, or email {SITE_CONFIG.contactEmail}.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request a call"}
        </button>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  type?: string | undefined;
  autoComplete?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-ring focus:ring-2 focus:ring-ring/25"
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
