import { Image } from "react-bootstrap";
import {
  ActionButton,
  BrandCarousel,
  Discount,
  NewArrival,
  OfferForYou,
  StyleInspirations,
  Subscribe,
  Trending,
} from "../components";
import { discountBg, gif, heroImg } from "../assets";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const imageContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const element = imageContainerRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          element.classList.add("animate-moveLeft");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="py-4">
      <div className="md:flex justify-center items-center">
        {/* Large/Medium Screen Hero */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:flex hidden lg:gap-3 flex-column md:px-3 lg:px-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-family-3 text-customVeryDarkBlue text-5xl/[4rem] lg:text-[55px]/[4rem] xl:text-[68px]/[5rem]"
          >
            Step into Comfort. Walk with Confidence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-family-2 text-customLightGray text-base lg:text-xl xl:text-2xl"
          >
            Explore footwear crafted for style, durability, and unmatched
            comfort. Designed to elevate every step you take
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ActionButton
              variant="none"
              size="lg"
              text="Shop Now"
              onClick={() => navigate("/shop")}
              style={{
                backgroundColor: "#01497C",
                fontFamily: "Alexandria variable",
                color: "white",
              }}
              hoverStyle={{
                backgroundColor: "white",
                color: "#01497C",
                border: "1px solid #01497C",
              }}
              className="font-family-2 rounded-2 d-md-none d-lg-block lg:w-40 xl:w-48 md:py-1 lg:py-2 "
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ActionButton
              variant="none"
              size="md"
              text="Shop Now"
              onClick={() => navigate("/shop")}
              style={{
                backgroundColor: "#01497C",
                fontFamily: "Alexandria variable",
                color: "white",
              }}
              hoverStyle={{
                backgroundColor: "white",
                color: "#01497C",
                border: "1px solid #01497C",
              }}
              className="font-family-2 rounded-2 md:w-32 py-1 d-md-block d-lg-none"
            />
          </motion.div>
        </motion.div>

        <Image
          src={heroImg}
          className="hidden md:block md:w-2/5 lg:w-2/5 xl:w-4/5 "
        />

        {/* Small Screen Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="d-flex flex-column text-center align-items-center p-3 d-md-none d-block"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-family-3 text-customVeryDarkBlue text-4xl/[3rem]"
          >
            Step into Comfort. Walk with Confidence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-family-2 text-customLightGray text-base/[20px]"
          >
            Explore footwear crafted for style, durability, and unmatched
            comfort. Designed to elevate every step you take
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ActionButton
              variant="none"
              size="md"
              text="Shop Now"
              onClick={() => navigate("/shop")}
              style={{
                backgroundColor: "#01497C",
                fontFamily: "Alexandria variable",
                color: "white",
              }}
              hoverStyle={{
                backgroundColor: "white",
                color: "#01497C",
                border: "1px solid #01497C",
              }}
              className="font-family-2 rounded-2 w-32 p-2"
            />
          </motion.div>
        </motion.div>

        <Image src={heroImg} className="d-block d-md-none w-100" />
      </div>
      <BrandCarousel />

      <Trending />

      <div className="hidden md:flex justify-center items-center gap-4 mt-14 md:px-3 lg:px-12">
        <div className="md:w-3/5 xl:w-2/5">
          <img src={gif} className="w-full" alt="Product" />
        </div>
        <div className="flex flex-column gap-2 text-center items-center justify-between w-3/5">
          <Image src={discountBg} />
          <h1 className="font-family-4 text-2xl lg:text-4xl xl:text-5xl">
            EXPERIENCE THE “HIGH” CONIC DUNK
          </h1>
          <h1 className="font-family-2 fw-bold text-3xl lg:text-[40px] xl:text-5xl">
            ICONIC FOR A REASON
          </h1>
          <p className="font-family-2 fw-medium text-xl lg:text-2xl">
            Timeless Style, Unmatched Legacy
          </p>
          <ActionButton
            variant="none"
            size="lg"
            text="Shop Dunk Now"
            style={{
              backgroundColor: "#01497C",
              fontFamily: "Alexandria variable",
              color: "white",
            }}
            hoverStyle={{
              backgroundColor: "white",
              color: "#01497C",
              border: "1px solid #01497C",
            }}
            className="font-family-2 rounded-2 w-58 d-lg-block d-md-none"
          />
          <ActionButton
            variant="none"
            size="md"
            text="Shop Dunk Now"
            style={{
              backgroundColor: "#01497C",
              fontFamily: "Alexandria variable",
              color: "white",
            }}
            hoverStyle={{
              backgroundColor: "white",
              color: "#01497C",
              border: "1px solid #01497C",
            }}
            className="font-family-2 rounded-2 w-58 d-md-block d-lg-none"
          />
        </div>
      </div>

      <NewArrival />

      {/* gif small screen */}
      <div className="d-md-none d-block relative mt-12">
        <img src={gif} className="w-full" alt="Product" />
        <div className="d-flex flex-column align-items-center justify-content-center absolute top-0 left-1/2 -translate-x-1/2 text-center w-100 px-3">
          <Image src={discountBg} className="w-64" />
          <h1 className="font-family-4 text-xl">
            EXPERIENCE THE “HIGH” CONIC DUNK
          </h1>
          <h1 className="font-family-2 fw-bold text-2xl">
            ICONIC FOR A REASON
          </h1>
          <p className="font-family-2 fw-medium text-base">
            Timeless Style, Unmatched Legacy
          </p>
          <ActionButton
            variant="none"
            size="sm"
            text="Shop Dunk Now"
            style={{
              backgroundColor: "#01497C",
              fontFamily: "Alexandria variable",
              color: "white",
            }}
            hoverStyle={{
              backgroundColor: "white",
              color: "#01497C",
              border: "1px solid #01497C",
            }}
            className="font-family-2 rounded-2 w-36 py-2"
          />
        </div>
      </div>

      <Discount />
      <StyleInspirations />
      <OfferForYou />
      <Subscribe />
    </div>
  );
};

export default Home;
