import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="bg-[url('/conbgdes.svg')] bg-cover bg-center h-[350px] text-[#FFFFFF] text-center flex justify-center items-center px-3">
        <div className="flex flex-col justify-center lg:gap-3 font-family-2">
          <h1 className=" text-[30px] lg:text-[80px] font-family-3">CONTACT US</h1>
          {/* <p className="md:w-5/6 md:px-6 lg:w-4/6 mx-auto">We’re here to help you every step of the way! Whether you have a question about our products, need assistance with an order, or simply want to share feedback, we’d love to hear from you.</p> */}
          <p className="font-family-2 text-xs  lg:text-xl">
            <Link to="/" className="no-underline text-white font-family-2 text-xs lg:text-xl">Home</Link> / Contact Us
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
