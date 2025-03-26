import { useState, useEffect } from "react";

const Alert = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const alertStyles = {
    success: "bg-green-100 text-green-700 border border-green-400",
    error: "bg-red-100 text-red-700 border border-red-400",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    info: "bg-blue-100 text-blue-700 border border-blue-400",
  };

  return (
    <div className={`py-1 px-2 rounded-md shadow-md ${alertStyles[type]} fixed top-5 right-0 left-0 flex w-10/12 md:w-6/12 2xl:w-4/12 mx-auto  items-center`}>
      <p className="mt-3 mx-auto font-font-family-5 xl:text[25px] 2xl:text-[30px]">{message}</p>
      {/* <button onClick={() => setVisible(false)} className="ml-4 -mt-3 text-black font-bold">
        ✖
      </button> */}
    </div>
  );
};

export default Alert;
