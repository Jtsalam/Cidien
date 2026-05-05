# Demo Mode: "Sign in as Staff / Admin" Flow

## Background

Right now, logging into Cidien requires knowing a real Staff ID, password, and picking a hospital from a dropdown — which is a big barrier for anyone who just wants to explore the app. The goal is to replace that friction with two big one-click buttons: **"Sign in as Staff"** and **"Sign in as Admin"**, each automatically setting up a realistic demo session without touching real credentials.

---

## How the Current Auth System Works

Understanding this is critical before changing anything:

| Cookie | Used by |
|---|---|
| `organization` | All dashboards — maps to a hospital name via `orgMap` |
| `staff_Id` | Staff dashboard header, transcription filters, note approval |
| `user_role` | `dashboard/page.tsx` — routes to Staff or Admin panel |
| `staffSubmitted` | Middleware check (currently commented out) |

The **middleware** at `middleware.ts` only checks that `staff_Id` AND `organization` cookies exist to grant access to `/dashboard` and `/staff`. It doesn't verify them against the DB. This is key — we can set these cookies to valid demo values and the middleware will pass us through.

---

## Design Decisions

> [!IMPORTANT]
> **Hospital selection is gone from the login page.** Demo users don't need to pick a hospital — each role button auto-assigns a fixed demo hospital. We'll use **"Starlane General Hospital" (SGH)** as the default demo hospital for both roles. If you'd prefer different hospitals for each role, say so.

> [!IMPORTANT]
> **Nurse assignment in the Admin view** — the Admin panel's "Assign Bed" popup already fetches nurses dynamically from the DB based on `centerId`. Since we're always logging in as a demo hospital with real DB records, nurse assignment continues to work exactly as it does today. No changes needed there.

> [!NOTE]
> **Staff's "assigned rooms" feature** currently calls a Flask backend at `localhost:5000`. This will still fail in demo mode if Flask isn't running — that's pre-existing and unrelated to this refactor. The Staff dashboard gracefully handles empty rooms already.

---

## What Changes

### Strategy: A New "Demo Login" API Route
We'll add a new API route `/api/demo-login` that accepts a `role` (`"Staff"` or `"Admin"`) and sets all the required cookies using a real demo user from the DB. This keeps the auth logic clean and server-side.

---

### Component 1 — Sign-in Page

#### [MODIFY] [SelectOrganizationForm.tsx](file:///c:/xampp/htdocs/Cidien/components/Center/SelectOrganizationForm.tsx)
Replace with a clean, visually distinct two-button demo login page. No form fields, no dropdowns.
- Two large buttons: **"Sign in as Staff"** and **"Sign in as Admin"**
- A small "Demo Mode" badge to set expectations
- Keep the Cidien logo and branding
- On click → calls the new `/api/demo-login` route with the chosen role → redirects to `/dashboard`

#### [MODIFY] [page.tsx (sign-in)](file:///c:/xampp/htdocs/Cidien/app/sign-in/page.tsx)
Update to call `/api/demo-login` instead of `/api/center/signIn`. Simplify the handler since there are no form fields.

---

### Component 2 — New Demo Login API

#### [NEW] `app/api/demo-login/route.ts`
A POST route that:
1. Receives `{ role: "Staff" | "Admin" }`
2. Looks up the first matching user for that role in the demo hospital (`SGH` → Starlane General Hospital) from the DB
3. Sets cookies: `organization=SGH`, `staff_Id=<found staff_id>`, `user_role=<role>`, `staffSubmitted=true`
4. Returns `{ success: true }`

> [!NOTE]
> If the DB lookup fails (e.g. no demo users exist), it falls back to hard-coded safe defaults (`DEMO_STAFF` / `DEMO_ADMIN`) so the page always works.

---

### Component 3 — Dashboard Headers (display changes only)

Both the Staff and Admin `MainPanel.tsx` currently show the organization name and staff ID from cookies. In demo mode, these will naturally populate with the demo values (e.g., "Starlane General Hospital", "S001"). **No code changes needed here** — it works automatically.

---

### Component 4 — Middleware (minor tweak)

#### [MODIFY] [middleware.ts](file:///c:/xampp/htdocs/Cidien/middleware.ts)
The middleware currently checks `staff_Id` AND `organization`. The Admin panel also sets these cookies so that's fine. No structural changes needed, but we should make sure the `/Admin` route is also protected consistently (it currently isn't in the `protectedRoutes` array).

We'll add `/Admin` to `protectedRoutes` so it redirects to sign-in if cookies are missing.

---

## What The Demo Flow Looks Like

```
User visits /sign-in
  └─ Sees two buttons: "Sign in as Staff" | "Sign in as Admin"
  └─ Clicks one
      └─ POST /api/demo-login { role: "Staff" }
          └─ Server finds demo user in DB for SGH hospital
          └─ Sets cookies: organization=SGH, staff_Id=S001, user_role=Staff
          └─ Returns { success: true }
      └─ Client redirects to /dashboard
  └─ Middleware sees cookies → allows access
  └─ dashboard/page.tsx reads user_role cookie → renders StaffDashboard or AdminDashboard
```

---

## Open Questions

> [!IMPORTANT]
> **Which demo hospital should we use?** I'm proposing "Starlane General Hospital" (SGH) as the default for both Staff and Admin demo logins. Should Admin use a different hospital, or the same one?

> [!IMPORTANT]
> **Should we keep the old login form at all?** For example, keeping a small "Staff Login" link for real users while showing the demo buttons prominently. Or should we go full demo-only?

> [!WARNING]
> **Staff "Assigned Rooms" depends on a Flask backend** at `localhost:5000`. This is pre-existing and will continue to show an error/empty rooms if Flask isn't running. Do you want to also mock this in demo mode, or leave it as-is?

---

## Files Changed

| File | Action |
|---|---|
| `components/Center/SelectOrganizationForm.tsx` | MODIFY — replace form with two role buttons |
| `app/sign-in/page.tsx` | MODIFY — update handler to call `/api/demo-login` |
| `app/api/demo-login/route.ts` | NEW — server-side demo login logic |
| `middleware.ts` | MODIFY — add `/Admin` to protected routes |

---

## Verification Plan

### Automated
- Visit `/sign-in` → see two buttons
- Click "Sign in as Staff" → redirects to `/dashboard` → Staff dashboard renders
- Click "Sign in as Staff" → log out → Click "Sign in as Admin" → Admin dashboard renders
- Visit `/dashboard` without cookies → redirects to `/sign-in`

### Manual
- Verify Admin dashboard shows room list for demo hospital
- Verify Staff dashboard loads without errors (rooms may be empty if Flask is off)
- Verify logout works and clears cookies
