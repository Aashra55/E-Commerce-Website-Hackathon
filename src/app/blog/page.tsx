import Link from "next/link";
import { posts } from "../utils/blogData";
import Image from "next/image";
import { FiClock, FiCalendar, FiArrowRight } from "react-icons/fi";

const BlogPage = () => {
  return (
    <div className="bg-[#fafbfc] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-1">
            Fashion & Lifestyle Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Stories, Trends & Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Explore our curated guides on style curation, sustainable craftsmanship, and wardrobe essentials.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  Editorial
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-3.5 h-3.5" />
                      4 min read
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition"
                  >
                    <span>Read Article</span>
                    <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
