import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import BlogSection from '../src/components/BlogSection.tsx';
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
