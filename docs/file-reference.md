# File Reference

Last audited: 2026-05-22

## Root Files

- `package.json` - scripts and dependencies. Scripts are `dev`, `build`, `start`, `lint`.
- `package-lock.json` - npm lockfile.
- `next.config.ts` - empty Next config.
- `tsconfig.json` - strict TypeScript, `@/*` alias to `src/*`, no emit.
- `eslint.config.mjs` - Next core web vitals and TypeScript config through `FlatCompat`.
- `postcss.config.mjs` - Tailwind CSS 4 PostCSS plugin.
- `firebase.json` - Firestore rules deployment config.
- `firestore.rules` - Firestore access control.
- `.env.example` - Firebase client, Firebase Admin, admin email, and Hostinger upload env examples.
- `README.md` - public project overview, partially stale against the current code.
- `firebase-applet-config.json` - empty file at audit time.

## App Routes

- `src/app/layout.tsx` - root HTML/body, fonts, global notification banner, analytics, global footer.
- `src/app/page.tsx` - main homepage composition. Still large and section-heavy.
- `src/app/globals.css` - Tailwind import plus custom animations and Swiper styles.
- `src/app/portfolio/page.tsx` - portfolio listing shell and metadata.
- `src/app/portfolio/[slug]/page.tsx` - portfolio detail page with Firestore-first/static-fallback resolver.
- `src/app/blog/page.tsx` - blog listing shell and metadata.
- `src/app/blog/[slug]/page.tsx` - blog detail page with Firestore-first/static-fallback resolver.
- `src/app/admin/login/page.tsx` - Firebase Auth login screen.
- `src/app/admin/(dashboard)/layout.tsx` - wraps admin pages in `AdminGuard` and `AdminShell`.
- `src/app/admin/(dashboard)/page.tsx` - dashboard page.
- `src/app/admin/(dashboard)/**/page.tsx` - thin route files that mount admin feature components/forms.
- `src/app/api/admin/session/route.ts` - token verification endpoint.
- `src/app/api/admin/upload/route.ts` - admin-only local upload endpoint.

## Public Components

- `src/components/Navbar.tsx` - responsive navigation and mobile menu.
- `src/components/Footer.tsx` - global footer, contact CTA, social links, compact contact form, and email.
- `src/components/ContactForm.tsx` - email-only Firestore contact submission.
- `src/components/NotificationBanner.tsx` - realtime active notification banner.
- `src/components/SiteEmail.tsx` - realtime `siteSettings/main.email` mail link.

## Section Components

- `src/components/sections/ServicesSection.tsx` - realtime service cards with fallback.
- `src/components/sections/ExperienceSection.tsx` - realtime experience timeline with fallback.
- `src/components/sections/HomePortfolio.tsx` - realtime homepage portfolio subset with fallback.
- `src/components/sections/PortfolioGallery.tsx` - realtime portfolio gallery with category filters.
- `src/components/sections/HomeBlogSlider.tsx` - realtime homepage blog slider with fallback.
- `src/components/sections/BlogGrid.tsx` - realtime blog grid with optional limit.

## UI Components

- `src/components/ui/GenericSlider.tsx` - Swiper wrapper for service, portfolio, review, and blog card types.
- `src/components/ui/ServicesCard.tsx` - service card display.
- `src/components/ui/PortfolioCard.tsx` - portfolio card display used by generic slider.
- `src/components/ui/Blog.tsx` - blog card display.
- `src/components/ui/ReviewCard.tsx` - testimonial card display.
- `src/components/ui/DualButtons.tsx` - hero CTA/toggle-like buttons.
- `src/components/ui/ArrowButton.tsx` - circular arrow primitive.
- `src/components/ui/OrangeButton.tsx` - orange CTA primitive.
- `src/components/ui/CustomeText.tsx` - text wrapper.
- `src/components/ui/Reveal.tsx` - framer-motion reveal wrapper.
- `src/components/ui/ClientOnly.tsx` - client mount gate.
- `src/components/ui/SourceBackLink.tsx` - back-link helper that preserves source navigation behavior.

## Admin Components

- `src/components/admin/AdminGuard.tsx` - verifies Firebase Auth user through `/api/admin/session`.
- `src/components/admin/AdminShell.tsx` - admin navigation and logout.
- `src/components/admin/AdminDashboard.tsx` - realtime counts, active notification count, recent messages.
- `src/components/admin/AdminProjects.tsx` - portfolio project list/delete.
- `src/components/admin/ProjectForm.tsx` - project create/edit and image uploads.
- `src/components/admin/AdminBlogs.tsx` - blog list/delete.
- `src/components/admin/BlogForm.tsx` - blog create/edit and featured image upload.
- `src/components/admin/AdminServices.tsx` - service list/delete and default seeding.
- `src/components/admin/ServiceForm.tsx` - service create/edit and image upload.
- `src/components/admin/AdminExperience.tsx` - inline work experience CRUD and default seeding.
- `src/components/admin/AdminNotifications.tsx` - inline notification CRUD.
- `src/components/admin/AdminMessages.tsx` - contact message status updates and delete.
- `src/components/admin/AdminSettings.tsx` - editable global settings document.
- `src/components/admin/AdminUi.tsx` - shared admin cards, fields, buttons, toast, skeleton, confirm dialog.

## Lib Files

- `src/lib/firebase.ts` - Firebase client app, Auth, Firestore, optional analytics.
- `src/lib/firebase-admin.ts` - server-only Firebase Admin app/auth/db proxies and admin token verification.
- `src/lib/public-content.ts` - server Firestore public reads with empty-array/null fallback on errors.
- `src/lib/content-types.ts` - Firestore document types and conversion helpers.
- `src/lib/upload-client.ts` - browser helper for authenticated admin uploads.
- `src/lib/admin-action.ts` - action timeout and error message helpers.
- `src/lib/slug.ts` - slug creation and comma/newline list parsing.

## Assets

Important current public assets include:

- `public/logo.webp`
- `public/my-pic.webp`
- `public/pic2.webp`
- `public/bottom-shape.webp`
- `public/HammadGfx-CV.pdf`
- `public/Frame 26.svg`, `Frame 60.svg`, `Frame 68.svg`, `Frame 77.svg`
- `public/Rectangle 6.svg`, `Rectangle 6 (1).svg`, `Rectangle 7.svg`
- `public/Property 1=Default.svg`, `Property 1=Variant2.svg`
- `public/sms.svg`

Asset filenames contain spaces and special characters. They work, but any asset cleanup should migrate them to stable slug-style filenames and update all references in one pass.
