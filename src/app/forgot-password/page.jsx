import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import { getToken } from "../../storage/local-storage";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function ForgotPassowordPage() {
  const token = getToken();
  const navigate = useNavigate();

  if (token) {
    navigate("/"); // already logged in
  }
  return (
    <>
      <Helmet>
        <title>
          Forgot Password | Nanuvaier Rosona Kothon - Your Online Shop
        </title>
        <meta name="description" content="An online store for all your needs" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div
          className="sm:mx-auto sm:w-full sm:max-w-md animate-fadeIn"
          style={{ animation: "fadeIn 0.6s ease-out" }}
        >
          <h2
            className="mt-2 text-center text-3xl font-extrabold text-black"
            style={{ color: "black" }}
          >
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your valid email to reset password link
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:text-primary transition-colors"
            >
              <span className="text-black!" style={{ color: "black" }}>
                Login
              </span>
            </Link>
          </p>
        </div>

        <div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slideUp"
          style={{ animation: "slideUp 0.6s ease-out 0.2s both" }}
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
