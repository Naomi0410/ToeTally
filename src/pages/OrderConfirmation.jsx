import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const OrderConfirmation = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      {/* Modal container */}
      <div className="relative flex flex-col gap-4 py-12 w-4/5 md:w-3/5 mx-auto bg-white rounded-lg shadow-lg p-6 text-center md:my-10">
        
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Success Icon Wrapper (Zooms in and out) */}
        <div className="bg-[#23A26D1F] w-[160px] p-6 rounded-full mx-auto animate-zoomInOut">
          <img src="/tick.svg" alt="tick icon" className="w-full scale-100" />
        </div>

        <h1 className="text-xl font-bold">Payment Successful</h1>
        <p className="-mt-4 w-8/12 lg:w-4/12 mx-auto">Your order will be shipped in 2-3 international days.</p>

        {/* Continue Button */}
        <button 
          onClick={handleClose}
          className="bg-[#01497C] py-3 rounded-lg lg:w-6/12 xl:w-4/12 mx-auto text-white w-full"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
