# Project Documentation

Last audited: 2026-05-22

This folder is the working knowledge base for the Hammad GFX website. Use it before future changes so fixes, scaling work, and content updates start from the current architecture instead of old assumptions.

## Reading Order

1. `architecture.md` - runtime, routes, rendering model, integrations
2. `data-content-model.md` - static fallback data and Firestore collections
3. `file-reference.md` - important files and ownership map
4. `quality-audit.md` - verified risks and known improvement areas
5. `scaling-roadmap.md` - practical sequence for scaling the site

## Current Snapshot

- Framework: Next.js 16 App Router with React 19 and TypeScript.
- Website: Hammad GFX portfolio, services, blog, contact, notifications, and admin dashboard.
- Data model: static fallback content in `src/data/data.ts` plus dynamic Firebase/Firestore content.
- Admin: Firebase Auth email/password login, token verification through Firebase Admin SDK, Firestore CRUD screens, and image upload API.
- Hosting assumption: public site can run anywhere Next.js runs; upload API expects a writable Hostinger-style public upload directory configured by env vars.

## Future Task Rule

For any future task, first inspect live code and, when content behavior matters, inspect the relevant dynamic Firestore-backed path. Treat these docs as orientation, then verify the exact file/component/data path before editing.
