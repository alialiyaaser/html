# UR SETUP — Product Requirements Document

## Original Problem Statement
"لدي موقع بالفعل لكن اود تطويره بشكل كامل يدعم لغتين العربيه والانقليزيه مع اضافات اخرى"

Follow-ups:
- Existing static HTML/CSS/JS site for a Saudi gaming/setup accessories brand (UR SETUP — Premium Setup Accessories).
- User wants full bilingual EN/AR support and a **truly world-class global-brand feel** — not a normal e-commerce look. Verbatim: "نعم اريده موقع احترافي جدا جدا ليبدوا شي عالمي وبراند احترافي وليس متجر عادي".
- Add reviews/ratings + additional professional enhancements.

## Target Users
- Gulf gamers, streamers and setup enthusiasts (primary — AR)
- International design-conscious PC/desk enthusiasts (secondary — EN)
- Esports teams / offices (bulk orders)

## Core Requirements (static)
- Full bilingual EN/AR with proper RTL flip and persistent user choice
- Premium editorial dark aesthetic — luxury brand feel, not template e-commerce
- Reviews system (list, summary + rating breakdown, submit form)
- Testimonials of real setups + FAQ + Newsletter + WhatsApp float
- All product CTAs go to external Salla store

## Architecture
- Frontend: React 18 (CRA) + TailwindCSS + Framer Motion + Lucide React + Sonner
- Backend: FastAPI (uvicorn) + Motor (async Mongo) + Pydantic v2
- Database: MongoDB (collections: reviews, newsletter, contacts, meta)
- Static images served from /app/frontend/public

## What's Been Implemented — 2026-01-13
- Full-stack rewrite of static site into React + FastAPI + MongoDB (100% bilingual)
- Custom LangProvider with localStorage persistence, sets html[dir] + html[lang]
- Sections: Loader, Header (glassmorphic + lang toggle + mobile menu), Hero (editorial oversized display type + kinetic marquee band), Products (3 marble mousepad cards + product-detail modal with specs), About, Why Us (bento asymmetric grid), Stats (animated counters), Reviews (summary card with rating breakdown + list + submit modal), Testimonials (community setup grid), FAQ (accordion), Newsletter, Contact, Footer, Floating WhatsApp + back-to-top
- Backend APIs (all under /api): GET /, GET/POST /reviews, GET /reviews/summary, POST /newsletter (idempotent), GET /stats (animated counters + live avg rating), POST /contact
- 6 seeded verified reviews (mixed EN/AR)
- Design: pure black/white luxury with grain overlay, Cabinet Grotesk + Almarai typography, editorial spacing, no AI-slop patterns
- Testing: 12/12 backend tests pass; all frontend flows verified (lang toggle, product modal, review submit, newsletter, FAQ, back-to-top, external links)

## Backlog (P1)
- Wishlist / favorites persistence (localStorage)
- Real Instagram feed integration (Instagram Basic Display API)
- Search + filter on reviews (by rating / language)
- Admin approval flow for reviews (verified=true toggle) via simple admin route

## Backlog (P2)
- Product detail dedicated pages with routing (/products/[slug])
- Live inventory sync with Salla API
- Blog / editorial section for brand storytelling
- Multi-currency price display

## Next Tasks
- Optional: hook WhatsApp number to real business line (currently 966500000000 placeholder)
- Optional: connect newsletter to Resend/SendGrid for real delivery
