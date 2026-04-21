# cv_site

A lightweight, read.cv-style portfolio site. Content lives in `data.json`

## Quick Start

1. **Install Bun** (`https://bun.sh`)
2. **Edit `data.json`** with your info (name, bio, work history, contact links, etc.)
3. **Build static output**:
   ```bash
   bun run build
   ```
4. **Preview `dist/` locally**:
   ```bash
   bun dev
   ```
5. **Deploy `dist/`** to GitHub Pages, Netlify, Vercel, or any static host

## `data.json` Schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `profile.name` | string | ✅ | Your full name |
| `profile.description` | string | ✅ | Role + location (e.g. "Design in SF") |
| `profile.initials` | string | - | Fallback if no image is set |
| `profile.image` | string | - | URL or local path to profile photo |
| `profile.website` | string | - | Display text for website pill |
| `profile.website_url` | string | - | Link for the website pill |
| `about` | string | - | Short bio paragraph |
| `work` | array | - | Work experience entries |
| `writing` | array | - | Writing/articles entries |
| `speaking` | array | - | Speaking engagements |
| `projects` | array | - | Side projects |
| `education` | array | - | Education entries |
| `contact` | array | - | Contact/social links |

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
{ "label": "GitHub", "text": "username", "url": "https://github.com/username", "icon": "github" }
```

`contact[].icon` is optional. Supported values: `resume`, `github`, `linkedin`, `email`, `telegram`, `blog`, `twitter`, `x`, `rss`, `website`.

### Contact display mode

You can switch between:
- **Icon-based contact links** (default, shown below your name)
- **Text-based contact section** (full rows like Email / GitHub / LinkedIn)

To switch modes, edit [site-build.ts](/Users/ronell/Documents/Develop/web/cv_site/site-build.ts):
- For icon mode, keep `renderSocialPills(data.contact)` in the profile header and keep the `text based contact section` block commented out.
- For text mode, uncomment the `text based contact section` block and remove/disable `renderSocialPills(data.contact)` in the profile header.

## Optional Sections

Every section except `profile` is optional. To hide a section, simply remove its key from `data.json`.

## Dark Mode

Dark mode activates automatically based on the user's system preference. No toggle needed - edit the CSS variables in `:root` customise colours.

## Files

| File | Purpose |
|---|---|
| `data.json` | All site content - the only file users need to edit |
| `build.ts` | Bun build script that pre-renders `dist/index.html` |
| `dist/index.html` | Generated static HTML |
| `styles.css` | Source stylesheet copied to `dist/styles.css` |
| `dev.ts` | Bun static preview server for `dist/` |
