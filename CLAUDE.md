# CLAUDE.md

> **This file is automatically loaded by Claude Code at the start of every session.**
> It contains everything you need to work on the Mebusan codebase without back-and-forth.
> If something here contradicts what you see in the code, the code wins — but flag it so this can be updated.

---

## 0 · Who this project is for

**Kerem Albayrak**, founder of **Mebusan AI PTE LTD** (Singapore).

**What Mebusan is:** A private intelligence firm for cross-border wealth. Not a compliance vendor, not a news service, not a fintech, not an investment advisor, not a bank. Three tiers: Monitor ($290/mo), Advisory ($690/mo), Private ($1,200/mo).

**Who the end-user is:** Wealthy families, single-family offices, their advisors, family-office CIOs. People who already pay $30k/yr for geopolitical consultancies and get generic PDFs in return. Mebusan is the opposite of that.

**Voice in product copy:** Clinical, specific, measured, never cringe. If a sentence sounds like SaaS marketing, delete it. If it sounds like a private banker writing to a client of 12 years, keep it.

---

## 1 · Non-negotiable brand rules

### Colour palette (hex)

```
Background deep     #060504
Background card     #0a0806
Cream primary       #e8e2d4
Cream muted         rgba(232,226,212,0.72)
Cream faint         rgba(232,226,212,0.55)
Cream ghost         rgba(232,226,212,0.08 → 0.18)   for borders
Amber accent        #c8a03a    used sparingly (attachment labels, highlights)
Amber warm          #c87a4a    CRITICAL ALERTS ONLY
Green success       #3a7a58    signed-confirmation only
```

**Never use red.** Anywhere. Warm amber (`#c87a4a`) takes red's role.

### Typography

```
Logo          Josefin Sans 300, .38em letter-spacing
Body          Inter 400/500 (system fallback: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial)
Labels        Menlo, Monaco, 'SF Mono', Courier — 9–11px, .1em–.2em tracking, ALL CAPS
Display      Inter 200 weight, letter-spacing -0.02em to -0.025em (reduce weight, not size)
```

### Borders & shape

- Every border is **0.5px**, never 1px — this is signature
- Border colour: `rgba(232,226,212,0.08)` through `rgba(232,226,212,0.18)` depending on emphasis
- **Square corners only.** Exception: inputs may have 2px max radius
- Hairline rules: 0.5px cream-tinted dividers

### Forbidden words / phrases — zero exceptions

- No em-dashes (use en-dash `–` or period)
- No "AI-powered" / "AI-driven" / "powered by AI"
- No "club" — even if clients feel like members, never say it
- No "elite" / "exclusive" / "premium" / "boutique" as adjectives for us
- No "revolutionary" / "game-changing" / "disruptive" / "cutting-edge"
- No "empower" / "unlock" / "seamless" / "innovative"
- No startup-cringe ("we're on a mission to…", "meet your new…")
- No native `alert()` / `confirm()` / `prompt()` popups — use inline toast/sheet
- No emoji in UI or copy (rare exception: dev notes)
- No Dubai in Kerem's bio content
- No "Contact us for pricing" — all tier pricing is public & explicit
- No "Book a demo" — use "Request a call" or "Apply"
- No fake social proof / testimonials / press logos
- No countdown timers on pricing
- No stock photography (illustration only, or no imagery)

### Tone: wrong vs right

| Wrong | Right |
|---|---|
| "Welcome to Mebusan! We're so excited…" | "Your file is open." |
| "Our AI-powered platform delivers actionable insights." | "We track postures and pipelines, with named falsification paths." |
| "Get started with a free trial!" | "Apply for coverage." |
| "Contact our amazing support team 24/7!" | "Reply to any email we send. It reaches your analyst." |
| "Check out our premium tier!" | "Private tier is unlimited jurisdictions, 4-hour response." |

---

## 2 · Pricing (single source of truth)

