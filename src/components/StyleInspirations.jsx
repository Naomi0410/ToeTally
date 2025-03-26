import { useState } from "react";
import { Image } from "react-bootstrap";
import { styleInspirations } from "../utils";
import { inspiration4B } from "../assets";

const StyleInspirations = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const gridStyle = {
    display: "flex",
    width: "100%",
  };

  const itemStyle = {
    position: "relative",
    overflow: "hidden",
    transition: "all 0.6s ease",
    width: "25%",
  };

  const hoveredItemStyle = {
    ...itemStyle,
    width: "31.5%",
  };

  const shrinkItemStyle = {
    ...itemStyle,
    width: "19.5%",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  };

  const hoverContentStyle = {
    position: "absolute",
    top: "60%",
    left: "5%",
    color: "white",
    display: "flex",
    flexDirection: "column",
    opacity: "0",
    transition: "opacity 0.6s ease",
  };

  const hoverContentVisibleStyle = {
    ...hoverContentStyle,
    opacity: "1",
  };

  return (
    <>
      <div className="d-md-block d-none">
        <h1 className="font-family-3 text-center text-black lg:text-5xl md:text-4xl lg:mt-24 md:mt-14">
          STYLE INSPIRATIONS
        </h1>
        <div style={gridStyle} className="lg:mt-8 md:mt-4">
          {styleInspirations.map((item, index) => (
            <div
              key={item.id}
              style={
                hoveredItem === item.id
                  ? hoveredItemStyle
                  : hoveredItem !== null &&
                    index === styleInspirations.length - 1
                  ? shrinkItemStyle
                  : hoveredItem !== null &&
                    index === styleInspirations.length - 2 &&
                    hoveredItem === styleInspirations.length - 1
                  ? shrinkItemStyle
                  : itemStyle
              }
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Image
                src={hoveredItem === item.id ? item.hoverImage : item.image}
                alt=""
                style={{
                  ...imageStyle,
                  transform:
                    hoveredItem === item.id ? "scale(1.1)" : "scale(1)",
                }}
              />
              {hoveredItem === item.id && (
                <div style={hoverContentVisibleStyle}>
                  <h2 className="font-family-4 md:text-2xl lg:text-4xl">{item.hoverHeader}</h2>
                  <p className="font-family-2 md:text-xl lg:text-2xl">{item.hoverText}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* small screen */}
      <div className="d-block d-md-none relative">
        <Image src={inspiration4B} className="h-100 w-100 "/>
        <div className="absolute z-10 bottom-40 mx-3 text-white">
         <h2 className="font-family-4 text-4xl">Confidential Walk</h2>
         <p className="font-family-2 text-2xl">Feel free to walk “off the wall”</p>
        </div>
      </div>
    </>
  );
};

export default StyleInspirations;
