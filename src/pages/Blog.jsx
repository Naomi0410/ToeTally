import { Image } from "react-bootstrap";
import { blogBigHero, blogSmHero } from "../assets";
import { ActionButton, Subscribe } from "../components";
import { blogItems } from "../utils";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <>
      <div
        className="md:hidden block bg-cover bg-center text-center text-white py-20 px-4 "
        style={{
          backgroundImage: `url(${blogSmHero})`,
        }}
      >
        <h1 className="font-family-3  text-4xl">BLOG</h1>
        <div>
          <Link
            to="/"
            className="text-white text-sm font-family-2 no-underline"
          >
            Home
          </Link>
          <span className="font-family-2 text-sm"> /</span>
          <span className="font-family-2 text-sm"> Blog</span>
        </div>
      </div>

      {/* large screen */}
      <div
        className="hidden md:block p-24 text-center text-white"
        style={{
          backgroundImage: `url(${blogBigHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="font-family-3 text-[80px]">BLOG</h1>
        <div className="mt-2">
          <Link
            to="/"
            className="text-white text-xl font-family-2 no-underline"
          >
            Home
          </Link>
          <span className="font-family-2 text-xl"> /</span>
          <span className="font-family-2 text-xl"> Blog</span>
        </div>
      </div>
      <div className="lg:px-16 mt-16 mb-12 md:px-3 hidden md:block">
        <div className="d-grid grid-cols-1 md:grid-cols-2 justify-content-between lg:gap-16 md:gap-8 mt-4">
          {blogItems.map((item) => (
            <div key={item.id}>
              <Image src={item.image} className="mx-auto w-100 rounded-3" />
              <div className="py-3 pr-3">
                <p className="font-family-2 text-[#01497C] xl:text-2xl lg:text-xl md:text-lg font-medium">
                  {item.category}
                </p>
                <h3 className="font-family-2 xl:text-2xl lg:text-xl md:text-lg font-medium">
                  {item.title}
                </h3>
                <p className="font-family-2 xl:text-xl lg:text-lg md:text-base">
                  {item.text}
                </p>
                <div className="d-flex justify-content-between">
                  <span className="d-flex align-items-center gap-2 font-family-2 xl:text-xl  lg:text-base md:text-sm">
                    <FaRegCalendarDays />
                    {item.date}
                  </span>
                  <span className="d-flex align-items-center gap-2 font-family-2 xl:text-xl lg:text-base md:text-sm">
                    <FaRegClock />5 mins read
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*small screen*/}
      <div className="px-3 mt-8 mb-8 block md:hidden">
        <div className="d-grid grid-cols-1 gap-10 mt-4">
          {blogItems.map((item) => (
            <div
              key={item.id}
            >
              <Image src={item.image} className="mx-auto blogImg rounded-3" />
                <h4 className="font-family-2 text-[#01497C] text-lg font-medium">
                  {item.category}
                </h4>
                <h3 className="font-family-2 text-base font-medium">
                  {item.title}
                </h3>
                <p className="font-family-2 text-sm">{item.text}</p>
                <div className="d-flex justify-content-between">
                  <span className="d-flex align-items-center gap-2 font-family-2 text-xs">
                    <FaRegCalendarDays />
                    {item.date}
                  </span>
                  <span className="d-flex align-items-center gap-2 font-family-2 text-xs">
                    <FaRegClock />5 mins read
                  </span>
                </div>
                <ActionButton
                  variant="none"
                  size="sm"
                  text="Read More"
                  style={{
                    backgroundColor: "#01497C",
                    fontFamily: "Alexandria variable",
                  }}
                  className="font-family-2 rounded-5 mt-2 text-white"
                />       
            </div>
          ))}
        </div>
      </div>

      <Subscribe />
    </>
  );
};

export default Blog;
