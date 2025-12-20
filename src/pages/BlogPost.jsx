import { useParams, Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { blogItems } from "../utils";
import { FaRegCalendarDays, FaRegClock, FaArrowLeft } from "react-icons/fa6";
import { Subscribe } from "../components";
import { motion } from "framer-motion";
import { useEffect } from "react";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogItems.find((p) => p.slug === slug);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-family-3 text-4xl md:text-5xl mb-4 text-gray-900">
            Blog Post Not Found
          </h1>
          <p className="font-family-2 text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the blog post you're looking for.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#01497C] text-white px-6 py-3 rounded-lg hover:bg-[#013A63] transition-colors font-family-2"
          >
            <FaArrowLeft />
            Back to Blog
          </Link>
        </motion.div>
      </div>
    );
  }

  // Get related posts (excluding current post)
  const relatedPosts = blogItems
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  // If not enough posts in same category, fill with other posts
  if (relatedPosts.length < 2) {
    const additionalPosts = blogItems
      .filter((p) => p.id !== post.id && !relatedPosts.includes(p))
      .slice(0, 2 - relatedPosts.length);
    relatedPosts.push(...additionalPosts);
  }

  return (
    <>
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12 pt-8"
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#01497C] hover:text-[#013A63] transition-colors font-family-2 text-sm md:text-base"
        >
          <FaArrowLeft />
          Back to Blog
        </Link>
      </motion.div>

      {/* Article Container */}
      <article className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-12">
        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full mb-8 md:mb-12"
        >
          <Image
            src={post.image}
            alt={post.title}
            className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl md:rounded-3xl shadow-lg"
          />
        </motion.div>

        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <span className="inline-block bg-[#01497C] text-white px-4 py-1 rounded-full text-xs md:text-sm font-semibold font-family-2 mb-4">
            {post.category}
          </span>

          <h1 className="font-family-3 text-3xl md:text-4xl lg:text-5xl  mb-4 md:mb-6 text-gray-900">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 md:gap-6 text-gray-600">
            <time
              dateTime={post.date}
              className="flex items-center gap-2 font-family-2 text-sm md:text-base"
            >
              <FaRegCalendarDays className="text-[#01497C]" />
              {post.date}
            </time>
            <span className="flex items-center gap-2 font-family-2 text-sm md:text-base">
              <FaRegClock className="text-[#01497C]" />
              {post.readTime}
            </span>
          </div>
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-sm md:prose-base lg:prose-lg max-w-none mb-12 md:mb-16"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 pt-8 border-t border-gray-200"
          >
            <h3 className="font-family-3 text-2xl md:text-3xl mb-6 md:mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 md:p-5">
                      <span className="text-[#01497C] text-xs md:text-sm font-semibold font-family-2">
                        {relatedPost.category}
                      </span>
                      <h4 className="font-family-2 text-base md:text-lg lg:text-xl font-bold mt-2 mb-2 text-gray-900 group-hover:text-[#01497C] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="font-family-2 text-sm md:text-base text-gray-600 line-clamp-2">
                        {relatedPost.text}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </article>

      {/* Subscribe Section */}
      <Subscribe />

      <style jsx>{`
        .prose h2 {
          font-family: "Alexandria variable", sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }

        .prose h3 {
          font-family: "Alexandria variable", sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #1a1a1a;
        }

        .prose h4 {
          font-family: "Alexandria variable", sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
        }

        .prose p {
          font-family: "Alexandria variable", sans-serif;
          margin-bottom: 1.25rem;
          line-height: 1.8;
          color: #4a5568;
        }

        .prose ul,
        .prose ol {
          font-family: "Alexandria variable", sans-serif;
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
          color: #4a5568;
        }

        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
        }

        .prose strong {
          font-weight: 600;
          color: #2d3748;
        }

        .prose blockquote {
          border-left: 4px solid #01497c;
          padding-left: 1rem;
          font-style: italic;
          margin: 1.5rem 0;
          color: #4a5568;
        }

        .prose img {
          width: 100%;
          border-radius: 1rem;
          margin: 1.5rem 0;
        }

        .prose a {
          color: #01497c;
          text-decoration: none;
          font-weight: 500;
        }

        .prose a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .prose h2 {
            font-size: 1.5rem;
          }

          .prose h3 {
            font-size: 1.25rem;
          }

          .prose h4 {
            font-size: 1.125rem;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default BlogPost;