import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      role="banner"
      aria-labelledby="contact-hero-heading"
      className="bg-[url('/conbgdes.svg')] bg-cover bg-center h-[200px] md:h-[350px] text-[#FFFFFF] text-center flex justify-center items-center px-3"
    >
      <div className="flex flex-col justify-center lg:gap-3 font-family-2">
        <h1
          id="contact-hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-family-3"
        >
          CONTACT US
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="font-family-2 text-xs md:text-sm lg:text-base xl:text-lg font-semibold"
        >
          <Link
            to="/"
            aria-label="Go to home page"
            className="no-underline text-white font-family-2 text-xs md:text-sm lg:text-base xl:text-lg font-light"
          >
            Home /
          </Link>{" "}
          Contact Us
        </nav>
      </div>
    </section>
  );
};

export default Hero;
