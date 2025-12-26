import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-6xl font-bold text-gray-500 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-primary/90 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
