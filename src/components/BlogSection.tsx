import { useState } from 'react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import { BookOpen, Calendar, Clock, ArrowRight, X, Sparkles } from 'lucide-react';

export default function BlogSection() {
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog-section" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-500 uppercase tracking-[0.25em] text-xs font-semibold font-mono">
            Insight & Lore
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 font-light tracking-tight mt-2 mb-6">
            The Design <span className="italic font-normal text-brand-500">Journal</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Written columns from three generations of design heritage, exploring custom architecture, color strategies, and luxury remodeling secrets.
          </p>
          <div className="w-24 h-[1px] bg-brand-500/50 mx-auto mt-6"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              id={`blog-card-${post.id}`}
              className="glass rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xl border border-stone-100"
            >
              <div>
                {/* Thumbnail */}
                <div className="aspect-16/10 overflow-hidden relative border-b border-stone-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover filter brightness-[0.85] transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 glass px-3 py-1 rounded-lg text-[9px] uppercase tracking-widest text-brand-500 font-bold">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  {/* Metadata Row */}
                  <div className="flex items-center gap-4 text-xs text-stone-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-brand-500" /> {post.readTime}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-stone-900 group-hover:text-brand-500 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 pt-0">
                <button
                  id={`read-blog-btn-${post.id}`}
                  onClick={() => setReadingPost(post)}
                  className="w-full justify-between glass-accent bg-brand-500/5 group/btn hover:bg-brand-500 hover:text-black py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest text-brand-500 transition-all cursor-pointer flex items-center px-5"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 text-brand-500 group-hover/btn:translate-x-1 group-hover/btn:text-black transition-all" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reading Overlay Drawer / Pop-up */}
      {readingPost && (
        <div
          id="blog-modal-overlay"
          className="fixed inset-0 bg-black/85 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setReadingPost(null)}
        >
          <div
            className="glass rounded-[32px] max-w-3xl w-full border border-stone-100 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Toggle */}
            <button
              id="blog-modal-close"
              onClick={() => setReadingPost(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black p-2.5 rounded-full border border-stone-100 text-stone-700 hover:text-stone-900 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Image */}
            <div className="h-[200px] sm:h-[280px] relative">
              <img
                src={readingPost.image}
                alt={readingPost.title}
                className="w-full h-full object-cover filter brightness-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 sm:left-10 text-left">
                <span className="glass px-3 py-1 rounded-lg text-[9px] uppercase tracking-widest text-brand-500 font-bold">
                  {readingPost.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 font-light tracking-wide mt-3">
                  {readingPost.title}
                </h3>
              </div>
            </div>

            {/* Body column */}
            <div className="p-6 sm:p-10 bg-black/65 space-y-6">
              <div className="flex items-center gap-6 text-xs text-stone-400 font-mono border-b border-stone-100 pb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-500" /> Published: {readingPost.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-500" /> Read duration: {readingPost.readTime}
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-brand-500/80">
                  <BookOpen className="w-4 h-4" /> Three Generations Lore
                </span>
              </div>

              {/* Rich contents */}
              <div className="space-y-4 text-stone-800 text-sm sm:text-base font-light leading-relaxed font-sans max-h-[300px] overflow-y-auto pr-2">
                <p className="font-serif text-lg italic text-[#dccbaf] mb-4">
                  {readingPost.excerpt}
                </p>
                <p className="whitespace-pre-line">
                  {readingPost.content}
                </p>
                <div className="glass-accent p-5 rounded-2xl border-brand-500/20 flex gap-3 text-xs tracking-wide">
                  <Sparkles className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <p className="text-stone-500">
                    <strong>Note:</strong> Custom remodeling projects inside Clayton / Edwardsville require tailored consulting. Book your private presentation inside our Inquire page.
                  </p>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="pt-6 border-t border-stone-100 flex justify-end">
                <button
                  id="blog-modal-done"
                  onClick={() => setReadingPost(null)}
                  className="bg-brand-500 text-black px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-brand-500 cursor-pointer transition-all"
                >
                  Finished Column
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
