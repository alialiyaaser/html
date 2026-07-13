# UR SETUP — Test Credentials

## Super Admin (Dashboard)
- **URL**: `${REACT_APP_BACKEND_URL}/admin/login`
- **Email**: `admin@ursetup.sa`
- **Password**: `URSetup@2026!`
- **Role**: `super_admin`
- **Permissions**: All (users management, reviews, coming-soon, promo banner, newsletter)

## Roles Reference
- `super_admin` → Everything + add/remove admins
- `admin` → Reviews (approve/hide/delete) + coming-soon + promo + newsletter
- `moderator` → Reviews only (approve/hide, no delete)

## Auth Endpoints
- `POST /api/auth/login` → returns `{ access_token, user }`
- `GET /api/auth/me` → current user (Bearer)
- `POST /api/auth/change-password` → change own password

## Admin Endpoints (all require Bearer token)
- `GET /api/admin/overview`
- `GET/PATCH/DELETE /api/admin/reviews[/:id]`
- `GET/POST/PATCH/DELETE /api/admin/coming-soon[/:id]`
- `GET/PUT /api/admin/promo-banner`
- `GET /api/admin/newsletter`
- `GET/POST/PATCH/DELETE /api/admin/users[/:id]` (super_admin only)

## Notes
- Change the Super Admin password via UI after first login (Users → Reset password on your own row).
- ADMIN_EMAIL / ADMIN_PASSWORD in `/app/backend/.env` will re-sync the password on backend restart (idempotent seed).
