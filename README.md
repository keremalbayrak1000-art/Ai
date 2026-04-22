# Mebusan

Private intelligence for wealth that crosses borders.

This repository contains the Mebusan production codebase: marketing site, mobile app, admin tools, email automation, e-signature flow, and critical-alert infrastructure.

## Overview

- **68 public pages** — SEO-complete, structured data, RSS, service worker
- **Mobile app** — full signup → pay → dashboard (Capacitor-wrapped HTML)
- **Email system** — 24 branded templates + 6 PDF generators, pure-PHP with zero dependencies
- **E-signature flow** — capture, render, seal engagement letters with cryptographic anchoring
- **Critical alert pipeline** — email + automated phone call + in-app overlay fire simultaneously
- **Security-hardened** — CSP, HSTS, HMAC tokens, rate limiting, honeypots, audit log

## Stack

- **Backend:** Pure PHP 8.0+. No framework. File-based state.
- **Frontend:** Vanilla HTML/CSS/JS. Zero build step.
- **Mobile:** Capacitor wrapping the HTML app.
- **Payments:** Stripe Checkout + Customer Portal
- **Voice/SMS:** Twilio Programmable Voice + Messaging
- **Email:** Resend (recommended) / Postmark / SendGrid / SMTP fallback
- **PDF:** Pure-PHP `MinPDF` — no Composer, no wkhtmltopdf, no imagemagick

## Quick start for Claude Code

1. Clone this repo
2. Open in Cursor, Zed, VS Code, or the Claude Code CLI
3. Start a Claude Code session — `CLAUDE.md` is auto-loaded with full context

Then just ask for what you want. Claude will already know the brand rules, file tree, pricing, and all constraints.

## Manual deployment

```bash
cp .env.example .env
./scripts/generate-secrets.sh >> .env    # Fills in crypto secrets
./scripts/deploy.sh                       # Rsync to Hostinger
./scripts/post-deploy.sh                  # SSH in and create cache dirs, set perms
```

## Documentation

- [`CLAUDE.md`](./CLAUDE.md) — Master context file (Claude Code auto-reads)
- [`docs/SECURITY.md`](./docs/SECURITY.md) — Threat model, hardening, audit
- [`docs/BRAND.md`](./docs/BRAND.md) — Voice, colour, typography, forbidden words
- [`docs/EMAIL.md`](./docs/EMAIL.md) — Email system operator guide
- [`docs/SIGNING.md`](./docs/SIGNING.md) — E-sign flow details
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — Hostinger deploy checklist

## License

Proprietary · All rights reserved · Mebusan AI PTE LTD, Singapore.
