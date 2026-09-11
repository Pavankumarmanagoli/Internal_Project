import { useId } from "react";

interface Props {
  label: string;
  help?: string | undefined;
  value: string;
  onChange: (raw: string) => void;
  error?: string | undefined;
  optional?: boolean | undefined;
}

export function CurrencyInput({ label, help, value, onChange, error, optional }: Props) {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {optional ? (
          <span className="ml-2 text-xs font-normal text-muted-foreground">optional</span>
        ) : null}
      </label>
      {help ? (
        <p id={helpId} className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {help}
        </p>
      ) : null}
      <div className="mt-3 flex items-center rounded-xl border border-input bg-card px-4 focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25">
        <span aria-hidden className="pr-2 text-lg text-muted-foreground">
          $
        </span>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          value={value}
          aria-describedby={`${help ? helpId : ""} ${error ? errorId : ""}`.trim() || undefined}
          aria-invalid={error ? true : undefined}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent py-3.5 text-lg tabular-nums outline-none placeholder:text-muted-foreground/60"
        />
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** "$1,234.50" / "1 234" -> number | null (null = empty). Invalid -> NaN. */
export function parseCurrency(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const cleaned = trimmed.replace(/[$,\s]/g, "");
  if (!/^\d*\.?\d*$/.test(cleaned) || cleaned === ".") return Number.NaN;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : Number.NaN;
}