| Tier | Monthly | Annual (effective /mo) | Annual billed | Jurisdictions | Response |
|---|---|---|---|---|---|
| **Monitor** | $290 | $245 | $2,940/yr | 4 | 48h |
| **Advisory** | $690 | $585 | $7,020/yr | 8 | 24h |
| **Private** | $1,200 | $1,020 | $12,240/yr | Unlimited | 4h |

Annual = 15% off monthly. Always.

Six Stripe products needed (three tiers × two cycles). Price IDs live in env vars.

---

## 3 · File tree

```
mebusan/
├── CLAUDE.md                           # THIS FILE — auto-loaded by Claude Code
├── README.md                           # GitHub repo README
├── LICENSE                             # Proprietary — all rights reserved
├── .gitignore
├── .env.example                        # Template for environment variables
├── capacitor.config.js                 # iOS/Android wrapper, appId com.mebusan.app
│
├── docs/                               # Operator documentation
│   ├── SECURITY.md                     # Threat model + hardening guide
│   ├── BRAND.md                        # Expanded voice & visual guide
│   ├── EMAIL.md                        # Email system setup
│   ├── SIGNING.md                      # E-sign flow details
│   └── DEPLOYMENT.md                   # Hostinger deploy steps
│
├── scripts/
│   ├── generate-secrets.sh             # Creates secure random env values
│   ├── deploy.sh                       # Rsync to Hostinger
│   ├── post-deploy.sh                  # Remote: create dirs, set perms
│   └── test-email.php                  # Send a single test email
│
├── app/
│   └── mebusan_app.html                # Full signup → pay → dashboard (2447 lines)
│
├── _changelog/                         # Version history
│
└── website/                            # → public_html/ on Hostinger
    ├── .htaccess                       # Root security hardening
    ├── sign.html                       # E-sign page (signature capture)
    ├── sign-complete.html              # Post-sign success page
    ├── index.html + 67 other pages     # Full public site
    ├── sitemap.xml, robots.txt, sw.js, manifest.webmanifest
    │
    ├── .well-known/security.txt
    ├── css/, js/
    │   └── js/security.js              # Client-side hardening bundle
    ├── icons/
    │
    ├── jur/                            # 14 country deep-dive files
    ├── journal/                        # Blog posts + RSS
    ├── legal/                          # privacy, terms, etc.
    │
    ├── cache/                          # WRITABLE runtime state (.htaccess-denied)
    │   ├── .htaccess                   # Block all direct access
    │   ├── email_queue/, email_sent/, email_log/
    │   ├── pdf_cache/
    │   ├── critical_alerts/
    │   ├── signatures/                 # Sign sessions
    │   ├── signed_documents/           # Signed PDFs
    │   ├── rate_limits/                # Per-IP rate-limit state
    │   ├── csrf_tokens/
    │   ├── audit_log/                  # Append-only security log
    │   └── signals/                    # Moderation pipeline
    │
    ├── api/                            # PHP endpoints (30+)
    │   ├── .htaccess                   # API hardening
    │   ├── _security.php               # Shared security layer (include this)
    │   ├── verify.php                  # 6-digit OTP (SMS + email)
    │   ├── stripe-webhook.php
    │   ├── ingest-signals.php
    │   ├── cron.php
    │   │
    │   ├── sign-request.php            # Create signing session
    │   ├── sign-session.php            # Lookup signing session
    │   ├── sign-doc.php                # Stream the PDF
    │   ├── sign-submit.php             # Receive signature, seal PDF
    │   │
    │   ├── alert-call.php              # Trigger Twilio voice call
    │   ├── alert-twiml.php             # Voice script
    │   ├── alert-call-status.php
    │   ├── alert-acknowledge.php
    │   └── alert-callback-request.php
    │
    ├── admin/
    │   ├── .htaccess                   # Extra admin hardening
    │   └── moderate.html
    │
    └── emails/                         # Email system (.htaccess-restricted)
        ├── .htaccess
        ├── lib/mailer.php              # Resend/Postmark/SendGrid/SMTP
        ├── lib/pdf.php                 # MinPDF — pure-PHP PDF
        ├── lib/pdf-signature.php       # Adds drawStrokes() for e-sign
        ├── templates/                  # 24 HTML + 24 TXT templates
        │   ├── _base.html, _base.txt
        │   ├── welcome-01-immediate .. welcome-07-two-weeks
        │   ├── engagement-sign-required      # Sign-me email
        │   ├── engagement-signed             # Countersigned confirmation
        │   ├── billing-*
        │   ├── alert-*
        │   ├── verify-otp, security-login-new-device
        │   ├── analyst-reply, quarterly-review-invitation, canary-renewed
        │   └── briefing-weekly
        ├── pdf/                        # 6 PDF generators
        │   ├── welcome-pack.php        # 6-page branded welcome
        │   ├── methodology.php         # 8 pages
        │   ├── security-guide.php      # 4 pages
        │   ├── briefing-template.php   # 6 pages
        │   ├── invoice.php             # 1 page
        │   └── engagement-letter.php   # 5+1 pages, signature-aware
        ├── assets/                     # HD logos (CID-attached)
        ├── queue.php                   # Lifecycle scheduler (cron)
        ├── send.php                    # HTTP send endpoint
        ├── unsubscribe.php             # RFC 8058 unsub
        └── README-EMAIL.md
```

