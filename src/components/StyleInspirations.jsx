import { useState } from "react";
import { Image } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { styleInspirations } from "../utils";
import { inspiration4B } from "../assets";

const StyleInspirations = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const itemVariants = {
    default: {
      width: "25%",
      transition: {
        duration: 0.4,
        ease: [0.13, 0.23, 0.33, 0.43],
      },
    },
    hovered: {
      width: "30.5%",
      transition: {
        duration: 0.4,
        ease: [0.13, 0.23, 0.33, 0.43],
      },
    },
    shrink: {
      width: "19.5%",
      transition: {
        duration: 0.4,
        ease: [0.13, 0.23, 0.33, 0.43],
      },
    },
  };

  const imageVariants = {
    default: {
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hovered: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: {
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const getItemVariant = (index, itemId) => {
    if (hoveredItem === itemId) return "hovered";
    if (hoveredItem !== null) {
      const lastIndex = styleInspirations.length - 1;
      const secondLastIndex = styleInspirations.length - 2;
      
      if (index === lastIndex) return "shrink";
      if (index === secondLastIndex && hoveredItem === lastIndex + 1) return "shrink";
    }
    return "default";
  };

  return (
    <>
      <div className="d-md-block d-none">
        <h1 className="font-family-3 text-center text-black md:text-3xl lg:text-4xl xl:text-5xl md:mt-14 lg:mt-20">
          STYLE INSPIRATIONS
        </h1>
        <div
          style={{ display: "flex", width: "100%" }}
          className="lg:mt-8 md:mt-4"
        >
          {styleInspirations.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              initial="default"
              animate={getItemVariant(index, item.id)}
              style={{
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <motion.div
                variants={imageVariants}
                initial="default"
                animate={hoveredItem === item.id ? "hovered" : "default"}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={hoveredItem === item.id ? "hover" : "default"}
                    src={hoveredItem === item.id ? item.hoverImage : item.image}
                    alt=""
                    transition={{ duration: 0.3 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </AnimatePresence>
              </motion.div>

              <AnimatePresence>
                {hoveredItem === item.id && (
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{
                      position: "absolute",
                      top: "60%",
                      left: "5%",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <motion.h2
                      className="font-family-4 md:text-2xl lg:text-4xl"
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      {item.hoverHeader}
                    </motion.h2>
                    <motion.p
                      className="font-family-2 md:text-xl lg:text-2xl"
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {item.hoverText}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* small screen */}
      <div className="d-block d-md-none relative">
        <Image src={inspiration4B} className="h-100 w-100" />
        <div className="absolute z-10 bottom-40 mx-3 text-white">
          <h2 className="font-family-4 text-4xl">Confidential Walk</h2>
          <p className="font-family-2 text-2xl">
            Feel free to walk "off the wall"
          </p>
        </div>
      </div>
    </>
  );
};

export default StyleInspirations;