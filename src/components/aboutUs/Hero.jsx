import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="bg-[url('/hero-bg.svg')] text-white bg-cover bg-center flex items-center justify-center h-[200px] md:h-[350px] mx-auto w-full">
        <div className="flex flex-col gap-2 justify-center items-center container">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-family-3">
            About Us
          </h1>
          <p className="font-family-2 text-xs md:text-sm lg:text-base xl:text-lg font-semibold">
            <Link
              to="/"
              className="no-underline text-white font-family-2 text-xs md:text-sm lg:text-base xl:text-lg font-light"
            >
              Home /
            </Link>{" "}
            About Us
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 justify-center items-center md:px-6 lg:px-12">
        <div className="py-5 hidden md:block lg:w-5/6 mx-auto">
          <h1 className="font-medium font-family-3 mx-auto md:text-3xl lg:text-4xl xl:text-5xl">
            Who We Are
          </h1>
          <p className="font-family-2 mt-3 md:text-sm lg:text-sm xl:text-base">
            {" "}
            Welcome to <span className="text-[#01497C]">Toetally</span>, where
            comfort meets style! We are a team that brings the seamless blend
            from diverse brands of everything footwear to you on one platform.
            We know that shoes are more than just an accessory, they’re a
            statement of who you are, that is why we’ve made it our priority to
            offer footwears. From everyday wear to special events, we strive to
            provide a variety of options that cater to your unique needs.
          </p>
        </div>

        {/* text for small screens */}
        <div className="md:hidden px-3 text-center my-4 mx-auto">
          <h1 className="font-medium font-family-3 mx-auto text-2xl">
            Who We Are
          </h1>
          <p className="font-family-2 mt-2 text-xs">
            {" "}
            Welcome to <span className="text-[#01497C]">Toetally</span>, where
            comfort meets style! We are a team that brings the seamless blend
            from diverse brands of everything footwear to you on one platform.
          </p>
          <p className="font-family-2 mt-2 text-xs">
            {" "}
            We know that shoes are more than just an accessory, they’re a
            statement of who you are, that is why we’ve made it our priority to
            offer footwears. From everyday wear to special events, we strive to
            provide a variety of options that cater to your unique needs.
          </p>
        </div>

        <div className="md:py-2 lg:py-12 px-3 lg:w-11/12 mx-auto">
          <img
            src="/whoweare.svg"
            className="w-full rounded-lg"
            alt="who we are image"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
