import type { BandId } from "@/lib/green-score.config";

const RING: Record<BandId, string> = {
  red: "var(--status-red)",
  yellow: "var(--status-yellow)",
  green: "var(--status-green)",
};

export function ScoreGauge({ score, band, label }: { score: number; band: BandId; label: string }) {
  const radius = 88;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference * (1 - Math.min(100, Math.max(0, score)) / 100);

  return (
    <figure
      className="flex flex-col items-center"
      role="img"
      aria-label={`Green Score ${score} out of 100. Status: ${label}.`}
    >
      <svg viewBox="0 0 220 130" className="w-full max-w-[320px]" aria-hidden="true">
        <path
          d="M 22 116 A 88 88 0 0 1 198 116"
          fill="none"
          stroke="var(--border)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M 22 116 A 88 88 0 0 1 198 116"
          fill="none"
          stroke={RING[band]}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)" }}
        />
        <text
          x="110"
          y="104"
          textAnchor="middle"
          fontSize="52"
          fontFamily="var(--font-display)"
          fill="var(--foreground)"
        >
          {score}%
        </text>
      </svg>
      <figcaption className="sr-only">
        Green Score {score} out of 100, status {label}.
      </figcaption>
    </figure>
  );
}
