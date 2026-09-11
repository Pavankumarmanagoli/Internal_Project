/**
 * Session-only storage for assessment answers. Nothing is transmitted or
 * persisted beyond the browser tab.
 */
import type { Answers } from "./green-score";

const KEY = "wyg.assessment.v1";

export const emptyAnswers = (): Answers => ({ amounts: {}, choices: {} });

export function loadAnswers(): Answers {
  if (typeof window === "undefined") return emptyAnswers();
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return emptyAnswers();
    const parsed = JSON.parse(raw) as Answers;
    return {
      amounts: parsed?.amounts && typeof parsed.amounts === "object" ? parsed.amounts : {},
      choices: parsed?.choices && typeof parsed.choices === "object" ? parsed.choices : {},
    };
  } catch {
    return emptyAnswers();
  }
}

export function saveAnswers(answers: Answers): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(answers));
  } catch {
    /* storage unavailable — the assessment still works in memory */
  }
}

export function clearAnswers(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
