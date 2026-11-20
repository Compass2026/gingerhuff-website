import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import fs from 'node:fs';
import BlogSection, { ArticleHero } from '../src/components/BlogSection.tsx';
import { heroVariants } from '../src/content/blog-hero.ts';
import { loadReleasedArticles } from '../src/content/compass-blog.ts';
import { BLOG_POSTS } from '../src/content/articles.ts';
import { pageMetadata, resolveRoute } from '../src/routing.ts';
const article = {
  slug:'test-room-planning', title:'Plan a room', description:'A room planning guide.', metaTitle:'Room planning guide', h1:'Plan for everyday life',
  datePublished:'2026-10-12',dateModified:'2026-10-12',
  bodyMarkdown:'## Room use\n\nSee [design services](https://www.gingerhuffinteriors.com/services/).\n\n- Keep **useful pieces**\n- Leave room to move\n\n<script>alert(1)</script>',
  cta:{text:'Discuss your room',url:'https://www.gingerhuffinteriors.com/contact/'},
  compass:{draft_id:'11111111-1111-4111-8111-111111111111',keyword_id:'22222222-2222-4222-8222-222222222222',release_hash:'sha256:'+'a'.repeat(64),version:1},
};
test('release renders actual links, headings, lists, CTA and provenance without executable HTML',()=>{
  const [post]=loadReleasedArticles([article],[]);
  const html=renderToStaticMarkup(React.createElement(BlogSection,{article:post}));
  assert.ok(html.includes('data-compass-release="'+article.compass.release_hash+'"'));
  assert.ok(html.includes('href="https://www.gingerhuffinteriors.com/services/"'));
  assert.ok(html.includes('<h2>Room use</h2>'));
  assert.ok(html.includes('<strong>useful pieces</strong>'));
  assert.ok(html.includes('Discuss your room'));
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes(article.h1));
  assert.ok(!html.includes('<script>') && !html.includes('alert(1)'));
});
test('invalid provenance, dangerous CTA, duplicate and reserved routes fail the build',()=>{
  assert.throws(()=>loadReleasedArticles([article,article],[]),/duplicate/);
  assert.throws(()=>loadReleasedArticles([{...article,slug:'services'}],[]),/slug/);
  assert.throws(()=>loadReleasedArticles([{...article,compass:{}}],[]),/provenance/);
  assert.throws(()=>loadReleasedArticles([{...article,cta:{text:'Bad',url:'javascript:alert(1)'}}],[]),/CTA/);
  assert.throws(()=>loadReleasedArticles([article],[{slug:article.slug} as any]),/duplicate/);
});
test('all four legacy article URLs remain intact, and every published release resolves at its own URL',()=>{
  // Approved Compass releases are added alongside the four legacy articles; they never replace them.
  assert.equal(BLOG_POSTS.filter(post=>post.id.startsWith('published-')).length,4);
  assert.equal(BLOG_POSTS.filter(post=>post.compass).length,BLOG_POSTS.length-4);
  for(const post of BLOG_POSTS){
    assert.equal(resolveRoute('/'+post.slug+'/').article?.id,post.id);
    assert.equal(pageMetadata('/'+post.slug+'/').canonical,'https://www.gingerhuffinteriors.com/'+post.slug+'/');
  }
});

