# Magnus Ops Portal (React)

The Task 2 web admin portal for Magnus Green Infra, built from the Figma design:
**Operations Dashboard**, **Worker Directory & Enforcement**, and the **Assign & Dispatch** drawer.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build
```

Requires Node 18+.

## What works

| Screen | Interactions |
| --- | --- |
| Dashboard | Ticket search, status filter chips with live counts, date-range toggle, links into dispatch |
| Worker Directory | Search by ID / worker / vehicle / ticket, Affiliation + Zone filters, status tabs, row selection with select-all, **Export Excel** (CSV that opens in Excel), **Print** (print stylesheet hides chrome), empty state with *Clear filters* |
| Assign & Dispatch | Opens from any *Assign* / *View* button (`#/workers/assign/<ticket>`), pick team + vehicle (unavailable vehicles disabled), destination plant, note; **Assign & dispatch** updates the worker row and the dashboard ticket to *In-Progress* and shows a toast. Escape, the close button or the backdrop closes it |
| Responsive | Desktop 1440/1920; below 900px the sidebar becomes a slide-in menu, KPIs go 2-up, tables scroll horizontally |

## Structure

```
src/
  styles/tokens.css    design tokens (colour, 8pt spacing, radius, type) — same as the Figma UI kit
  styles/app.css       component styles
  icons.js             36-icon pack (24px grid, 2px stroke)
  data.js              mock data — swap for API calls
  components/ui.jsx    Icon, Badge, Plate, Avatar, Select, Segmented, PageHeader
  components/Sidebar.jsx
  pages/Dashboard.jsx
  pages/Directory.jsx
  pages/AssignDrawer.jsx
  App.jsx              hash router + shared state (workers, tickets, toast)
```

## Design notes

- Brief palette: Dark Navy sidebar `#0B132B`, Accent Indigo `#6366F1`, Off-White `#F1F5F9`.
  White text sits on `#4F46E5` (6.3:1) because white on `#6366F1` is 4.47:1, just under WCAG AA.
- Spacing uses an 8pt grid with a 4pt half-step (`--s-*` tokens).
- Real `<button>`, `<a>`, `<label>`, `<select>` elements throughout; visible focus rings; 44px targets.
- Fonts are bundled locally via Fontsource (Bricolage Grotesque, Geist, Geist Mono) — no CDN needed.
