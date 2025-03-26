import { Image } from "react-bootstrap";

import {
  nike,
  fila,
  reebok,
  ballenciaga,
  champion,
  vans,
  newBalance,
  gap,
  adidas,
} from "../assets";

const brandLogos = [
  { src: nike, size: "lg:w-28 md:w-14 w-8" },
  { src: fila, size: "lg:w-28 md:w-14 w-8" },
  { src: reebok, size: "lg:w-28 md:w-14 w-8" },
  { src: ballenciaga, size: "lg:w-40 md:w-32 w-14" },
  { src: champion, size: "lg:w-40 md:w-32 w-14" },
  { src: vans, size: "lg:w-28 md:w-14 w-8" },
  { src: newBalance, size: "lg:w-28 md:w-14 w-8" },
  { src: gap, size: "lg:w-28 md:w-14 w-8" },
  { src: adidas, size: "lg:w-28 md:w-14 w-8" },
];

// Duplicate the array for seamless looping
const duplicatedLogos = [...brandLogos, ...brandLogos, ...brandLogos];

const BrandCarousel = () => {
  return (
    <div className="bg-customGray p-2 overflow-hidden">
      <div className="flex items-center gap-6 animate-moveLeft">
        {duplicatedLogos.map((logo, index) => (
          <Image key={index} src={logo.src} className={logo.size} />
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;