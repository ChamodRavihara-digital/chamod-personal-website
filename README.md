# chamod.digital

Personal site of Chamod Ravihara — Performance Marketing Strategist, founder of WEGOT Digital and SOZO Visuals.
React + Vite + Tailwind, deployed on Vercel.

## Run locally
```
npm install
npm run dev        # http://localhost:3000
npm run build      # production build in /dist
```

## Where to edit things
| What | File |
|---|---|
| Name, email, WhatsApp, markets, stats | `content/site.ts` |
| Services, process, engagement models | `content/services.ts` |
| Case studies (Work pages) | `content/work.ts` |
| Client logos, real results, creatives, videos | `content/proof.ts` + files in `public/` |
| Ad Health Check questions & scoring | `content/healthCheck.ts` |
| Experience, principles, toolkit | `content/experience.ts` |
| Certifications & education | `content/credentials.ts` |
| Web3Forms access key | `src/lib/web3forms.ts` |
| Desktop zoom level (currently 80%) | bottom of `src/index.css` |

Any text starting with `TODO` is hidden on the site until you replace it.

## Forms
The Contact form and the Ad Health Check send leads through Web3Forms to hello@chamod.digital.
Health Check emails include the score and every answer. If sending fails, visitors are offered WhatsApp instead.

## Adding proof
- New result screenshot → put it in `public/images/results/`, add an entry to `results` in `content/proof.ts`.
- New creative → `public/images/creatives/`, add to `creatives`.
- New video → compress to H.264 MP4 (720p is plenty), put in `public/video/`, add a poster image and an entry to `videos`.
- New client logo → `public/logos/clients/`, add to `clients`.

## Deploy
Push to GitHub — Vercel builds automatically. `vercel.json` makes direct links like `/health-check` and `/work/...` load correctly.
