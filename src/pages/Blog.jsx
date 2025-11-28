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
      <div
        className="md:hidden flex flex-col text-center justify-center items-center bg-cover bg-center h-[200px] text-white "
        style={{
          backgroundImage: `url(${blogSmHero})`,
        }}
      >
        <h1 className="font-family-3 text-4xl">BLOG</h1>
        <div>
          <Link
            to="/"
            className="text-white text-xs font-light font-family-2 no-underline"
          >
            Home
          </Link>
          <span className="font-family-2 text-xs font-light"> /</span>
          <span className="font-family-2 text-xs font-semibold"> Blog</span>
        </div>
      </div>

      {/* large screen */}
      <div
        className="hidden md:flex flex-col text-center justify-center items-center  h-[350px] text-white"
        style={{
          backgroundImage: `url(${blogBigHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="font-family-3 md:text-5xl lg:text-6xl">BLOG</h1>
        <div className="mt-2">
          <Link
            to="/"
            className="text-white md:text-sm lg:text-base xl:text-lg font-light font-family-2 no-underline"
          >
            Home
          </Link>
          <span className="font-family-2 md:text-sm lg:text-base xl:text-lg font-light">
            {" "}
            /
          </span>
          <span className="font-family-2 md:text-sm lg:text-base xl:text-lg font-semibold">
            {" "}
            Blog
          </span>
        </div>
      </div>

      {/* Blog Grid - Large Screen */}
      <div className="hidden md:block px-6 lg:px-12 py-12 lg:py-16 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-10">
          {blogItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
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
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
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
                  {item.category}
                </motion.p>
                <h3 className="font-family-2 text-base lg:text-xl xl:text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#01497C] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="font-family-2 text-base lg:text-lg xl:text-xl text-gray-600 mb-5 line-clamp-3">
                  {item.text}
                </p>

                <div className="flex justify-between items-center text-gray-500">
                  <span className="flex items-center gap-2 font-family-2 text-sm lg:text-base xl:text-lg">
                    <FaRegCalendarDays className="text-[#01497C]" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-2 font-family-2 text-sm lg:text-base xl:text-lg">
                    <FaRegClock className="text-[#01497C]" />5 mins read
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Small Screen */}
      <div className="block md:hidden px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {blogItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                className="relative overflow-hidden aspect-[16/10]"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={item.image}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="p-3">
                <motion.h4
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="font-family-2 text-[#01497C] text-sm font-semibold mb-2"
                >
                  {item.category}
                </motion.h4>
                <h3 className="font-family-2 text-base font-bold mb-2 text-gray-900 line-clamp-2">
                  {item.title}
                </h3>
                <p className="font-family-2 text-xs text-gray-600 mb-4 line-clamp-3">
                  {item.text}
                </p>

                <div className="flex justify-between items-center mb-4 text-gray-500">
                  <span className="flex items-center gap-2 font-family-2 text-xs">
                    <FaRegCalendarDays className="text-[#01497C]" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-2 font-family-2 text-xs">
                    <FaRegClock className="text-[#01497C]" />5 mins read
                  </span>
                </div>

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
                    className="font-family-2 rounded-5 w-full text-white hover:bg-[#013A63] transition-colors"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
`}</style>