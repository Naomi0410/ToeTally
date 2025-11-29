import { Image } from "react-bootstrap";
import { blogBigHero, blogSmHero } from "../assets";
import { ActionButton, Subscribe } from "../components";
import { blogItems } from "../utils";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Blog = () => {
  return (
    <>
      {/* Small Screen Hero */}
      <section
        className="md:hidden flex flex-col text-center justify-center items-center bg-cover bg-center h-[200px] text-white "
        style={{
          backgroundImage: `url(${blogSmHero})`,
        }}
        role="banner"
        aria-labelledby="blog-heading-mobile"
      >
        <h1 id="blog-heading-mobile" className="font-family-3 text-4xl">
          BLOG
        </h1>
        <nav aria-label="Breadcrumb">
          <Link
            to="/"
            aria-label="Go to home page"
            className="text-white text-xs font-light font-family-2 no-underline"
          >
            Home
          </Link>
          <span aria-hidden="true" className="font-family-2 text-xs font-light">
            {" "}
            /
          </span>
          <span
            aria-current="page"
            className="font-family-2 text-xs font-semibold"
          >
            {" "}
            Blog
          </span>
        </nav>
      </section>

      {/* large screen */}
      <section
        className="hidden md:flex flex-col text-center justify-center items-center  h-[350px] text-white"
        style={{
          backgroundImage: `url(${blogBigHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="banner"
        aria-labelledby="blog-heading-desktop"
      >
        <h1
          id="blog-heading-desktop"
          className="font-family-3 md:text-5xl lg:text-6xl"
        >
          BLOG
        </h1>
        <nav aria-label="Breadcrumb" className="mt-2">
          <Link
            to="/"
            aria-label="Go to home page"
            className="text-white md:text-sm lg:text-base xl:text-lg font-light font-family-2 no-underline"
          >
            Home
          </Link>
          <span
            aria-hidden="true"
            className="font-family-2 md:text-sm lg:text-base xl:text-lg font-light"
          >
            {" "}
            /
          </span>
          <span
            aria-current="page"
            className="font-family-2 md:text-sm lg:text-base xl:text-lg font-semibold"
          >
            {" "}
            Blog
          </span>
        </nav>
      </section>

      {/* Blog Grid - Large Screen */}
      <section
        aria-labelledby="blog-posts-heading"
        className="hidden md:block px-6 lg:px-12 py-12 lg:py-16 max-w-[1600px] mx-auto"
      >
        <h2 id="blog-posts-heading" className="visually-hidden">
          Blog Posts
        </h2>
        <div
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-10"
        >
          {blogItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              role="listitem"
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
            >
              <motion.div
                className="relative overflow-hidden aspect-[16/10]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={item.image}
                  className="w-full h-full object-cover"
                  alt={`Featured image for ${item.title}`}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                ></motion.div>
              </motion.div>

              <div className="p-4">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="font-family-2 text-[#01497C] text-base lg:text-lg xl:text-xl font-semibold mb-2"
                >
                  <span className="visually-hidden">Category: </span>
                  {item.category}
                </motion.p>
                <h3 className="font-family-2 text-base lg:text-xl xl:text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#01497C] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="font-family-2 text-base lg:text-lg xl:text-xl text-gray-600 mb-5 line-clamp-3">
                  {item.text}
                </p>

                <footer className="flex justify-between items-center text-gray-500">
                  <time
                    dateTime={item.date}
                    className="flex items-center gap-2 font-family-2 text-sm lg:text-base xl:text-lg"
                  >
                    <FaRegCalendarDays
                      aria-hidden="true"
                      className="text-[#01497C]"
                    />
                    <span className="visually-hidden">Published on </span>
                    {item.date}
                  </time>
                  <span
                    className="flex items-center gap-2 font-family-2 text-sm lg:text-base xl:text-lg"
                    aria-label="Reading time: 5 minutes"
                  >
                    <FaRegClock className="text-[#01497C]" aria-hidden="true" />
                    5 mins read
                  </span>
                </footer>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Small Screen */}
      <section
        className="block md:hidden px-4 py-8"
        aria-labelledby="blog-posts-heading-mobile"
      >
        <h2 id="blog-posts-heading-mobile" className="visually-hidden">
          Blog Posts
        </h2>
        <div className="grid grid-cols-1 gap-8" role="list">
          {blogItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              role="listitem"
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                className="relative overflow-hidden aspect-[16/10]"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={item.image}
                  alt={`Featured image for ${item.title}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="p-3">
                <motion.p
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="font-family-2 text-[#01497C] text-sm font-semibold mb-2"
                >
                  <span className="visually-hidden">Category: </span>
                  {item.category}
                </motion.p>
                <h3 className="font-family-2 text-base font-bold mb-2 text-gray-900 line-clamp-2">
                  {item.title}
                </h3>
                <p className="font-family-2 text-xs text-gray-600 mb-4 line-clamp-3">
                  {item.text}
                </p>

                <footer className="flex justify-between items-center mb-4 text-gray-500">
                  <time
                    className="flex items-center gap-2 font-family-2 text-xs"
                    dateTime={item.date}
                  >
                    <FaRegCalendarDays
                      aria-hidden="true"
                      className="text-[#01497C]"
                    />
                    <span className="visually-hidden">Published on </span>
                    {item.date}
                  </time>
                  <span
                    aria-label="Reading time: 5 minutes"
                    className="flex items-center gap-2 font-family-2 text-xs"
                  >
                    <FaRegClock aria-hidden="true" className="text-[#01497C]" />
                    5 mins read
                  </span>
                </footer>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ActionButton
                    variant="none"
                    size="sm"
                    text="Read More"
                    style={{
                      backgroundColor: "#01497C",
                      fontFamily: "Alexandria variable",
                    }}
                    aria-label={`Read more about ${item.title}`}
                    className="font-family-2 rounded-5 w-full text-white hover:bg-[#013A63] transition-colors"
                  />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <Subscribe />
    </>
  );
};
export default Blog;

<style jsx>{`
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`}</style>;
