import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UIRoutes } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { presentToast, TOAST_TYPES } from "../../redux/features/ToastSlice";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<RegisterForm>({
    criteriaMode: 'all'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/incompatible-library
  const passwordValue = watch("password");

  const onSubmit = (data: RegisterForm) => {
    console.log("Register Data:", data);
    dispatch(presentToast({ message: 'Registered successfully', type: TOAST_TYPES.SUCCESS }))
    reset()
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-4 py-8">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-white text-center">
          <span className="text-purple-400">Otaku</span>Growth
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* USERNAME */}
          <div>
            <label className="text-sm text-gray-300">User Name</label>
            <input
              type="text"
              {...register("username", {
                required: "User name is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-gray-200 placeholder-gray-500 
              focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Enter a username"
            />
            {errors.username && (
              <p className="text-sm text-red-400 mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-gray-200 placeholder-gray-500 
              focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-300">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "At least 8 characters",
                  },
                  validate: {
                    hasUpper: v => /[A-Z]/.test(v) || "One uppercase letter",
                    hasLower: v => /[a-z]/.test(v) || "One lowercase letter",
                    hasNumber: v => /\d/.test(v) || "One number",
                    hasSpecial: v => /[@$!%*?&]/.test(v) || "One special character",
                  }
                })}
                className="w-full mt-1 px-3 py-2 pr-10 bg-neutral-800 border border-neutral-700
                 rounded-md text-gray-200 placeholder-gray-500 
                 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Create a strong password"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* MULTIPLE ERRORS */}
            {errors.password?.types && (
              <ul className="mt-2 text-sm text-red-400 space-y-1">
                {Object.values(errors.password.types).map((msg, idx) => (
                  <li key={idx}>• {msg}</li>
                ))}
              </ul>
            )}
          </div>


          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                className="w-full mt-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-gray-200 placeholder-gray-500 
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Re-enter password"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-400 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition shadow-md"
          >
            Register
          </button>

        </form>

        {/* LINK TO LOGIN */}
        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to={`/${UIRoutes.LOGIN}`} className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
