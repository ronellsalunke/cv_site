const renderArrow = () => `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="ext-icon" aria-hidden="true"><path d="M3.5 3.5h5v5m0-5L3.5 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

async function render() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error("Failed to fetch data.json");
    const data = await res.json();
    
    document.title = `${data.profile.name} — Portfolio`;

    const app = document.getElementById('app');
    let html = '';

    // Profile
    html += `
      <header class="profile" aria-label="Profile">
        <div class="profile__media" aria-hidden="true" ${data.profile.image ? `style="background-image: url('${data.profile.image}'); background-size: cover;"` : ''}>
          ${!data.profile.image && data.profile.initials ? data.profile.initials : ''}
        </div>
        <div class="profile__text">
          <h1>${data.profile.name}</h1>
          <p>${data.profile.description}</p>
          ${data.profile.website ? `<a href="${data.profile.website_url}" class="pill">${data.profile.website}</a>` : ''}
        </div>
      </header>
    `;

    // About
    if (data.about) {
      html += `
        <section class="block block--about" aria-label="About">
          <h2>About</h2>
          <p class="about">${data.about}</p>
        </section>
      `;
    }

    // Generic Row Renderer
    const renderRow = (item, isExt = false) => `
      <div class="row">
        <p class="year">${item.year}</p>
        <div>
          <a href="${item.url}" class="ext-link">${item.title} ${isExt ? renderArrow() : ''}</a>
          ${item.location || item.meta ? `<p class="meta">${item.location || item.meta}</p>` : ''}
        </div>
      </div>
    `;

    // Work
    if (data.work && data.work.length) {
      html += `<section class="block" aria-label="Work experiences"><h2>Work Experience</h2>`;
      data.work.forEach(w => {
        if (w.type === 'images') {
          html += `<div class="card-row" aria-hidden="true">`;
          w.images.forEach(img => {
            html += `<div class="shot ${img.class}" ${img.url ? `style="background-image: url('${img.url}'); background-size: cover;"` : ''}></div>`;
          });
          html += `</div>`;
        } else {
          html += renderRow(w, true);
        }
      });
      html += `</section>`;
    }

    // Writing
    if (data.writing && data.writing.length) {
      html += `<section class="block" aria-label="Writing experiences"><h2>Writing</h2>`;
      data.writing.forEach(w => {
        if (w.type === 'feature') {
          html += `
            <a class="feature-card" href="${w.url}">
              <div class="feature-card__image" aria-hidden="true" ${w.image ? `style="background-image: url('${w.image}'); background-size: cover;"` : ''}></div>
              <div class="feature-card__text">
                <p class="feature-card__title">${w.title} ${renderArrow()}</p>
                ${w.meta ? `<p class="meta">${w.meta}</p>` : ''}
              </div>
            </a>
          `;
        } else {
          html += renderRow(w, true);
        }
      });
      html += `</section>`;
    }

    // Speaking
    if (data.speaking && data.speaking.length) {
      html += `<section class="block" aria-label="Speaking experiences"><h2>Speaking</h2>`;
      data.speaking.forEach(w => html += renderRow(w, true));
      html += `</section>`;
    }

    // Projects
    if (data.projects && data.projects.length) {
      html += `<section class="block" aria-label="Side projects"><h2>Side Projects</h2>`;
      data.projects.forEach(w => html += renderRow(w, true));
      html += `</section>`;
    }

    // Education
    if (data.education && data.education.length) {
      html += `<section class="block" aria-label="Education experiences"><h2>Education</h2>`;
      data.education.forEach(w => html += renderRow(w, false));
      html += `</section>`;
    }

    // Contact
    if (data.contact && data.contact.length) {
      html += `<section class="block block--contact" aria-label="Contact"><h2>Contact</h2>`;
      data.contact.forEach(c => {
        html += `
          <div class="row">
            <p class="year">${c.label}</p>
            <div><a href="${c.url}" class="ext-link">${c.text} ${renderArrow()}</a></div>
          </div>
        `;
      });
      html += `</section>`;
    }

    app.innerHTML = html;
    app.style.display = 'flex';
  } catch (err) {
    console.error("Error rendering portfolio:", err);
    document.body.innerHTML = `<div style="padding: 20px; color: red;">Failed to load data.json. If running directly from the filesystem (file://), please run a local server due to CORS restrictions.</div>`;
  }
}

render();
