# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## What's Your Green — pre-launch checklist

**This is a private development preview. It is not approved financial advice.**

### Placeholders to replace (all in `src/lib/green-score.config.ts` unless noted)

- `SITE_CONFIG.contactEmail` — business email (also shown in footer, privacy, book pages)
- `SITE_CONFIG.contactPhone` — business phone
- `SITE_CONFIG.bookingUrl` — scheduler URL; empty hides the "Choose a time" button
- `SITE_CONFIG.formSubmissionsStored` — set true only once real storage/email is connected
- `SITE_CONFIG.about` — name, role and bio on the landing page
- Landing page About photo — placeholder tile in `src/routes/index.tsx`
- Booking form submit handler in `src/routes/book.tsx` — no endpoint is connected
- `/privacy` — placeholder notice, needs legal drafting and review
- `/disclaimer` — placeholder wording, needs compliance review
- Favicon, social share image, and site domain (canonical/og:url are relative today)

### Approvals required before public launch

1. Professional review and approval of the scoring methodology: asset weights, follow-up
   modifiers, band thresholds (0–19 Red / 20–49 Yellow / 50–100 Green) and all result copy.
2. Compliance review of every claim, CTA and disclaimer.
3. Legal review of the privacy notice and consent copy on the booking form.
4. Sign-off on About content (no credentials, testimonials or statistics may be invented).
5. Confirmation of data handling before enabling any form storage or analytics.

### Architecture notes

- All questions, weights, thresholds and messages live in `src/lib/green-score.config.ts`.
- Scoring is a pure function in `src/lib/green-score.ts` (no UI dependencies).
- Answers persist to `sessionStorage` only, via `src/lib/assessment-session.ts`.
