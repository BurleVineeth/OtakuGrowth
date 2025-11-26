import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { UIRoutes } from "../constants";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-200 px-6">
      {/* Centered 404 Badge */}
      <div className="mb-6 flex items-center justify-center w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800">
        <span className="text-4xl font-bold text-gray-300">404</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-100 text-center">Page Not Found</h1>

      {/* Description */}
      <p className="mt-3 text-gray-400 text-center max-w-md leading-relaxed">
        The page you're trying to access doesn't exist or may have been moved.
      </p>

      {/* Back Button */}
      <Link
        to={UIRoutes.ROOT}
        className="mt-8 flex items-center gap-2 px-5 py-2 rounded-md bg-neutral-800 text-gray-100 border border-neutral-700 hover:bg-neutral-700 transition"
      >
        <FiArrowLeft className="text-lg" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
