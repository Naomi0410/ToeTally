import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LineWave } from "react-loader-spinner";
import LoginModal from "../modal/LoginModal";
import Alert from "../alert/Alert";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("info");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Setting alert message here so it's ready if an error occurs
    setAlertMessage(null); 

    try {
      const response = await fetch("https://backend-toetally-1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userId", responseData.userId);
        setShowModal(true);
        setAlertMessage("Login successful! Redirecting...");
        setAlertType("success");
        reset(); 
      } else {
        setAlertMessage(responseData.message || "Invalid credentials. Please try again.");
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("Server error. Please try again later.");
      setAlertType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div 
        className="sr-only" 
        role="alert" 
        aria-live="polite"
      >
        {alertMessage}
      </div>

      <div className="flex items-center flex-col lg:flex-row mx-auto 2xl:container">
    
       
        <div className="lg:w-[50%] h-[100vh] hidden lg:block relative">
          {alertMessage && <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage(null)} />}
          
          <img 
            src="/auth.svg" 
            alt="Decorative illustration for login page" 
            className="w-full h-full object-cover" 
          />
          <div className="flex justify-center">
            <img 
              src="/authv.svg" 
              alt="Decorative vector shape" 
              className="absolute bottom-8" 
            />
          </div>
        </div>

        {/* Login Form Section */}
        <div className="lg:w-[45%] w-full py-12 lg:py-0 flex flex-col justify-center items-center md:px-8">
          <div className="w-5/6 2xl:w-4/6 font-font-family-2">
            <Link 
              to="/" 
              className="flex justify-center gap-1 items-center link-container text-black no-underline"
              aria-label="Go to homepage"
            >
              <img src="/logo.svg" alt="TOETALLY logo" className="w-16 h-8" />
              <h1 className="font-font-family-1 text-xl font-bold">TOETALLY</h1>
            </Link>

            <div className="mt-0 link-container">
              <p className="text-gray-600 text-base text-align-custom font-semibold font-font-family-2">
                Enter your email to join us or sign in
              </p>
            </div>

            {/* Login Form */}
            <form 
              className="mx-auto flex flex-col justify-center" 
              onSubmit={handleSubmit(onSubmit)} 
              autoComplete="off"
            >
              {/* Email Input */}
              <label htmlFor="email" className="text-sm font-bold mb-2">
                <span className="lg:sr-only">Email</span> 
              </label>
              <input
                type="text"
                id="email" 
                className="rounded-sm outline-none border-[#696767] w-full mx-auto border-[1px] px-3 py-2"
                placeholder="Email*"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
             
              {errors.email && <p role="alert" className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

             
              <div className="relative mt-3">
                <label htmlFor="password" className="text-sm font-bold mb-2">
                  <span className="lg:sr-only">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="rounded-sm outline-none border-[#696767] w-full mx-auto border-[1px] px-3 py-2"
                  placeholder="Password*"
                  aria-invalid={errors.password ? "true" : "false"} 
                  {...register("password", { required: "Password is required." })}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 lg:mt-0 cursor-pointer text-gray-500 p-1"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-controls="password" 
                >
                  {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                </button>
              </div>
              {errors.password && <p role="alert" className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#01497C] w-full py-2.5 rounded-md mx-auto text-[white] mt-4 flex justify-center items-center"
                disabled={isLoading}
                aria-busy={isLoading ? "true" : "false"} 
              >
                {isLoading ? (
                  <LineWave 
                    height="25" 
                    width="50" 
                    color="#ffffff" 
                    ariaLabel="Loading, please wait" 
                  />
                ) : (
                  "Continue"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="flex justify-center lg:justify-start text-align-custom gap-2 mt-3 text-[14px] md:text-[16px]">
              <p>Don't have an account?</p>
              <Link to="/signup" className="text-[#01497C] font-semibold">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Login;