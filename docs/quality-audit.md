# Quality Audit

Audit date: 2026-05-22

## Verification Status

Code inspection was completed across routes, data, Firebase libraries, admin components, and docs.

Commands run on 2026-05-22 after lint/audit fixes:

- `npm install`
  - Completed successfully after dependency/script updates.
  - `swiper` is upgraded to `12.1.4`.
  - npm overrides force patched transitive `postcss@8.5.15` and `uuid@11.1.1`.
- `npm run build`
  - Passed with `.env` loaded.
- `npm run lint`
  - Passed with warnings only.
  - Remaining warnings are mostly intentional plain `<img>` usage for dynamic/uploaded images and unused lucide icon imports in `src/data/data.ts`.
- `npx tsc --noEmit`
  - Passed.
- `npm audit --audit-level=low`
  - Passed with `found 0 vulnerabilities`.

Note: this folder is not currently inside a Git repository, so there is no local history/status safety net.

## High-Priority Risks

1. Firestore admin email is duplicated in two places.
   - `src/lib/firebase-admin.ts` checks `ADMIN_EMAIL`.
   - `firestore.rules` hardcodes `clyrotechpk@gmail.com`.
   - Risk: changing only one creates confusing production/admin permission failures.
   - Fix: document one canonical admin email and update env + rules together, or generate rules from config outside the app.

2. Server Firestore failures are silently swallowed on public content reads.
   - `src/lib/public-content.ts` catches errors and returns empty/null.
   - Benefit: fallback content keeps pages alive.
   - Risk: missing credentials, bad indexes, or security problems can look like "no dynamic content" instead of a visible failure.
   - Fix: add structured server logging at least in non-production or behind a debug env.

3. `siteSettings/main` is only partially wired to public UI.
   - Admin can edit hero title, animated words, hero description, social links, footer text, CV URL, and email.
   - Public code currently uses only email through `SiteEmail`; homepage hero/footer still mostly use hardcoded content.
   - Risk: admin users expect settings to change the site but most fields do nothing.
   - Fix: wire settings through public components or hide fields until implemented.

4. Upload API writes to local filesystem.
   - `src/app/api/admin/upload/route.ts` writes under `HOSTINGER_UPLOAD_ROOT`.
   - Risk: works on traditional writable hosting, but not on serverless/immutable filesystems unless configured carefully.
   - Fix: keep Hostinger deployment assumption explicit or migrate uploads to Firebase Storage/S3/R2.

5. Admin dashboard/list pages depend on client Firestore permissions.
   - The UI verifies admin through server endpoint, but actual data writes still rely on Firestore rules.
   - Risk: rules/env mismatch causes verified admin UI to load but fail CRUD operations.
   - Fix: align `ADMIN_EMAIL` and Firestore rules, then test each admin screen after deployment.

## Medium-Priority Risks

1. Many public components are client components with realtime listeners.
   - This gives live content updates but increases client bundle and Firestore listener usage.
   - Consider server-rendered reads plus targeted realtime only where live updates matter.

2. Homepage remains monolithic.
   - `src/app/page.tsx` still owns large hero, service wrapper, portfolio, about, testimonials, contact, marquee, and blog composition.
   - Future layout changes would be safer after extracting hero, testimonials, contact, skills, and blog sections.

3. Static and dynamic data models are similar but not identical.
   - Conversion helpers bridge most differences.
   - Risk appears when adding a field to one layer but forgetting the other.
   - Fix: centralize schemas or add validation.

4. Firestore queries require composite indexes in production.
   - Examples: `status == published` + `orderBy(order)`, `status == published` + `showOnHome == true` + `orderBy(order)`, `active == true` + `orderBy(createdAt)`.
   - Firebase console will report missing indexes at runtime if not created.

5. `ContactForm` only collects email on the public site.
   - The admin message model supports name, phone, subject, and message, but the active form does not collect them.
   - This may be intentional for low-friction leads, but it limits lead context.

6. Local build requires Firebase env configuration.
   - Build now passes with `.env` loaded.
   - A clean environment still needs valid Firebase client/admin variables before prerender.

7. Large assets and duplicate icons can affect performance.
   - Some SVG/ICO/WEBP files are multiple MB.
   - `src/app/favicon.ico` is over 3 MB, unusually large for a favicon.

## Lower-Priority Maintenance Debt

- Public image references use filenames with spaces and encoded characters.
- Remote/admin-uploaded images use `<img>`, avoiding Next image config but losing optimization.
- README still describes an older/static version of the project.
- `firebase-applet-config.json` is empty.
- No test suite is present.
- No formatting script is present.
- No CI configuration is present.

## Good Current Properties

- Fallback content protects the public site from empty Firestore state.
- Admin upload endpoint validates auth, folder, MIME type, file size, and resolved path containment.
- Admin actions use timeouts for better UX on stalled network operations.
- Detail pages include metadata per resolved project/blog.
- Firestore types are centralized in `src/lib/content-types.ts`.
- Reduced motion is handled in global CSS.

## Recommended Verification For Future Changes

For UI/content changes:

- `npm run build`
- manually check `/`, `/portfolio`, `/blog`, one portfolio detail, one blog detail.

For admin changes:

- login as configured admin.
- verify `/admin`, list pages, create/edit/delete for affected collection.
- verify Firestore rules and indexes in the target Firebase project.

For upload changes:

- verify env vars.
- upload JPG, PNG, WEBP under each affected folder.
- confirm public URL loads in browser and persists after redeploy.
