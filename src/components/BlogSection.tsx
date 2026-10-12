import ReactMarkdown from 'react-markdown';
import { BLOG_POSTS } from '../content/articles';
import type { BlogPost } from '../types';
export function ArticleBody({ content }: { content: string }) {
 return <div className="article-content"><ReactMarkdown skipHtml components={{h1: ({children}) => <h2>{children}</h2>}}>{content}</ReactMarkdown></div>;
}
export default function BlogSection({article}: {article?: BlogPost}) {
 return <section id="blog-section" className="pt-32 pb-24 px-5 sm:px-8 bg-white min-h-screen"><div className="max-w-6xl mx-auto">
 {article ? <article className="max-w-3xl mx-auto" data-compass-release={article.compass?.release_hash}><a href="/blog/" className="text-brand-700 underline">← All articles</a><p className="mt-8 text-sm text-stone-600">{article.date} · {article.readTime}</p><h1 className="font-serif text-4xl sm:text-5xl my-6 text-stone-900">{article.h1 || article.title}</h1><ArticleBody content={article.content}/>{article.cta ? (article.cta.url ? <a href={article.cta.url} className="inline-block mt-10 bg-brand-400 text-stone-900 rounded-full px-7 py-4 font-semibold">{article.cta.text}</a> : <p className="mt-10 font-semibold">{article.cta.text}</p>) : <a href="/contact/" className="inline-block mt-10 bg-brand-400 text-stone-900 rounded-full px-7 py-4 font-semibold">Plan your design consultation</a>}</article> : <><p className="eyebrow">Ideas for your home</p><h1 className="font-serif text-5xl my-5">The Design Journal</h1><p className="text-stone-600 max-w-2xl mb-12">Practical advice on creating a home that reflects your style and works for everyday life.</p><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{BLOG_POSTS.map(post=><article key={post.id} className="border border-stone-200 rounded-2xl p-7 flex flex-col"><p className="text-xs text-stone-600">{post.date} · {post.readTime}</p><h2 className="font-serif text-3xl my-5"><a href={`/${post.slug}/`}>{post.title}</a></h2><p className="text-stone-600 text-sm leading-relaxed mb-6">{post.excerpt}</p><a href={`/${post.slug}/`} className="mt-auto text-brand-700 font-semibold underline">Read article →</a></article>)}</div></>}
 </div></section>;
}
