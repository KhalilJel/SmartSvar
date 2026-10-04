import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const queuePath = path.join(root, "content/blog/queue.json");
const publicBlog = path.join(root, "public/blog");
const socialDir = path.join(root, "public/social-queue");
const sitemapPath = path.join(root, "public/sitemap.xml");
const siteUrl = "https://smartsvar.no";

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const published = queue.articles.filter((article) => article.status === "published");
const next = queue.articles.find((article) => article.status === "queued");

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}
function escapeHtml(value = "") {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
function validate(article) {
  const errors = [];
  if (!/^[a-z0-9-]+$/.test(article.slug || "")) errors.push("slug must contain lowercase letters, numbers and hyphens only");
  if (!article.title || article.title.length < 30 || article.title.length > 70) errors.push("title must be 30–70 characters");
  if (!article.description || article.description.length < 120 || article.description.length > 165) errors.push("meta description must be 120–165 characters");
  if (!article.intro || article.intro.length < 80) errors.push("intro is too short");
  if (!article.content || !article.content.includes("<h2>")) errors.push("article needs meaningful section headings");
  const plain = stripHtml(article.content);
  const words = plain.split(/\s+/).filter(Boolean).length;
  if (words < 450) errors.push(`article has only ${words} words; minimum is 450`);
  if (!article.content.includes("Kontakt SmartSvar")) errors.push("article must include a clear SmartSvar contact CTA");
  if (/\b(TODO|PLACEHOLDER|lorem ipsum)\b/i.test(plain)) errors.push("article contains placeholder text");
  if (queue.articles.filter((item) => item.slug === article.slug).length !== 1) errors.push("slug must be unique");
  if (errors.length) throw new Error(`Quality gate failed for "${article.slug}":\n- ${errors.join("\n- ")}`);
  return { words };
}
function articlePage(article) {
  const url = `${siteUrl}/blog/${article.slug}/`;
  return `<!doctype html>
<html lang="no">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(article.title)} | SmartSvar</title>
<meta name="description" content="${escapeHtml(article.description)}"><meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(article.title)}"><meta property="og:description" content="${escapeHtml(article.description)}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="SmartSvar"><meta property="og:locale" content="nb_NO">
<style>
:root{color-scheme:light;--ink:#0b1f44;--blue:#2f80ed;--muted:#667085;--line:#e5e9f0}*{box-sizing:border-box}body{margin:0;background:#f8faff;color:var(--ink);font-family:Inter,Arial,sans-serif;line-height:1.75}.top{padding:24px 6vw;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;background:#fff}.brand{font-weight:800;letter-spacing:-.05em;color:var(--ink);text-decoration:none}.top a:last-child{color:var(--blue);text-decoration:none;font-size:14px}.article{max-width:780px;margin:0 auto;padding:64px 24px 90px}.eyebrow{text-transform:uppercase;letter-spacing:.14em;font:11px monospace;color:var(--blue)}h1{font-size:clamp(2.4rem,6vw,4.5rem);line-height:1.06;letter-spacing:-.055em;margin:16px 0 22px} .intro{font-size:1.25rem;color:#475467;line-height:1.6}.body{margin-top:40px;font-size:1.05rem}.body h2{font-size:1.65rem;letter-spacing:-.03em;line-height:1.2;margin:42px 0 14px}.body a{color:var(--blue)}.body li{padding:4px 0}.back{display:inline-block;margin-top:42px;color:var(--blue);text-decoration:none}.footer{border-top:1px solid var(--line);padding:24px 6vw;color:var(--muted);font-size:13px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}@media(max-width:600px){.article{padding-top:40px}.top{padding:18px 22px}}
</style>
</head><body><header class="top"><a class="brand" href="/">SMARTSVAR®</a><a href="/blog/">Alle artikler ↗</a></header>
<main class="article"><div class="eyebrow">${escapeHtml(article.category)} · ${article.publishedAt}</div><h1>${escapeHtml(article.title)}</h1><p class="intro">${escapeHtml(article.intro)}</p><div class="body">${article.content}</div><a class="back" href="/blog/">← Til alle artikler</a></main>
<footer class="footer"><span>© 2026 SmartSvar</span><span>Nettsider · Design · Digital kundeopplevelse</span></footer></body></html>`;
}
function writeIndex(articles) {
  const cards = articles.slice().sort((a,b) => b.publishedAt.localeCompare(a.publishedAt)).map((article) => `<a class="card" href="/blog/${article.slug}/"><div class="eyebrow">${escapeHtml(article.category)} · ${article.publishedAt}</div><h2>${escapeHtml(article.title)}</h2><p>${escapeHtml(article.description)}</p><span>Les artikkelen ↗</span></a>`).join("\n");
  const empty = '<p class="empty">Nye artikler publiseres her fortløpende.</p>';
  fs.mkdirSync(publicBlog, { recursive: true });
  fs.writeFileSync(path.join(publicBlog, "index.html"), `<!doctype html>
<html lang="no"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Artikler og innsikt | SmartSvar</title><meta name="description" content="Praktiske råd om nettsider, digital merkevarebygging og kundeopplevelser for norske bedrifter."><link rel="canonical" href="${siteUrl}/blog/"><meta property="og:title" content="Artikler og innsikt | SmartSvar"><meta property="og:description" content="Praktiske råd om nettsider, digital merkevarebygging og kundeopplevelser."><style>
:root{--ink:#0b1f44;--blue:#2f80ed;--muted:#667085;--line:#e5e9f0}*{box-sizing:border-box}body{margin:0;background:#f8faff;color:var(--ink);font-family:Inter,Arial,sans-serif;line-height:1.65}.top{padding:24px 6vw;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;background:#fff}.brand{font-weight:800;letter-spacing:-.05em;color:var(--ink);text-decoration:none}.top a:last-child{color:var(--blue);text-decoration:none;font-size:14px}.hero{padding:70px 6vw 48px;max-width:1000px}.eyebrow{text-transform:uppercase;letter-spacing:.14em;font:11px monospace;color:var(--blue)}h1{font-size:clamp(3rem,8vw,6rem);line-height:.98;letter-spacing:-.065em;margin:18px 0}.hero p{font-size:1.2rem;color:#667085;max-width:620px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px;padding:0 6vw 90px}.card{display:flex;flex-direction:column;min-height:270px;background:#fff;border:1px solid var(--line);border-radius:16px;padding:28px;color:inherit;text-decoration:none;transition:transform .2s,border-color .2s}.card:hover{transform:translateY(-3px);border-color:#9bbdf4}.card h2{font-size:1.7rem;line-height:1.15;letter-spacing:-.035em;margin:18px 0 10px}.card p{color:#667085;margin:0 0 24px}.card span{color:var(--blue);margin-top:auto;font-size:14px}.empty{color:var(--muted)}.footer{border-top:1px solid var(--line);padding:24px 6vw;color:var(--muted);font-size:13px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
</style></head><body><header class="top"><a class="brand" href="/">SMARTSVAR®</a><a href="/">Til forsiden ↗</a></header><main><section class="hero"><div class="eyebrow">SMARTSVAR / INNSIKT</div><h1>Kunnskap som<br>skaper fremgang.</h1><p>Praktiske råd om nettsider, digital merkevarebygging og kundeopplevelser for norske bedrifter.</p></section><section class="grid">${cards || empty}</section></main><footer class="footer"><span>© 2026 SmartSvar</span><span>Nettsider · Design · Digital kundeopplevelse</span></footer></body></html>`);
}
function updateSitemap(articles) {
  const urls = [`${siteUrl}/`, `${siteUrl}/blog/`, `${siteUrl}/demos/aura/`, `${siteUrl}/demos/noir/`, `${siteUrl}/demos/northline/`, `${siteUrl}/demos/salt-stone/`, ...articles.map((article) => `${siteUrl}/blog/${article.slug}/`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `<url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
  fs.writeFileSync(sitemapPath, xml);
}
if (!next) {
  writeIndex(published);
  updateSitemap(published);
  console.log(JSON.stringify({ status: "queue_empty", published: published.length }));
  process.exit(0);
}
const quality = validate(next);
const publishedAt = new Date().toISOString().slice(0,10);
next.status = "published";
next.publishedAt = publishedAt;
const target = path.join(publicBlog, next.slug, "index.html");
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, articlePage(next));
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + "\n");
const allPublished = queue.articles.filter((article) => article.status === "published");
writeIndex(allPublished);
updateSitemap(allPublished);
fs.mkdirSync(socialDir, { recursive: true });
const social = {
  publishedAt,
  articleTitle: next.title,
  articleUrl: `${siteUrl}/blog/${next.slug}/`,
  linkedin: next.social.linkedin,
  instagram: next.social.instagram,
  status: "ready_for_social_publishing"
};
fs.writeFileSync(path.join(socialDir, `${publishedAt}-${next.slug}.json`), JSON.stringify(social, null, 2) + "\n");
console.log(JSON.stringify({ status: "published", slug: next.slug, title: next.title, words: quality.words, publishedAt, socialQueue: social.status }));
