import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="bg-[url('/hero-bg.svg')] text-white bg-cover bg-center flex items-center justify-center h-[200px] md:h-[350px] mx-auto w-full">
        <div className="flex flex-col gap-2 justify-center items-center container">
          <h1 className="text-[30px] lg:text-[80px] font-family-3">About Us</h1>
          <p className="font-family-2 text-xs lg:text-xl">
            <Link to="/" className="no-underline text-white font-family-2 text-xs lg:text-xl">Home</Link> / About Us
          </p>
        </div>
      </div>

      <div className="">
        <div className="grid md:grid-cols-2  items-center md:px-6">
          <div className=" px-3 md:px-0  lg:w-11/12 mx-auto text-mob">
            <h1 className="font-medium  font-family-3 mt-8 mx-auto hwho">
              Who We Are
            </h1>

            <p className="font-family-2 mt-4  ">
              {" "}
              Welcome to <span className="text-[#01497C]">Toetally</span>, where
              comfort meets style! We are a team that brings the seamless blend
              from diverse brands of everything footwear to you on one platform.
              We know that shoes are more than just an accessory, they’re a
              statement of who you are, that is why we’ve made it our priority
              to offer footwears.
            </p>
          </div>

          <div className="md:py-2 lg:py-12 px-3  lg:w-11/12 mx-auto">
            <img
              src="/whoweare.svg"
              className="w-full"
              alt="who we are image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
