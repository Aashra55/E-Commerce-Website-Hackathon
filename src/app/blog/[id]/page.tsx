import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/app/utils/blogData";
import ShareButtons from "@/app/components/ShareButton";
import { FiArrowLeft, FiCalendar, FiClock, FiUser, FiChevronRight } from "react-icons/fi";

export const generateStaticParams = async () => {
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
};

const BlogDetail = ({ params }: { params: { id: string } }) => {
  const post = posts.find((p) => p.id === Number(params.id));

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-[#fafbfc] min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-orange-600 transition">
            Home
          </Link>
          <FiChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/blog" className="hover:text-orange-600 transition">
            Blog
          </Link>
          <FiChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900 truncate max-w-xs">
            {post.title}
          </span>
        </nav>

        {/* Article Container */}
        <article className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs">
          
          {/* Header Info */}
          <div className="p-6 sm:p-10 pb-6 border-b border-slate-100 space-y-4">
            <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Fashion Journal
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <FiUser className="w-4 h-4 text-orange-600" />
                Editorial Staff
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FiCalendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3.5 h-3.5" />
                5 min read
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="prose max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 whitespace-pre-line font-light">
              {post.content}
            </div>

            {/* Social Share Strip */}
            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-orange-600 transition"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to All Articles</span>
              </Link>

              <ShareButtons
                url={typeof window !== "undefined" ? window.location.href : ""}
                message={`Read: ${post.title}`}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
