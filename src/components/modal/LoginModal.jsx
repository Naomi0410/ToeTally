import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose(); // Close the modal
    }
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      {/* Modal container */}
      <div className="relative flex flex-col gap-4 py-12 w-4/5 md:w-3/5 mx-auto bg-white rounded-4 shadow-lg p-6 text-center">
        
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Animated Success Icon Wrapper */}
        <div className="bg-[#23A26D1F] w-[160px] p-6 rounded-full mx-auto animate-zoomInOut">
          <img src="/tick.svg" alt="tick icon" className="w-full scale-100" />
        </div>

        <h1 className="text-lg md:text-2xl font-family-2 font-bold">Welcome Back</h1>
        <p className="-mt-4 font-family-2 text-base md:text-xl">You are already logged in</p>

        {/* Continue Button */}
        <button 
          onClick={handleClose}
          className="bg-[#01497C] py-3 rounded-lg text-white w-4/5 mx-auto text-lg font-family-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
