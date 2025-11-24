import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { UIRoutes } from "../../constants/routes";
import { useDispatch } from "react-redux";
import { presentToast, TOAST_TYPES } from "../../redux/features/ToastSlice";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("Login Data:", data);
    reset();
    dispatch(presentToast({ message: 'Login successful', type: TOAST_TYPES.SUCCESS }))
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0f] px-4 py-8">
      <div className="w-full max-w-md bg-[#16161a] shadow-xl rounded-2xl p-8 border border-[#222]">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-white text-center">
          <span className="text-purple-400">Otaku</span>Growth
        </h1>

        <p className="text-gray-400 text-center text-sm mt-1">
          “Surpass your yesterday self.”
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full mt-1 px-4 py-2 bg-[#1d1d22] text-white rounded-xl border border-[#333] focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password + Eye Icon */}
          <div>
            <label className="text-gray-300 text-sm">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full mt-1 px-4 py-2 bg-[#1d1d22] text-white rounded-xl border border-[#333] focus:ring-2 focus:ring-purple-500 outline-none pr-12"
                placeholder="••••••••"
              />

              {/* Eye Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-2 rounded-xl"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-center text-sm mt-6">
          New here?{" "}
          <Link to={`/${UIRoutes.REGISTER}`} className="text-purple-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
