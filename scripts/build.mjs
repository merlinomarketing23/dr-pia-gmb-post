import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const posts = JSON.parse(read('content/posts.json'));
const labels = { cosmetic: 'Cosmetic dentistry', restorative: 'Restorative dentistry', care: 'Ongoing care' };
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' })[char]);
const icons = {
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  expand: '<path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
if (posts.length !== 13 || new Set(posts.map(p => p.number)).size !== 13 || new Set(posts.map(p => p.slug)).size !== 13) throw new Error('The report must contain 13 unique service posts.');

function card(p) {
  if (!labels[p.group] || !/^https:\/\/www\.cosmeticdentistrynyc\.com\//.test(p.destination)) throw new Error(`Check category and destination for ${p.slug}`);
  if (typeof p.copy !== 'string' || p.copy.length > 1500) throw new Error(`Post ${p.slug} exceeds 1,500 characters.`);
  if (!/^assets\/[a-z0-9-]+\.png$/.test(p.image) || !fs.existsSync(path.join(root, 'public', p.image))) throw new Error(`Missing or invalid image: ${p.image}`);
  const paragraphs = p.copy.split('\n\n').map(text => text.startsWith('Learn more:')
    ? `<p class="destination"><span>Learn more</span><a href="${escape(p.destination)}" target="_blank" rel="noopener noreferrer">${escape(p.destination)}${icon('external')}</a></p>`
    : `<p${text.startsWith('#') ? ' class="hashtags"' : ''}>${escape(text)}</p>`).join('');
  const media = p.imageSource.startsWith('user-supplied:') ? 'Supplied brand visual with the service caption.' : `<a href="${escape(p.imageSource)}" target="_blank" rel="noopener noreferrer">Official website imagery ${icon('external')}</a>`;
  return `
    <article class="post-card" id="post-${escape(p.slug)}" data-group="${escape(p.group)}" data-number="${p.number}" aria-labelledby="title-${p.number}">
      <div class="card-heading"><span class="post-number">${String(p.number).padStart(2, '0')}</span><span class="card-category">${escape(labels[p.group])}</span><span class="draft-tag"><i></i>Draft</span></div>
      <button class="artwork" data-preview="${p.number}" aria-label="Enlarge ${escape(p.title)} image"><img src="${escape(p.image)}" alt="${escape(p.title)} branded post artwork" width="${p.imageWidth}" height="${p.imageHeight}" loading="lazy" decoding="async"><span class="expand-image">${icon('expand')}View image</span></button>
      <div class="card-body"><div class="service-heading"><h3 id="title-${p.number}">${escape(p.title)}</h3><span class="update-type">Update</span></div>
        <div class="post-copy">${paragraphs}</div>
        <div class="card-actions"><button class="copy-post" data-copy="${p.number}">${icon('copy')}<span>Copy post</span></button><button class="download-image" data-download="${p.number}">${icon('download')}<span>Download image</span></button><span class="character-count">${p.copy.length} characters</span></div>
        <details class="source-notes"><summary>Source &amp; review notes${icon('chevron')}</summary><div class="source-content"><p class="source-label">Content source</p><a class="source-url" href="${escape(p.destination)}" target="_blank" rel="noopener noreferrer">${escape(p.destination)}</a><p>Original wording based on this service page, checked ${escape(p.sourceChecked)}.</p><ul>${p.claims.map(claim => `<li>${escape(claim)}</li>`).join('')}</ul><p class="source-label">Treatment scope</p><p>${escape(p.limits)}</p><p class="source-label">Image source</p><p>${media}</p><p class="quiet-note">Branded artwork was assembled with AI-assisted editing. This post is a draft and has not been published.</p></div></details>
      </div>
    </article>`;
}

const data = posts.map(({ number, title, slug, copy, group }) => ({ number, title, slug, copy, group }));
const output = read('src/index.template.html').replace('__CARDS__', posts.map(card).join('')).replace('__POST_DATA__', JSON.stringify(data).replace(/</g, '\\u003c'));
if (/__[A-Z_]+__/.test(output)) throw new Error('Unresolved template placeholder.');
fs.writeFileSync(path.join(root, 'public/index.html'), output);
for (const name of ['styles.css', 'report.js']) fs.copyFileSync(path.join(root, 'src', name), path.join(root, 'public/assets', name));
console.log(`Built ${posts.length} service cards in public/index.html`);
