const $ = (id) => document.getElementById(id);
const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html) n.innerHTML = html; return n; };
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

fetch('data/portfolio.json')
  .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
  .then(render)
  .catch((e) => {
    console.error('Could not load data/portfolio.json:', e);
    const why = location.protocol === 'file:'
      ? 'The page was opened as a file. Run it through a local server (VS Code Live Server) or deploy it to Vercel.'
      : 'Check that data/portfolio.json exists and is valid JSON (jsonlint.com). Details: ' + e.message;
    $('projects').append(el('li', '', `<div class="item soon"><div class="shot">Error</div><div class="cap"><h3>Work could not load</h3><p>${esc(why)}</p></div></div>`));
  });

function render(d) {
  $('badge').textContent = d.profile.badge || '';

  $('projects').append(...d.projects.map((p) => {
    const li = el('li');
    if (p.placeholder) {
      li.innerHTML = '<div class="item soon"><div class="shot">Next project</div><div class="cap"><h3>Coming soon</h3><p>New work is on the way.</p></div></div>';
      return li;
    }
    const a = el(p.link ? 'a' : 'div', 'item');
    if (p.link) a.href = p.link;
    a.innerHTML = `<div class="shot">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">` : ''}${p.link ? '<span class="go" aria-hidden="true">↗</span>' : ''}</div>` +
      `<div class="cap"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><small>${esc(p.type)}${p.year ? ', ' + esc(p.year) : ''}</small></div>`;
    const img = a.querySelector('img');
    if (img) img.onerror = () => img.remove();
    li.append(a);
    return li;
  }));

  $('why-list').append(...d.why.map((w) => el('div', '', `<h3>${esc(w.title)}</h3><p>${esc(w.text)}</p>`)));
}

$('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  location.href = 'mailto:?subject=' + encodeURIComponent('Project inquiry') + '&body=' + encodeURIComponent('From: ' + $('email').value);
});