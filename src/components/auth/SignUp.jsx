import { useState } from "react";
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
      // First, signup the user
      const signupResponse = await fetch(
        "https://backend-toetally-1.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const signupResult = await signupResponse.json();

      if (signupResponse.ok) {
        // After successful signup, automatically login
        const loginResponse = await fetch(
          "https://backend-toetally-1.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          }
        );

        const loginResult = await loginResponse.json();

        if (loginResponse.ok) {
          // Store token and userId from login
          localStorage.setItem("token", loginResult.token);
          localStorage.setItem("userId", loginResult.userId);

          setAlert({
            message: "Registration successful! Redirecting...",
            type: "success",
          });
          setTimeout(() => navigate("/"), 2000);
          reset();
        } else {
          setAlert({
            message:
              "Signup successful but login failed. Please login manually.",
            type: "error",
          });
          setTimeout(() => navigate("/login"), 2000);
        }
      } else {
        setAlert({ message: `Error: ${signupResult.message}`, type: "error" });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setAlert({
        message: "Server is unreachable. Try again later.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col lg:flex-row mx-auto 2xl:container">
      {/* Left Section: Image */}
      <div className="lg:w-[50%] h-[100vh] hidden lg:block relative">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}{" "}
        {/* Alert component */}
        <img
          src="/auth.svg"
          alt="login image"
          className="w-full h-full object-cover"
        />
        <div className="flex justify-center">
          <img
            src="/authv.svg"
            alt="auth vector"
            aria-hidden="true"
            className="absolute bottom-8"
          />
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="lg:w-[45%] w-full mx-auto py-12 lg:py-0 flex flex-col justify-center items-center md:px-2">
        <div className="w-5/6 font-font-family-2">
          <Link
            to="/"
            className="flex gap-1 items-center justify-center text-black link-container no-underline"
          >
            <img src="/logo.svg" alt="logo" className="w-16 h-8" />
            <h1 className="font-font-family-1 text-xl font-bold">TOETALLY</h1>
          </Link>

          <div className="mt-0 link-container">
            <p className="text-gray-600 text-base text-center font-semibold font-font-family-2">
              Now let’s make you a Toetally member
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="flex flex-col md:flex-row gap-4 mt-3">
              <div className="w-full md:mt-[30px] lg:mt-0">
                <label
                  htmlFor="firstName"
                  className="text-sm lg:hidden font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="First Name*"
                  aria-invalid={errors.firstName ? "true" : "false"}
                  aria-describedby="firstName-error"
                  autoComplete="given-name"
                  className="rounded-sm outline-none border-[#696767] w-full border-[1px] px-2 py-2"
                />
                {errors.firstName && (
                  <p
                    id="firstName-error"
                    role="alert"
                    className="text-red-500  text-sm"
                  >
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="w-full  md:mt-[30px] lg:mt-0">
                <label
                  htmlFor="lastName"
                  className="text-sm lg:hidden font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Last Name*"
                  aria-invalid={errors.lastName ? "true" : "false"}
                  aria-describedby="lastName-error"
                  autoComplete="family-name"
                  className="rounded-sm outline-none border-[#696767] w-full border-[1px] px-2 py-2"
                />
                {errors.lastName && (
                  <p
                    id="lastName-error"
                    role="alert"
                    className="text-red-500 text-sm"
                  >
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="mt-4">
              <label
                htmlFor="email"
                className="text-sm lg:hidden font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email*"
                aria-invalid={errors.email ? "true" : "false"}
                autoComplete="email"
                className="outline-none w-full px-2 py-2 border-[1px] border-[#696767] rounded-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="mt-4 relative">
              <label
                htmlFor="password"
                className="text-sm lg:hidden font-bold mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Password*"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password
                    ? "password-error password-requirements"
                    : "password-requirements"
                }
                autoComplete="new-password"
                className="outline-none w-full px-2 py-2 border-[1px] border-[#696767] rounded-sm"
                onChange={(e) => {
                  register("password").onChange(e);
                  handlePasswordChange(e);
                }}
              />
              <button
                type="button"
                className="absolute right-3 top-11 lg:top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Password Validation */}
            <div
              id="password-requirements"
              role="region"
              aria-live="polite"
              className="mt-2"
            >
              <p
                className={`text-sm ${
                  passwordValidation.minLength
                    ? "text-green-500"
                    : "text-[#979797]"
                }`}
              >
                {" "}
                <span aria-hidden="true">
                  {passwordValidation.minLength ? "✔" : "✖"}
                </span>{" "}
                Minimum of 8 characters
              </p>
              <p
                className={`text-sm ${
                  passwordValidation.hasUppercase &&
                  passwordValidation.hasLowercase &&
                  passwordValidation.hasNumber
                    ? "text-green-500"
                    : "text-[#979797]"
                }`}
              >
                {" "}
                <span aria-hidden="true">
                  {passwordValidation.hasUppercase &&
                  passwordValidation.hasLowercase &&
                  passwordValidation.hasNumber
                    ? "✔"
                    : "✖"}
                </span>{" "}
                Uppercase, lowercase letters, and one number
              </p>
            </div>

            {/* Continue Button */}
            <div className="w-full mx-auto mt-2">
              <button
                type="submit"
                className="bg-[#01497C] w-full py-2.5 rounded-md mx-auto text-white flex justify-center items-center"
                disabled={isLoading}
                aria-busy={isLoading ? "true" : "false"}
                aria-label={isLoading ? "Registering, please wait" : "Register"}
              >
                {isLoading ? (
                  <LineWave
                    height="25"
                    width="50"
                    color="#ffffff"
                    ariaLabel="line-wave-loading"
                  />
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <div className="flex gap-2 mt-3 justify-center lg:justify-start">
              <p>Have an account?</p>{" "}
              <a href="/login" className="text-[#01497C] font-semibold">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