---

## 4 · Stack & constraints

- **Hosting:** Hostinger shared PHP. No Composer, no Node at runtime.
- **Backend:** Pure PHP 8.0+. No framework. File-based state (JSON in `cache/`).
- **Frontend:** Vanilla HTML/CSS/JS. **Zero build step.** No npm, no webpack, no React.
- **Mobile:** Capacitor wrapper around `app/mebusan_app.html`. AppId `com.mebusan.app`.
- **Third-party services (minimal):**
  - **Stripe** — payments (unavoidable; regulated)
  - **Twilio** — voice calls for critical alerts + SMS fallback (unavoidable for telephony)
  - **Resend / Postmark / SendGrid** — pick ONE email provider
  - **Apple Pay** — iOS signup flow (unavoidable on iOS)
- **PDF generation:** pure-PHP `MinPDF`. No Composer, no external deps. A4. Base-14 fonts.
- **E-signatures:** Captured in browser canvas as vector strokes, rendered as native PDF paths (not images). Document anchored by SHA-256 hash.

### Environment variables

See `.env.example` for the full list. Critical ones:

```
MEBUSAN_SECRET                  # 32-byte hex master key (derives all others)
MEBUSAN_INTERNAL_KEY            # For service-to-service auth
UNSUB_SECRET                    # Legacy — still used by unsubscribe tokens
MEBUSAN_MAIL_PROVIDER=resend
RESEND_API_KEY=re_...
STRIPE_SECRET_KEY / STRIPE_PUBLIC_KEY / STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_{MONITOR,ADVISORY,PRIVATE}_{MONTHLY,ANNUAL}
TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_NUMBER
TWILIO_VOICE_CALLBACK_BASE=https://mebusan.com
ADMIN_PASSWORD_HASH             # bcrypt of admin password
MEBUSAN_ADMIN_IPS               # Optional CIDR allowlist
MEBUSAN_TRUST_PROXY=0/1         # Set 1 if behind Cloudflare
```

Generate secrets with `./scripts/generate-secrets.sh`.

---

## 5 · Security architecture

The whole security layer lives in `website/api/_security.php`. Every endpoint includes it.

```php
require_once __DIR__ . '/_security.php';
MebusanSecurity::applyApiHeaders();      // CSP + X-Frame-Options + etc.
MebusanSecurity::rateLimit('bucket', 30, 600);  // 30 req per 10 min
MebusanSecurity::requireCsrf($submitted);       // State-changing ops
MebusanSecurity::startSecureSession();          // SameSite=Strict, HttpOnly
```

