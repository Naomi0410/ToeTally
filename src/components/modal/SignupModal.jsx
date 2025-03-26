import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const SignupModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); // Close the modal
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex flex-col gap-4 py-12 w-4/5 md:w-3/5 mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Success Icon */}
        <div className="bg-[#23A26D1F] w-[160px] p-6 rounded-full mx-auto">
          <img src="/tick.svg" alt="tick icon" className="w-full" />
        </div>

        <h1 className="text-xl font-bold">Registered 🎉</h1>
        <p className="-mt-4">You have successfully signed up</p>

        {/* Continue Button */}
        <button 
          onClick={handleClose}
          className="bg-[#01497C] py-3 rounded-lg text-white w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
