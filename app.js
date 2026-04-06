/**
 * app.js — Renders the portfolio from data.json
 *
 * Flow:
 *  1. Fetch and parse data.json
 *  2. Update <title> and <meta description>
 *  3. Build HTML string from each section (profile, about, work, etc.)
 *  4. Inject into #app container
 *
 * Sections are only rendered if their data array/field exists and is non-empty,
 * so users can omit any section from data.json to hide it.
 */

const ARROW_SVG = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="ext-icon" aria-hidden="true"><path d="M3.5 3.5h5v5m0-5L3.5 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/** Render a standard two-column row (year | title + meta). */
function renderRow(item, showArrow = false) {
  return `
    <div class="row">
      <p class="year">${item.year}</p>
      <div>
        <a href="${item.url || '#'}" class="ext-link">${item.title}${showArrow ? ' ' + ARROW_SVG : ''}</a>
        ${item.location || item.meta ? `<p class="meta">${item.location || item.meta}</p>` : ''}
      </div>
    </div>`;
}

/** Render a generic list section (speaking, projects, education, etc.). */
function renderSection(label, heading, items, showArrow = true) {
  if (!items || !items.length) return '';
  let html = `<section class="block" aria-label="${label}"><h2>${heading}</h2>`;
  items.forEach(item => html += renderRow(item, showArrow));
  html += `</section>`;
  return html;
}

async function render() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('Failed to fetch data.json');
    const data = await res.json();

    // Update page meta
    document.title = `${data.profile.name} — Portfolio`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${data.profile.name} — ${data.profile.description}`);
    }

    const app = document.getElementById('app');
    let html = '';

    // ── Profile ──
    html += `
      <header class="profile" aria-label="Profile">
        <div class="profile__media" aria-hidden="true"${data.profile.image ? ` style="background-image: url('${data.profile.image}')"` : ''}>
          ${!data.profile.image && data.profile.initials ? data.profile.initials : ''}
        </div>
        <div class="profile__text">
          <h1>${data.profile.name}</h1>
          <p>${data.profile.description}</p>
          ${data.profile.website ? `<a href="${data.profile.website_url || '#'}" class="pill">${data.profile.website}</a>` : ''}
        </div>
      </header>`;

    // ── About ──
    if (data.about) {
      html += `
        <section class="block block--about" aria-label="About">
          <h2>About</h2>
          <p class="about">${data.about}</p>
        </section>`;
    }

    // ── Work Experience ──
    if (data.work && data.work.length) {
      html += `<section class="block" aria-label="Work experiences"><h2>Work Experience</h2>`;
      data.work.forEach(w => {
        if (w.type === 'images' && w.images) {
          html += `<div class="card-row" aria-hidden="true">`;
          w.images.forEach(img => {
            html += `<div class="shot"${img.url ? ` style="background-image: url('${img.url}')"` : ''}></div>`;
          });
          html += `</div>`;
        } else {
          html += renderRow(w, true);
        }
      });
      html += `</section>`;
    }

    // ── Writing ──
    if (data.writing && data.writing.length) {
      html += `<section class="block" aria-label="Writing"><h2>Writing</h2>`;
      data.writing.forEach(w => {
        if (w.type === 'feature') {
          html += `
            <a class="feature-card" href="${w.url || '#'}">
              <div class="feature-card__image" aria-hidden="true"${w.image ? ` style="background-image: url('${w.image}')"` : ''}></div>
              <div class="feature-card__text">
                <p class="feature-card__title">${w.title} ${ARROW_SVG}</p>
                ${w.meta ? `<p class="meta">${w.meta}</p>` : ''}
              </div>
            </a>`;
        } else {
          html += renderRow(w, true);
        }
      });
      html += `</section>`;
    }

    // ── Generic sections ──
    html += renderSection('Speaking experiences', 'Speaking', data.speaking);
    html += renderSection('Side projects', 'Side Projects', data.projects);
    html += renderSection('Education experiences', 'Education', data.education, false);

    // ── Contact ──
    if (data.contact && data.contact.length) {
      html += `<section class="block block--contact" aria-label="Contact"><h2>Contact</h2>`;
      data.contact.forEach(c => {
        html += `
          <div class="row">
            <p class="year">${c.label}</p>
            <div><a href="${c.url || '#'}" class="ext-link">${c.text} ${ARROW_SVG}</a></div>
          </div>`;
      });
      html += `</section>`;
    }

    app.innerHTML = html;
    app.style.display = 'flex';
  } catch (err) {
    console.error('Error rendering portfolio:', err);
    document.body.innerHTML = `<div style="padding:20px;color:red">Failed to load data.json. Run a local server (e.g. <code>python -m http.server</code>) to avoid CORS issues.</div>`;
  }
}

render();
