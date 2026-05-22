# Scaling Roadmap

Last audited: 2026-05-22

This roadmap is specific to the current Hammad GFX codebase: Next.js public site, Firestore-backed content, admin CRUD, local upload API, and static fallback data.

## Phase 0: Stabilize Current Dynamic System

Goal: make existing admin/content features reliable before adding more.

1. Align admin identity.
   - Set `ADMIN_EMAIL`.
   - Update `firestore.rules` to the same email.
   - Deploy rules and test admin reads/writes.

2. Verify Firebase indexes.
   - Create required composite indexes for published content queries.
   - Test homepage, portfolio gallery, blog grid, services, notifications, and admin lists.

3. Confirm upload deployment model.
   - Verify writable upload root on Hostinger.
   - Verify public base URL.
   - Test image upload in projects, blogs, and services.

4. Make dynamic read failures visible.
   - Add targeted logging or admin health checks for Firebase Admin read failures.
   - Keep public fallback behavior.

## Phase 1: Wire Settings Or Reduce Scope

Goal: remove admin confusion around settings fields.

1. Connect `siteSettings/main` to public UI:
   - hero title
   - animated words
   - hero description
   - footer text
   - social links
   - CV URL

2. Or temporarily remove/hide settings fields that are not consumed.

3. Add a small settings adapter so public components do not each reimplement fallback behavior.

## Phase 2: Componentize Homepage

Goal: make homepage edits small and low-risk.

Extract from `src/app/page.tsx`:

- `HeroSection`
- `TestimonialsSection`
- `ContactSection`
- `SkillsMarquee`
- `HomeBlogSection`
- optional `AboutHireSection`

Keep existing visual behavior during extraction. Avoid content rewrites in the same change unless required.

## Phase 3: Content Schema And Validation

Goal: prevent broken admin data from reaching public pages.

1. Add schema validation for Firestore payloads and static fallback data.
2. Validate:
   - slugs
   - status values
   - required images
   - category values
   - arrays such as services/tags/images
3. Make admin forms show validation messages before Firestore writes.
4. Keep type conversion helpers in `src/lib/content-types.ts` aligned with schema.

## Phase 4: Performance Work

Goal: improve load speed without breaking the design.

1. Optimize huge assets.
   - Compress/replace multi-MB favicon and hero assets.
   - Rename assets to slug-safe names.

2. Move remote image handling to a clear strategy.
   - If using Next image optimization, configure remote patterns.
   - If staying with `<img>`, document why and optimize uploaded files before serving.

3. Reduce client listeners where live updates are not needed.
   - Server-render public lists with Firestore Admin.
   - Use realtime only for admin screens, notification banner, and truly live content.

4. Run Lighthouse against `/`, `/portfolio`, `/blog`, and detail pages after each performance pass.

## Phase 5: Testing And Release Safety

Goal: make future changes safer.

1. Add a `typecheck` script.
2. Fix or replace `npm run lint` if `next lint` is incompatible with the installed Next version.
3. Add smoke tests for:
   - homepage navigation
   - contact submit
   - portfolio listing/detail
   - blog listing/detail
   - admin login redirect behavior
4. Add CI to run build, typecheck, lint, and smoke tests.

## Phase 6: Storage And CMS Maturity

Goal: support larger content volume and safer asset management.

Options:

- Keep Firestore and move uploads to Firebase Storage.
- Keep Hostinger uploads but add image resizing/compression on upload.
- Move content to a CMS if non-developers need richer editorial workflows.

Recommended near-term path:

- Keep Firestore for content.
- Move uploaded media to a managed object store when scale or deployment constraints require it.

## Definition Of Ready For Larger Scale

- Admin email and Firestore rules are aligned.
- Firestore indexes are created and documented.
- All admin settings either affect public UI or are removed.
- Homepage is split into section components.
- Dynamic content has validation.
- Uploads are durable and deployment-compatible.
- Build/type/lint checks run automatically.
- Main public routes have smoke coverage.
