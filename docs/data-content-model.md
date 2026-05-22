# Data And Content Model

Last audited: 2026-05-22

## Content Sources

The project has two content layers:

- Static fallback content in `src/data/data.ts`.
- Dynamic Firestore content managed through `/admin` screens and consumed by realtime public components.

The fallback layer is important. Public pages still render meaningful content if Firestore is empty, unavailable, or missing server credentials.

## Static Fallback Data

`src/data/data.ts` exports:

- `experiences`: 3 work entries.
- `buttons`: category labels, mostly superseded by `portfolioCategories`.
- `iconAndText`: contact trust indicators.
- `skills`: marquee skills list.
- `blogs`: 3 static blog posts with slug, excerpt, category, SEO description, and content paragraphs.
- `portfolioCategories`: portfolio filters.
- `portfolioData`: 8 static portfolio projects with slug, category, services, challenge, solution, and result.
- `reviews`: testimonial cards.
- `cardData`: 6 service cards with image and icon keys.
- helper lookups: `getPortfolioProject(slug)` and `getBlogPost(slug)`.

## Firestore Collections

### `portfolioProjects`

Type: `PortfolioProjectDoc`

Fields:

- `title`, `slug`, `category`
- `shortDescription`, `fullDescription`
- `servicesUsed: string[]`
- `mainImageUrl`, `images: string[]`
- `order: number`
- `featured: boolean`
- `showOnHome: boolean`
- `status: "published" | "draft"`
- `createdAt`, `updatedAt`

Public reads:

- home portfolio: published, `showOnHome == true`, ordered by `order`, limited to 3.
- portfolio gallery: published, ordered by `order`.
- project detail: published by `slug`.

Admin:

- list, create, edit, delete.
- supports main image upload and gallery image upload to `portfolio`.

### `blogs`

Type: `BlogDoc`

Fields:

- `title`, `slug`, `excerpt`, `content`
- `featuredImageUrl`
- `category`, `author`
- `metaTitle`, `metaDescription`
- `tags: string[]`
- `status: "published" | "draft"`
- `createdAt`, `updatedAt`

Public reads:

- blog lists: published, ordered by `createdAt desc`.
- blog detail: published by `slug`.

Admin:

- list, create, edit, delete.
- supports featured image upload to `blogs`.
- `content` is stored as a string in Firestore and split into paragraphs by blank lines for display.

### `services`

Type: `ServiceDoc`

Fields:

- `title`, `slug`
- `shortDescription`, optional `fullDescription`
- `imageUrl`
- optional icon key: `Palette`, `Share2`, `PenTool`, `Printer`, `Monitor`, `FileText`
- `order`
- `status`
- timestamps

Public reads:

- services slider: published, ordered by `order`.

Admin:

- list, seed default services, create, edit, delete.
- image upload goes to `services`.

### `workExperience`

Type: `WorkExperienceDoc`

Fields:

- `companyName`, `role`, `location`
- `startDate`, `endDate`, `currentlyWorking`
- `description`
- `order`
- `status`
- timestamps

Public reads:

- experience timeline: published, ordered by `order`.

Admin:

- list, seed fallback experiences, create/update/delete inline.

### `notifications`

Type: `NotificationDoc`

Fields:

- `title`, `message`
- `type: "update" | "info" | "success" | "warning"`
- `active: boolean`
- timestamps

Public reads:

- active notifications, newest first.
- latest active notification is shown in a dismissible fixed banner; dismissal is stored in `localStorage` per notification id.

Admin:

- list, create/update/delete inline.

### `contactMessages`

Type: `ContactMessageDoc`

Fields:

- optional `name`, `phone`, `subject`, `message`
- required `email`
- `source: "website"`
- `status: "new" | "read" | "replied"`
- timestamps

Public writes:

- current contact form submits only `email`, `source`, `status`, and timestamps.

Admin:

- list newest first, mark read, mark replied, delete.

### `siteSettings/main`

Type: `SiteSettingsDoc`

Fields:

- `heroTitle`, `heroAnimatedWords`, `heroDescription`
- `whatsapp`, `email`, `linkedin`, `behance`, `instagram`
- optional `footerText`
- `cvUrl`
- `updatedAt`

Current public usage:

- `SiteEmail` reads only `email`.
- Most other settings are editable but not yet wired into the public homepage/footer.

## Type Conversion Helpers

`src/lib/content-types.ts` maps Firestore docs into legacy UI shapes:

- `portfolioDocToItem`
- `experienceDocToExperience`
- `blogDocToBlog`

Use these helpers or extend them when connecting new Firestore-backed UI to existing card components.

## Firestore Rules Notes

- Published public content is readable by visitors.
- `contactMessages` can be created by public visitors if email/source/status pass validation.
- Admin write access is locked to a hardcoded email in `firestore.rules`.
- If `ADMIN_EMAIL` changes, update `firestore.rules` too.

## Data Change Guidance

- For quick content edits that must work without Firebase, update `src/data/data.ts`.
- For admin-managed content, update Firestore through `/admin`.
- For new dynamic sections, create a typed Firestore doc type in `src/lib/content-types.ts`, add fallback data if needed, then consume through a small adapter component.
