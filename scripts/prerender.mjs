import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { paths, render } from '../.prerender/entry-server.js';
const fontFiles = (await readdir('dist/assets')).filter(name => /^(cormorant-garamond|plus-jakarta-sans)-latin-wght-normal-.*\.woff2$/.test(name));
const fontPreloads = fontFiles.map(name => `<link rel="preload" href="/assets/${name}" as="font" type="font/woff2" crossorigin>`).join('');
const template=(await readFile('dist/index.html','utf8')).replace('</head>',fontPreloads+'</head>');
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const path of paths){
 const {html,title,description,canonical,page,article,service}=render(path);
 const schema={'@context':'https://schema.org','@type':'LocalBusiness',name:'Ginger Huff Interiors',url:'https://www.gingerhuffinteriors.com',telephone:'+1-618-791-9113',email:'ghi@gingerhuffinteriors.com',areaServed:['Edwardsville','Glen Carbon','St. Louis','Clayton','Ladue','Town and Country'],address:{'@type':'PostalAddress',addressLocality:'Edwardsville',addressRegion:'IL',addressCountry:'US'}};
 const articleSchema=article?{'@context':'https://schema.org','@type':'BlogPosting',headline:article.h1||article.title,description:article.excerpt,url:canonical,mainEntityOfPage:canonical,author:{'@type':'Organization',name:'Ginger Huff Interiors'},...(article.datePublished?{datePublished:article.datePublished,dateModified:article.dateModified}:{})}:null;
 // Service pages describe only what is visible on the page: the service, its breadcrumb and its FAQs.
 const serviceSchema=service?[
  {'@context':'https://schema.org','@type':'Service',name:service.name,serviceType:service.name,description:service.description,url:canonical,provider:{'@type':'LocalBusiness',name:'Ginger Huff Interiors',url:'https://www.gingerhuffinteriors.com/',telephone:'+1-618-791-9113'},areaServed:[{'@type':'City',name:'Edwardsville, IL'},{'@type':'Place',name:'St. Louis metro area'}]},
  {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[['Home','https://www.gingerhuffinteriors.com/'],['Services','https://www.gingerhuffinteriors.com/services/'],[service.name,canonical]].map(([name,item],i)=>({'@type':'ListItem',position:i+1,name,item}))},
  {'@context':'https://schema.org','@type':'FAQPage',mainEntity:service.faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))},
 ]:[];
 const schemas=[schema,...(articleSchema?[articleSchema]:[]),...serviceSchema];
 const meta=`<meta name="description" content="${escape(description)}"><link rel="canonical" href="${canonical}"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="${article?'article':'website'}"><meta property="og:image" content="https://www.gingerhuffinteriors.com/logos/Ginger%20Huff%20Interiors%20Logo.webp"><meta name="twitter:card" content="summary"><meta name="robots" content="${page==='not-found'?'noindex, follow':'index, follow'}"><script type="application/ld+json">${JSON.stringify(schemas.length>1?schemas:schema).replace(/</g,'\\u003c')}</script>`;
 let doc=template.replace(/<title>[\s\S]*?<\/title>/,`<title>${escape(title)}</title>`).replace('</head>',meta+'</head>').replace('<div id="root"></div>',`<div id="root">${html}</div>`);
 const target=path==='/404/'?'dist/404.html':join('dist',path,'index.html');
 await mkdir(join(target,'..'),{recursive:true}); await writeFile(target,doc);
}
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: https://www.gingerhuffinteriors.com/sitemap.xml\n');
await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.filter(p=>p!=='/404/').map(p=>`<url><loc>https://www.gingerhuffinteriors.com${p}</loc></url>`).join('')+'</urlset>');
console.log(`Prerendered ${paths.length} routes, sitemap, and robots.txt`);
