import { useState } from "react";
import { vector1, vector2, vector3, vector4 } from "../assets";
import ActionButton from "./ActionButton";
import axios from "axios";
import {toast} from "react-toastify"

const Subscribe = () => {
  const [email, setEmail] = useState('');
  
const handleSubscribe = async (email) => {
  console.log("handleSubscribe function called with email:", email);
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   if (!emailRegex.test(email)) {
     toast.error("Invalid email address");
     return;
   }

  try {
    const response = await axios.post(
      "https://backend-toetally.onrender.com/api/sub/newsletter",
      { email }
    );
    console.log("Response from backend:", response.data);
    if (response.data.message === 'Subscription successful!') {
      toast.success(response.data.message);
      setEmail('');
    }

  } catch (error) {
    console.error("Error subscribing to newsletter:", error.response.data);
    if (error.response.data.message === 'Email is already subscribed.') {
      toast.info(error.response.data.message);
    } else {
      toast.error("Error subscribing to newsletter");
    }
    setEmail('');
  }
};

  return (
    <>
      <div className=" mt-10 mb-12 p-4 w-11/12 mx-auto d-none d-lg-block">
        <div className="bg-[#01497C] rounded-4 text-center text-white p-14 position-relative">
          <h1 className="font-family-3 text-5xl">
            Subscribe to our Newsletter
          </h1>
          <p className="font-family-2 w-3/5 xl:w-2/5 mx-auto mt-4 font-light text-[#FFFFFFCC]">
            By providing your email, you agree to the Terms & Conditions and
            Privacy Policy. You may unsubscribe later.
          </p>
          <div className="flex items-center border-[2px] mt-4 text-start ps-4 w-4/6 xl:w-3/6 mx-auto border-white rounded-4">
            <input
              type="text"
              placeholder="Email Address"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="font-family-2 w-3/4 p-2 bg-[#01497C] text-white placeholder-white outline-none"
            />
            <ActionButton
              variant="none"
              size="lg"
              text="Subscribe"
              style={{
                backgroundColor: "white",
                fontFamily: "Alexandria variable",
                color: "black",
              }}
              className="font-family-2 rounded-4 w-2/6 py-2 px-4"
              onClick={() => handleSubscribe(email)}
            />
          </div>
          <img src={vector1} className="vector-image1 xl:left-36" />
          <img src={vector2} className="vector-image2 xl:right-36" />
          <img src={vector3} className="vector-image3 xl:left-36" />
          <img src={vector4} className="vector-image4 xl:right-36" />
        </div>
      </div>

      {/* subsribe with us small screen */}
      <div className="bg-[#01497C] d-block d-lg-none text-white px-4  m-3  pt-16 pb-8 position-relative rounded-lg">
        <h1 className="font-family-3 text-center text-white text-2xl md:text-4xl">
          Subscribe to our Newsletter
        </h1>
        <p className="font-family-2 text-center text-[#FFFFFFCC] mt-2 text-xs w-5/6 mx-auto font-light">
          By providing your email, you agree to the Terms & Conditions and
          Privacy Policy. You may unsubscribe later.
        </p>
        <div className="flex items-center border-[1px] mt-4 text-start ps-4  mx-auto border-white rounded-3 md:w-4/6">
          <input
            type="text"
            placeholder="Email Address"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="font-family-2 w-4/5 bg-[#01497C] text-white placeholder-white outline-none"
          />
          <ActionButton
            variant="none"
            size="smal"
            text="Subscribe"
            style={{
              backgroundColor: "white",
              fontFamily: "Alexandria variable",
              color: "black",
            }}
            onClick={() => handleSubscribe(email)}
            className="font-family-2 rounded-3 w-32 p-2"
          />
        </div>
        <img src={vector1} className="vector-image1S" />
        <img src={vector2} className="vector-image2S" />
      </div>
    </>
  );
};

export default Subscribe;
