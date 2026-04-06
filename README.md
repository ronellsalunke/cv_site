# cv_site

A lightweight, read.cv-style portfolio site. No build tools, no frameworks — just edit `data.json` and deploy.

## Quick Start

1. **Edit `data.json`** with your info (name, bio, work history, contact links, etc.)
2. **Add a profile photo** — set `profile.image` to a path (`"photo.jpg"`) or URL
3. **Preview locally** — you need a local server since the page fetches `data.json`:
   ```
   python -m http.server
   ```
   Then open `http://localhost:8000`
4. **Deploy** — push to GitHub Pages, Netlify, Vercel, or any static host

## `data.json` Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `profile.name` | string | ✅ | Your full name |
| `profile.description` | string | ✅ | Role + location (e.g. "Design in SF") |
| `profile.initials` | string | — | Fallback if no image is set |
| `profile.image` | string | — | URL or local path to profile photo |
| `profile.website` | string | — | Display text for website pill |
| `profile.website_url` | string | — | Link for the website pill |
| `about` | string | — | Short bio paragraph |
| `work` | array | — | Work experience entries |
| `writing` | array | — | Writing/articles entries |
| `speaking` | array | — | Speaking engagements |
| `projects` | array | — | Side projects |
| `education` | array | — | Education entries |
| `contact` | array | — | Contact/social links |

### Standard entry (work, speaking, projects, education)

```json
{
  "year": "2022 — Now",
  "title": "Role at Company",
  "location": "City, Country",
  "url": "https://example.com"
}
```

### Work images

Insert between work entries to show portfolio shots:

```json
{
  "type": "images",
  "images": [
    { "url": "shot1.jpg" },
    { "url": "shot2.jpg" },
    { "url": "shot3.jpg" }
  ]
}
```

### Featured writing card

```json
{
  "type": "feature",
  "title": "Article title…",
  "meta": "3 min read",
  "image": "article-cover.jpg",
  "url": "https://example.com"
}
```

### Contact entry

```json
{ "label": "GitHub", "text": "username", "url": "https://github.com/username" }
```

## Optional Sections

Every section except `profile` is optional. To hide a section, simply remove its key from `data.json`. For example, to remove Speaking, delete the entire `"speaking": [...]` block.

## Dark Mode

Dark mode activates automatically based on the user's system preference via `@media (prefers-color-scheme: dark)`. No toggle needed — edit the CSS variables in `:root` and the `prefers-color-scheme` media query to customise colours.

## Files

| File | Purpose |
|---|---|
| `data.json` | All site content — the only file users need to edit |
| `index.html` | Shell HTML (font imports + script tag) |
| `app.js` | Reads `data.json` and renders the page |
| `styles.css` | All styling including responsive + dark mode |
