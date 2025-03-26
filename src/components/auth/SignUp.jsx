import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LineWave } from "react-loader-spinner";
import Alert from "../alert/Alert";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null); // State for managing alerts
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
  });

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPasswordValidation(validatePassword(newPassword));
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://backend-toetally.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          })
        );

        setAlert({ message: "Registration successful! Redirecting...", type: "success" });
        setTimeout(() => navigate("/login"), 2000); // Redirect after showing alert
        reset();
      } else {
        setAlert({ message: `Error: ${result.message}`, type: "error" });
      }
    } catch (error) {
      setAlert({ message: "Server is unreachable. Try again later.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:h-[900px] 2xl:h-screen">
      

      {/* Left Section: Image */}
      <div className="lg:w-[55%] h-full hidden lg:block relative">
      {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />} {/* Alert component */}
        <img
          src="/auth.svg"
          alt="login image"
          className="w-full h-full object-cover"
        />
        <div className="flex justify-center">
          <img src="/authv.svg" alt="auth vector" className="absolute bottom-8" />
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="lg:w-[45%] w-full mx-auto py-12 lg:py-0 flex flex-col justify-center items-center md:px-2">
        <div className="w-5/6 font-font-family-2">
          <Link to="/" className="flex gap-2 items-center justify-center text-black link-container no-underline">
            <img src="/logo.svg" alt="logo" className="w-16 h-16" />
            <h1 className="font-font-family-1 text-2xl font-bold mt-2">TOETALLY</h1>
          </Link>

          <div className="mt-2 link-container">
            <p className="text-gray-600 text-lg text-center font-semibold font-font-family-2">
              Now let’s make you a Toetally member
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="w-full">
                <label htmlFor="firstName" className="text-sm lg:hidden font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  {...register("firstName", { required: "First name is required" })}
                  placeholder="First Name*"
                  className="rounded-sm outline-none border-[#696767] w-full border-[1px] px-2 py-2"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>

              <div className="w-full sm:mt-2 md:mt-[30px] lg:mt-0">
                <input
                  type="text"
                  {...register("lastName", { required: "Last name is required" })}
                  placeholder="Last Name*"
                  className="rounded-sm outline-none border-[#696767] w-full border-[1px] px-2 py-2"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email Input */}
            <div className="mt-4">
              <label htmlFor="email" className="text-sm lg:hidden font-bold mb-2">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email*"
                className="outline-none w-full px-2 py-2 border-[1px] border-[#696767] rounded-sm"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div className="mt-4 relative">
              <label htmlFor="password" className="text-sm lg:hidden font-bold mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Password*"
                className="outline-none w-full px-2 py-2 border-[1px] border-[#696767] rounded-sm"
                onChange={handlePasswordChange}
              />
              <div
                className="absolute right-3 top-11 lg:top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Password Validation */}
            <div className="mt-2">
              <p className={`text-sm ${passwordValidation.minLength ? "text-green-500" : "text-[#979797]"}`}>
                {passwordValidation.minLength ? "✔" : "✖"} Minimum of 8 characters
              </p>
              <p className={`text-sm ${passwordValidation.hasUppercase && passwordValidation.hasLowercase && passwordValidation.hasNumber ? "text-green-500" : "text-[#979797]"}`}>
                {passwordValidation.hasUppercase && passwordValidation.hasLowercase && passwordValidation.hasNumber ? "✔" : "✖"} Uppercase, lowercase letters, and one number
              </p>
            </div>

            {/* Continue Button */}
            <div className="w-full mx-auto mt-2">
              <button
                type="submit"
                className="bg-[#01497C] w-full py-2.5 rounded-md mx-auto text-white flex justify-center items-center"
              >
                {isLoading ? (
                  <LineWave height="25" width="50" color="#ffffff" ariaLabel="line-wave-loading" />
                ) : (
                  "Register"
                )}
              </button>
            </div>

            <div className="mt-4">
              <div className="flex gap-2 relative">
                <input type="checkbox" className="absolute top-1" />
                <p className="text-sm lg:text-base ml-5">
                  Sign up for emails to get updates from Toetally on products, offers, and your member benefits.
                </p>
              </div>
              <div className="flex gap-2 relative">
                <input type="checkbox" className="absolute mt-1" />
                <p className="text-sm lg:text-base ml-5">
                  I agree to Toetally‘s <span className="font-semibold">Privacy Policy</span> and <span className="font-semibold">Terms of use</span>.
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-3 justify-center lg:justify-start">
              <p>Have an account?</p> <a href="/login" className="text-[#01497C] font-semibold">Sign in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