**Features:**
- HMAC signing tokens (stateless, for sign / unsub / reset flows)
- Derived per-purpose secrets (`MebusanSecurity::secret('signing')`)
- Rate limiting (file-based, no Redis)
- CSRF double-submit
- Append-only audit log at `cache/audit_log/YYYY-MM.log`
- IP + email masking helpers
- Honeypot + timing checks
- Admin IP allowlist with CIDR support
- Constant-time comparisons via `hash_equals()`

**Server-level hardening** (`.htaccess` files):
- Forced HTTPS + HSTS 2 years
- Strict CSP locking down script/img/connect sources
- X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Block direct PHP execution in `cache/`
- Block common scanner probes (wp-admin, .env, .git, etc.)
- Deny dotfiles and backup extensions
- Remove server fingerprinting

**Client-side** (`js/security.js`, loaded on every page):
- Frame-busting
- Automatic honeypot injection into all forms
- Fetch() wrapper that adds CSRF + behavioural context headers
- `.secure-content` class disables right-click/copy
- Clipboard auto-clear for sensitive data (30s)
- Soft devtools detection with warning banner
- Window.opener nulling from untrusted referrers

**E-sign security:**
- HMAC-bound tokens, 90-day expiry
- Signature payload cryptographically anchored to unsigned-doc hash
- Audit log records: session ID, IP (masked), UA, method, session duration, interaction count, both document hashes
- Bot heuristics: minimum 3s session, minimum 3 user interactions
- Payload size capped at 2MB
- Stroke data sanitised (coordinate bounds + pressure clamping + count limits)

---

## 6 · Email system

See `docs/EMAIL.md` and `website/emails/README-EMAIL.md` for full setup.

**Summary:**
- 24 templates across lifecycle / billing / alerts / transactional / analyst / meta
- 6 PDF generators, all use `MinPDF` (pure PHP, zero deps)
- Lifecycle: `scheduleOnboarding($recipient)` fires sign-required first, then welcome-01 at +5min, then 02-07 over 14 days
- Provider abstraction: `MEBUSAN_MAIL_PROVIDER=resend|postmark|sendgrid|smtp`
- RFC 8058 List-Unsubscribe headers baked in
- HD logo CID-attached on every email (no external hotlinking)

---

## 7 · E-sign flow (new in v5)

The thing that makes signup feel serious:

1. Payment succeeds in `app/mebusan_app.html`
2. Server calls `queue.php::scheduleOnboarding($recipient)`
3. `engagement-sign-required` email goes immediately with:
   - Unsigned 5-page engagement letter PDF attached
   - "Review and sign" button → `/sign.html?t=<hmac-token>`
4. Client opens signing page (matches Mebusan aesthetic exactly):
   - PDF renders inline in an iframe
   - Signature captured via drawn-canvas or typed-name
   - Consent checkbox required
   - `/api/sign-submit.php` receives the payload
5. Server:
   - Validates bot heuristics (≥3s, ≥3 interactions)
   - Generates new PDF with signature as native vector paths on page 6
   - Computes SHA-256 hash
   - Persists to `cache/signed_documents/`
   - Records audit entry
   - Sends `engagement-signed` email with countersigned copy attached
6. Client redirected to `/sign-complete.html`
7. `welcome-01` fires 5 min after the sign-required email, regardless

---

## 8 · Common pitfalls (hard-won)

- **Don't break existing files.** Before editing any HTML, check for complex JS inside. Use `str_replace` with unique anchors; never regenerate wholesale.
- **Balance tags** after any edit (`<div>` vs `</div>`, `<script>` vs `</script>`).
- **Never `document.write`.** Ever.
- **No `localStorage`/`sessionStorage` in Claude.ai artifacts** (fails there) — but DO use them in `app/mebusan_app.html` (real browser/webview).
- **Date arithmetic** must use `Date.UTC` to avoid timezone drift in countdowns.
- **Stripe amounts are in cents.** $290.00 = `29000`.
- **Twilio phones are E.164** (`+12025551234`).
- **Subject lines** come from `{{subject: ...}}` on the FIRST LINE of each email template.
- **PDF fonts:** base-14 only. Embedding custom fonts hurts deliverability.
- **Logo is CID-attached**, not hotlinked. `src="cid:mebusan-logo"`.
- **Critical alerts fire THREE channels** simultaneously: email + phone + in-app overlay.
- **Billing + critical alerts** can never be unsubscribed — hardcoded.
- **"Club" is forbidden.** Rule 1. Always.

