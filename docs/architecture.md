# Architecture

Last audited: 2026-05-22

## Stack

- Next.js `^16.2.6` App Router.
- React `^19.0.0` and TypeScript `strict: true`.
- Tailwind CSS 4 through `@tailwindcss/postcss`.
- Firebase client SDK for Auth and realtime Firestore reads/writes from client components.
- Firebase Admin SDK for server-only token verification and server Firestore reads.
- `lucide-react` icons, `swiper` sliders, `framer-motion` reveal animations, and Vercel Analytics.

## Route Map

- `/` - main portfolio landing page.
- `/portfolio` - portfolio gallery with category filtering.
- `/portfolio/[slug]` - portfolio detail page, resolved from Firestore first, static fallback second.
- `/blog` - blog listing page.
- `/blog/[slug]` - blog detail page, resolved from Firestore first, static fallback second.
- `/admin/login` - Firebase email/password login page.
- `/admin` - dashboard metrics and quick actions.
- `/admin/projects`, `/admin/projects/new`, `/admin/projects/edit/[id]`.
- `/admin/blogs`, `/admin/blogs/new`, `/admin/blogs/edit/[id]`.
- `/admin/services`, `/admin/services/new`, `/admin/services/edit/[id]`.
- `/admin/experience`, `/admin/notifications`, `/admin/messages`, `/admin/settings`.
- `/api/admin/session` - verifies Firebase ID token and configured admin email.
- `/api/admin/upload` - authenticated local image upload endpoint.

## Rendering Model

- Root layout (`src/app/layout.tsx`) loads Geist fonts, global CSS, `NotificationBanner`, page children, Vercel Analytics, and global `Footer`.
- Public route shells are mostly Server Components, but most dynamic content sections are Client Components because they subscribe to Firestore with `onSnapshot`.
- Public dynamic pages use a hybrid fallback model:
  - server attempts Firebase Admin reads through `src/lib/public-content.ts`;
  - if Firestore is unavailable or empty, static fallback data from `src/data/data.ts` keeps pages usable.
- `generateStaticParams` exists for static fallback blog and portfolio slugs, while `dynamicParams = true` permits future Firestore slugs.

## Data Flow

- Firebase browser config lives in `src/lib/firebase.ts` and reads `NEXT_PUBLIC_FIREBASE_*` values.
- Firebase Admin setup lives in `src/lib/firebase-admin.ts`; it is server-only and supports `FIREBASE_PRIVATE_KEY_BASE64` or `FIREBASE_SERVICE_ACCOUNT_JSON` fallback.
- Public Firestore listeners:
  - services -> `src/components/sections/ServicesSection.tsx`
  - home portfolio -> `HomePortfolio.tsx`
  - portfolio gallery -> `PortfolioGallery.tsx`
  - experience -> `ExperienceSection.tsx`
  - home blog slider -> `HomeBlogSlider.tsx`
  - blog grid -> `BlogGrid.tsx`
  - active notifications -> `NotificationBanner.tsx`
  - site email -> `SiteEmail.tsx`
  - contact form writes -> `ContactForm.tsx`
- Admin screens use client Firestore reads/writes after auth guard verification.

## Admin Security Model

- Login uses Firebase Auth email/password in `src/app/admin/login/page.tsx`.
- `AdminGuard` listens to auth state, sends the ID token to `/api/admin/session`, and redirects unauthorized users.
- `verifyAdminToken` checks token validity and exact email match with `ADMIN_EMAIL`.
- Firestore rules also hardcode admin access to `clyrotechpk@gmail.com`; keep this in sync with `ADMIN_EMAIL`.
- Uploads require the verified admin token and accept only JPG, PNG, and WEBP into whitelisted folders.

## Styling And UX Model

- Tailwind utility classes dominate component styling.
- `src/app/globals.css` defines hero entrance animations, rotating hero words, marquee animation, Swiper pagination, custom scrollbar, and reduced-motion behavior.
- Brand system is mostly orange `#FD853A`, dark `#171717`, white, and neutral grays.
- Layout still contains many fixed pixel dimensions and large inline class strings, especially in `src/app/page.tsx`.

## Deployment And Environment

- `firebase.json` only configures Firestore rules deployment.
- `next.config.ts` has no custom image domain config. Current dynamic remote images are rendered with plain `<img>`, not `next/image`.
- Upload API requires:
  - `HOSTINGER_UPLOAD_ROOT` or `HOSTINGER_PUBLIC_UPLOAD_ROOT`
  - `NEXT_PUBLIC_UPLOAD_BASE_URL` or `HOSTINGER_UPLOAD_PUBLIC_BASE`
  - optional `UPLOAD_MAX_MB`
- Server-side Firebase Admin requires:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY_BASE64`
  - optional `FIREBASE_FIRESTORE_DATABASE_ID`