const hero = { src:'/blog/images/test-room-planning-0123456789ab.png', alt:'A sunlit living room with layered window treatments & linen drapery', width:1920, height:1080, illustrative:true };
// The Compass CRM's live verification (blog-publisher verifyLiveArticle): an <img> whose src and alt equal the approved ones.
const attr = (tag: string, name: string) => new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, 'i').exec(tag)?.[1];
const decode = (s: string) => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'");
const heroShown = (html: string, src: string, alt: string) => [...html.matchAll(/<img\b[^>]*>/gi)].some(([tag]) => attr(tag,'src') === src && decode(attr(tag,'alt') ?? '') === alt);
test('the site advertises the Compass hero image contract the CRM requires',()=>{
  assert.deepEqual(JSON.parse(fs.readFileSync('compass-blog.json','utf8')),{version:1,adapter:'json_blog',keyword_provenance:true,markdown:true,seo_fields:true,
    hero_image:true,hero_image_dir:'public/blog/images',hero_image_url_prefix:'/blog/images/',tldr:true});
});
test('an approved hero renders after the H1 with its exact src, alt, dimensions and priority, and no caption',()=>{
  const [post]=loadReleasedArticles([{...article,heroImage:hero}],[]);
  assert.deepEqual(post.heroImage,hero);
  const html=renderToStaticMarkup(React.createElement(BlogSection,{article:post}));
  assert.ok(heroShown(html,hero.src,hero.alt),'the CRM live check finds the approved img');
  assert.match(html,/<img src="\/blog\/images\/test-room-planning-0123456789ab\.png" alt="[^"]+" width="1920" height="1080"[^>]*fetchPriority="high"/i);
  assert.ok(html.indexOf('</h1>')<html.indexOf('<img')&&html.indexOf('<img')<html.indexOf('<h2>Room use</h2>'),'order: H1, hero, body');
  assert.ok(html.includes('aspect-video'),'framed 16:9');
  assert.ok(!/figcaption|Illustrat/i.test(html.replace('data-illustrative','')),'an illustrative hero has no public caption');
  assert.ok(html.includes('data-illustrative="true"'),'the classification stays internal');
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
});
test('built pages offer WebP variants; the original stays the img src',()=>{
  const html=renderToStaticMarkup(React.createElement(ArticleHero,{hero,responsive:true}));
  assert.match(html,/<source type="image\/webp" srcSet="\/blog\/images\/test-room-planning-0123456789ab-640\.webp 640w, \/blog\/images\/test-room-planning-0123456789ab-1024\.webp 1024w, \/blog\/images\/test-room-planning-0123456789ab-1536\.webp 1536w"/);
  assert.ok(heroShown(html,hero.src,hero.alt));
  assert.deepEqual(heroVariants({...hero,width:800}).map(v=>v.width),[640]);
  assert.deepEqual(heroVariants({...hero,width:600}),[]);
  const card=renderToStaticMarkup(React.createElement(ArticleHero,{hero,eager:false}));
  assert.ok(card.includes('loading="lazy"')&&!/fetchPriority/i.test(card));
});
test('articles without a hero render no image, exactly as before',()=>{
  const [post]=loadReleasedArticles([article],[]);
  assert.equal(post.heroImage,undefined);
  assert.ok(!('heroImage' in post));
  const html=renderToStaticMarkup(React.createElement(BlogSection,{article:post}));
  assert.ok(!/<img|<figure|<picture/.test(html));
  for(const legacy of BLOG_POSTS.filter(p=>!p.heroImage)) assert.ok(!/<img/.test(renderToStaticMarkup(React.createElement(BlogSection,{article:legacy}))));
});
test('a malformed hero fails the build instead of shipping',()=>{
  for(const bad of [
    {...hero,src:'https://cdn.example.com/x.png'},{...hero,src:'/images/x-0123456789ab.png'},{...hero,src:'/blog/images/x.png'},
    {...hero,src:'/blog/images/x-0123456789ab.gif'},{...hero,alt:' '},{...hero,width:0},{...hero,height:1.5},
    {...hero,illustrative:undefined},'/blog/images/x-0123456789ab.png',
  ]) assert.throws(()=>loadReleasedArticles([{...article,heroImage:bad}],[]),/hero/i,JSON.stringify(bad));
  assert.equal(loadReleasedArticles([{...article,heroImage:null}],[])[0].heroImage,undefined);
});
const tldr = 'Ask how the firm plans, prices and manages a project before you sign. Clear answers now prevent surprises later.';
// The CRM's visible-text reading (blog-publisher verifyLiveArticle): scripts and styles are not what a reader sees.
const visible = (html: string) => html.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<\/(?:p|h[1-6]|li|div|article)>/gi,' ').replace(/<[^>]*>/g,'')
  .replace(/&(?:amp|#38);/g,'&').replace(/&(?:quot|#34);/g,'"').replace(/&(?:apos|#39|#x27);/g,"'").replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
test('the TL;DR slot: one plain-text field, labelled once, after the H1 and before the hero and body',()=>{
  const [post]=loadReleasedArticles([{...article,tldr:'  '+tldr+' ',heroImage:hero}],[]);
  assert.equal(post.tldr,tldr);
  const html=renderToStaticMarkup(React.createElement(BlogSection,{article:post}));
  const text=visible(html), at=text.indexOf(tldr);
  assert.ok(at>=0&&text.indexOf(tldr,at+1)<0,'shown exactly once');
  assert.match(text.slice(Math.max(0,at-24),at),/TL;DR/,'labelled');
  assert.ok(text.indexOf(article.h1)<at&&at<text.indexOf('Room use'),'order: H1, TL;DR, body');
  assert.ok(html.search(/TL;DR/i)<html.indexOf('<img'),'TL;DR before the hero');
  assert.ok(heroShown(html,hero.src,hero.alt));
  assert.equal((html.match(/data-compass-tldr/g)||[]).length,1);
});
test('a TL;DR also renders without a hero; articles without one get no TL;DR block',()=>{
  const [withTldr]=loadReleasedArticles([{...article,tldr}],[]);
  const html=renderToStaticMarkup(React.createElement(BlogSection,{article:withTldr}));
  assert.ok(html.includes('data-compass-tldr')&&!/<img/.test(html));
  const [plain]=loadReleasedArticles([article],[]);
  assert.ok(!('tldr' in plain));
  assert.ok(!/TL;DR|data-compass-tldr/.test(renderToStaticMarkup(React.createElement(BlogSection,{article:plain}))));
  assert.ok(!('tldr' in loadReleasedArticles([{...article,tldr:null}],[])[0]));
});
test('a malformed or duplicated TL;DR fails the build',()=>{
  for(const bad of [' ',42,'Line one.\nLine two.','Use <b>bold</b>.','x'.repeat(601)]) {
    assert.throws(()=>loadReleasedArticles([{...article,tldr:bad}],[]),/TL;DR/,JSON.stringify(bad));
  }
  assert.throws(()=>loadReleasedArticles([{...article,tldr,bodyMarkdown:'**TL;DR:** '+tldr+'\n\n'+article.bodyMarkdown}],[]),/twice/);
});