---

## 9 · What's already built (don't rebuild)

### Site (68 pages)
Full public site, SEO-complete, structured data, sitemap, RSS, service worker with 30-URL cached shell, offline page, speculation-rules prerendering.

### Mobile app
Full signup → 6-digit verify → tier + billing cycle → Apple Pay/card with live formatting → confirmation with analyst assignment → subscribed dashboard (tier badge, hero stats, countdown, coverage chips, billing, messages, security), critical alert overlay.

### Email system
24 templates, 6 PDF generators, lifecycle scheduler, unsubscribe, mailer with 4 provider backends.

### Critical alert infrastructure
Twilio voice + TwiML + status callbacks + in-app overlay with haptic/audio.

### E-sign flow
`sign.html`, `sign-complete.html`, four signing endpoints, `engagement-letter.php` PDF generator, two engagement email templates.

### Security layer
`_security.php`, `.htaccess` stack, `js/security.js`, audit log.

---

## 10 · Pending operator tasks (can't be automated)

1. **URGENT:** Rotate compromised Twilio token `d94b23dae265a0143f699e90eacee216`
2. Run `./scripts/generate-secrets.sh` and add output to Hostinger env
3. Create 6 Stripe products (three tiers × two billing cycles)
4. Configure Stripe webhook → `https://mebusan.com/api/stripe-webhook.php`
5. Add DNS records (SPF / DKIM / DMARC) on `mebusan.com`
6. Verify domain at chosen mail provider (Resend recommended)
7. Register Twilio number for voice + SMS
8. Register Apple Services ID `com.mebusan.app`
9. Register with ACRA Singapore (UEN goes into config + legal footer)
10. Submit sitemap to Google Search Console
11. Add cron jobs (ingest signals hourly, main cron 5-min, email queue 5-min)
12. Generate PGP key for warrant canary signing
13. Create writable cache subdirs on host (see `docs/DEPLOYMENT.md`)
14. Submit HSTS preload at `hstspreload.org` after 30 days on the site

---

## 11 · Voice calibration (keep handy when writing copy)

**Landing tagline:**
> Private intelligence for wealth that crosses borders.

**Welcome opening:**
> Your file is open at Mebusan.
> Confirmation MBSN-7421. Your tier: Advisory. Your analyst is being assigned. Your first briefing goes out Monday, 28 April.

**Methodology:**
> Every claim we send you carries three things: a confidence score from 1 to 5, a named falsification path, and a source posture.

**What we don't do:**
> We do not give legal, tax, or investment advice. We do not make predictions; we track postures. We do not sell your data. We do not publish anything with your name on it. We do not take commissions on anything we reference.

**Critical alert:**
> CRITICAL · ACTION RECOMMENDED
> Turkey. Correspondent-bank corridor tightening.
> Two USD correspondent relationships have been unwound in the last 72 hours.

**Cancellation:**
> Your Mebusan subscription is scheduled to end on 30 April. Coverage continues in full until that date. There will be no further billing.

If it reads like marketing, it's wrong. If it reads like a partner writing to a peer, it's right.

---

## 12 · When to ask before acting

- If a change touches tone/copy, match the voice calibration. If uncertain, match nearest existing text.
- If adding a new external service, ask first. Every third-party dependency is a compromise.
- If adding JS dependencies, ask first. Vanilla wins unless there's a real reason.
- If adding a new page, confirm it fits the 12-section sitemap or ask for placement.

Otherwise: just do it. Self-contained changes, tested structurally, with a one-paragraph summary.

---

*This file is the source of truth. Last updated with v5 (e-sign + security hardening).*
