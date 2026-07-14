# UR SETUP — Product Requirements Document

## Original Problem Statement
"لدي موقع بالفعل لكن اود تطويره بشكل كامل يدعم لغتين العربيه والانقليزيه مع اضافات اخرى"

Iteration 2 request: "اود ان اطور الهيكل يعني المربعات ابيها طبيعيه واحترافيه وابي بنر احترافي وابي عداد تنازلي او قريبا للمنتجات القادمه وهل يمكنك اضافه dash borad للتحكم خاص واقدر احط فيه صلاحيات واعطيه احد واشيله"

## Architecture
- **Frontend**: React 18 + react-router-dom v6 + Tailwind + Framer Motion + Lucide + Sonner
- **Backend**: FastAPI + Motor + Pydantic v2 + PyJWT + bcrypt
- **DB**: MongoDB — collections: users, reviews, newsletter, contacts, meta, coming_soon, settings

## What's Been Implemented

### Iteration 1 (2026-01-13)
- Bilingual EN/AR with RTL/LTR + localStorage
- Public site sections (Hero, Products, About, Why Us, Stats, Reviews with submit, Testimonials, FAQ, Newsletter, Contact, Footer, WhatsApp float, back-to-top)
- Backend: reviews, newsletter, stats, contact
- 6 seeded reviews (EN/AR mix)

### Iteration 2 (2026-01-13)
- **Immersive bento product cards** — 1 large + 2 stacked, full-image backgrounds with grain overlay
- **Why Us bento** with real setup images as card backgrounds
- **Top promo banner** — white strip above header (bilingual, CMS-managed, dismissible)
- **Coming Soon section** — hero teaser + live countdown (D/H/M/S) + notify-me CTA
- **JWT admin auth** — bcrypt, 12h access tokens, Bearer in Authorization header
- **Role-based admin dashboard** at `/admin` with 3 roles:
  - `super_admin` — everything + manage team members
  - `admin` — reviews (all actions) + coming-soon + promo + newsletter
  - `moderator` — reviews verify/hide only
- **Admin pages**: Overview, Reviews (verify/hide/delete), Coming Soon CRUD, Promo Banner CMS, Newsletter list + CSV export, Users mgmt (super_admin only)
- **Idempotent super admin seed** on backend startup (from ADMIN_EMAIL/ADMIN_PASSWORD env)
- **Testing**: 31/31 backend pytest cases pass; all frontend flows verified

## Test Credentials
- Super Admin: `admin@ursetup.sa` / `URSetup@2026!`
- See `/app/memory/test_credentials.md`

## Backlog (P1)
- httpOnly cookie storage for JWT (currently localStorage — XSS surface)
- Brute-force lockout on /api/auth/login (5 fails = 15min)
- Rate limiting middleware
- Split server.py into modules (auth, admin, public)
- Pydantic models for the currently-`dict` PATCH payloads (reviews/coming-soon)

## Backlog (P2)
- Password reset flow (email token)
- Audit log of admin actions
- Product routes with dedicated pages `/products/[slug]`
- Real Instagram feed integration
- Multi-currency price display
- Wishlist / favorites

## Next Tasks (immediate)
- User can now log in to `/admin/login` and start managing content
- Consider connecting newsletter to Resend/SendGrid for real delivery
