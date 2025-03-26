import { Outlet } from "react-router-dom";
import { Nav } from "../components";
import { BsInstagram } from "react-icons/bs";
import { FaSnapchat } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineFacebook } from "react-icons/ai";
import { Image } from "react-bootstrap";
import { whiteLogo } from "../assets";


const RootLayout = () => {
  return (

      <div className="w-full mx-auto 2xl:container">
        <Nav />
        <Outlet />
        <footer className="bg-black text-white">
          <div className="lg:p-16 p-8 d-none d-md-flex justify-content-between">
            <div className="d-lg-flex d-none gap-2 flex-column">
              <div className="d-flex align-items-center justify-content-start gap-2">
                <Image src={whiteLogo} />
                <span className="font-family-1 font-bold fs-5">TOETALLY</span>
              </div>
              <div className="d-flex gap-4">
                <BsInstagram size="25px" />
                <FaSnapchat size="25px" />
                <AiOutlineFacebook size="25px" />
                <FaXTwitter size="25px" />
              </div>
            </div>
            <div className="d-flex flex-column justify-content-start gap-3">
              <h5 style={{ fontFamily: "Averia Serif Libre" }}>Company</h5>
              <a
                href="/aboutus"
                className=" font-family-2 font-extralight text-white no-underline"
              >
                About Us
              </a>
              <a
                href="/checkout"
                className="font-family-2 font-extralight text-white no-underline"
              >
                Shop now
              </a>
              <a
                href="/contact-us"
                className="font-family-2 font-extralight text-white no-underline"
              >
                Contact
              </a>
            </div>
            <div className="d-flex flex-column justify-content-start gap-3">
              <h5 style={{ fontFamily: "Averia Serif Libre" }}>Legal</h5>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Privacy policy
              </a>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Terms and Conditions
              </a>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Cookie policy
              </a>
            </div>
            <div className="d-flex flex-column justify-content-start gap-3">
              <h5 style={{ fontFamily: "Averia Serif Libre" }}>Help</h5>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Shipping and delivery
              </a>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Return policy
              </a>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Payment and security
              </a>
            </div>
            <div className="d-flex flex-column justify-content-start gap-3">
              <h5 style={{ fontFamily: "Averia Serif Libre" }}>Shop</h5>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Men
              </a>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Women
              </a>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Kids
              </a>
              <a
                href="#"
                className="font-family-2 font-extralight text-white no-underline disabled-link"
              >
                Sales
              </a>
            </div>
          </div>

          {/* small screen */}
          <div className="d-md-none d-block px-3 py-8">
            <div className="d-flex mb-5 d-md-none gap-2 flex-column justify-content-center">
              <div className="d-flex align-items-center gap-2">
                <Image src={whiteLogo} sizes="20px" />
                <span className="font-family-1 font-bold text-base">
                  TOETALLY
                </span>
              </div>
              <div className="d-flex gap-4">
                <BsInstagram size="20px" />
                <FaSnapchat size="20px" />
                <AiOutlineFacebook size="20px" />
                <FaXTwitter size="20px" />
              </div>
            </div>
            <div className="flex-wrap gap-16  d-flex ">

              <div className="grid grid-cols-2 gap-4">
                <div className="d-flex flex-column justify-content-start gap-2">
                <h5
                  style={{ fontFamily: "Averia Serif Libre" }}
                  className="text-lg"
                >
                  Company
                </h5>
                <a href="aboutus" className=" font-family-2 font-light text-sm text-white no-underline">About Us</a>
                <a href="checkout" className="font-family-2 font-light text-sm text-white no-underline">Shop now</a>
                <a href="contact-us" className="font-family-2 font-light text-sm text-white no-underline">Contact</a>
              </div>
              <div className="d-flex flex-column justify-content-start gap-2">
                <h5
                  style={{ fontFamily: "Averia Serif Libre" }}
                  className="text-lg"
                >
                  Legal
                </h5>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">
                  Privacy policy
                </a>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">
                  Terms and Conditions
                </a>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">
                  Cookie policy
                </a>
              </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
              <div className="d-flex flex-column gap-2 justify-content-start">
                <h5
                  style={{ fontFamily: "Averia Serif Libre" }}
                  className="text-lg"
                >
                  Shop
                </h5>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">Men</a>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">Women</a>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">Kids</a>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">Sales</a>
              </div>


              <div className="d-flex gap-2 flex-column justify-content-start">
                <h5
                  style={{ fontFamily: "Averia Serif Libre" }}
                  className="text-lg"
                >
                  Help
                </h5>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">
                  Shipping and delivery
                </a>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">
                  Return policy
                </a>
                <a href="#" className="font-family-2 font-light text-sm text-white no-underline disabled-link">
                  Payment and security
                </a>
              </div>

                
              </div>

              


            </div>
          </div>
        </footer>
      </div>
 
  );
};

export default RootLayout;
