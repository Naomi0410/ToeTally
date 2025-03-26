import MapComponent from "../map/MapComponent";
import Subscribe from "../Subscribe";
import { useNavigate } from "react-router-dom";

const FindUs = () => {
  const navigate = useNavigate();

  const handleGetInTouch = () => {
    navigate("/contact-us");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="space-y-10 md:px-3 lg:px-16">
        {/* Row with two sections */}
        <div className="md:flex flex-col md:flex-row p-6 gap-8 hidden">
          {/* Left Section: 1/3 */}
          <div className="w-full md:w-5/12 md:p-4 flex items-center">
            <div className="responsive-container">
              <h1 className="font-family-3 text-black text-2xl md:text-3xl">
                Find Our Outlets Today
              </h1>
              <p className="font-font-family-2 font-medium">
                Thank you for visiting our page! If you have any questions, need
                further assistance, or would like to learn more about our
                [services/products], please don't hesitate to contact us. We'd
                love to hear from you!
              </p>
              <button
                className="responsive-button px-4 -mt-1 py-2 bg-[#01497C] text-white rounded-md font-font-family-2"
                onClick={handleGetInTouch}
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Right Section: 2/3 */}
          <div className="w-full md:w-7/12 md:p-4">
            <MapComponent />
          </div>
        </div>

        <div className="md:mb-4 md:w-5/6 lg:w-full mx-auto">
          <Subscribe />
        </div>
      </div>
    </>
  );
};

export default FindUs;
