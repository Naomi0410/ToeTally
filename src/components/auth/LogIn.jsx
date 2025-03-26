import React, { useState } from "react";
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
    try {
      const response = await fetch("https://backend-toetally.onrender.com/api/auth/login", {
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
        reset(); // Clear the form after successful login
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
      

      <div className="flex flex-col lg:flex-row lg:h-[900px] 2xl:h-screen">
   
        {/* Left Image Section */}
        <div className="lg:w-[55%] h-full hidden lg:block relative">
        {alertMessage && <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage(null)} />}
          <img src="/auth.svg" alt="login image" className="w-full h-full object-cover" />
          <div className="flex justify-center">
            <img src="/authv.svg" alt="auth vector" className="absolute bottom-8" />
          </div>
        </div>

        {/* Login Form Section */}
        <div className="lg:w-[45%] py-12 lg:py-0 flex flex-col justify-center items-center md:px-8">
          <div className="w-5/6 2xl:w-4/6 font-font-family-2">
            <Link to="/" className="flex justify-center gap-2 items-center link-container text-black no-underline">
              <img src="/logo.svg" alt="logo" className="w-16 h-16" />
              <h1 className="font-font-family-1 text-2xl font-bold mt-2">TOETALLY</h1>
            </Link>

            <div className="mt-2 link-container">
              <p className="text-gray-600 text-lg text-align-custom font-semibold font-font-family-2">
                Enter your email to join us or sign in
              </p>
            </div>

            {/* Login Form */}
            <form className="mx-auto flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              {/* Email Input */}
              <label htmlFor="email" className="text-sm lg:hidden font-bold mb-2">Email</label>
              <input
                type="text"
                className="rounded-sm outline-none border-[#696767] w-full mx-auto border-[1px] px-3 py-2"
                placeholder="Email*"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

              {/* Password Input */}
              <div className="relative mt-3">
                <label htmlFor="password" className="text-sm lg:hidden font-bold mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="rounded-sm outline-none border-[#696767] w-full mx-auto border-[1px] px-3 py-2"
                  placeholder="Password*"
                  {...register("password", { required: "Password is required." })}
                />
                <span
                  className="absolute right-3 top-11 lg:top-3 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

              {/* Terms and Conditions
              <p className="text-[#9F9F9F] font-[400] text-start mt-3">
                By continuing, I agree to Toetally’s{" "}
                <a className="hover:underline text-[#9F9F9F] decoration-inherit" href="#">
                  Privacy Policy and Terms of Use.
                </a>
              </p> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#01497C] w-full py-2.5 rounded-md mx-auto text-[white] mt-4 flex justify-center items-center"
              >
                {isLoading ? (
                  <LineWave height="25" width="50" color="#ffffff" ariaLabel="line-wave-loading" />
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

      {/* Show modal if login is successful */}
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Login;
