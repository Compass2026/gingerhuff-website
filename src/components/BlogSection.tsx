import { BLOG_POSTS } from '../content/articles';
import type { BlogPost } from '../types';
function ArticleBody({ content }: { content: string }) {
 return <div className="article-content">{content.split(/\n\s*\n/).map((paragraph,index)=>{
   const value=paragraph.trim();
   if (!value || value==='* * *' || value==='TLDR:') return null;
   if (/^#{1,3} /.test(value)) return <h2 key={index}>{value.replace(/^#{1,3} /,'')}</h2>;
   if (/^\s*\*/.test(value)) return <ul key={index}>{value.split('\n').map((item,i)=><li key={i}>{item.replace(/^\s*\*\s*/,'')}</li>)}</ul>;
   return <p key={index}>{value.replace(/^TLDR:\s*/,'')}</p>;
 })}</div>;
}
export default function BlogSection({article}: {article?: BlogPost}) {
 return <section id="blog-section" className="pt-32 pb-24 px-5 sm:px-8 bg-white min-h-screen"><div className="max-w-6xl mx-auto">
 {article ? <article className="max-w-3xl mx-auto"><a href="/blog/" className="text-brand-700 underline">← All articles</a><p className="mt-8 text-sm text-stone-600">{article.date} · {article.readTime}</p><h1 className="font-serif text-4xl sm:text-5xl my-6 text-stone-900">{article.title}</h1><ArticleBody content={article.content}/><a href="/contact/" className="inline-block mt-10 bg-brand-400 text-stone-900 rounded-full px-7 py-4 font-semibold">Plan your design consultation</a></article> : <><p className="eyebrow">Ideas for your home</p><h1 className="font-serif text-5xl my-5">The Design Journal</h1><p className="text-stone-600 max-w-2xl mb-12">Practical advice on creating a home that reflects your style and works for everyday life.</p><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{BLOG_POSTS.map(post=><article key={post.id} className="border border-stone-200 rounded-2xl p-7 flex flex-col"><p className="text-xs text-stone-600">{post.date} · {post.readTime}</p><h2 className="font-serif text-3xl my-5"><a href={`/${post.slug}/`}>{post.title}</a></h2><p className="text-stone-600 text-sm leading-relaxed mb-6">{post.excerpt}</p><a href={`/${post.slug}/`} className="mt-auto text-brand-700 font-semibold underline">Read article →</a></article>)}</div></>}
 </div></section>;
}
