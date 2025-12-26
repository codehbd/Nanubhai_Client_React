import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useMergeGuestCartMutation } from "../../redux/features/cart/cartApiSlice";
import { getOrCreateGuestId } from "../../utils";
import toast from "react-hot-toast";
import { useGoogleLoginMutation } from "../../redux/features/auth/authApiSlice";
import { storeToken } from "../../storage/local-storage";
export default function SocialLogin() {
  const [serverError, setServerError] = useState("");
  const [mergeGuestCart] = useMergeGuestCartMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setServerError("");
    try {
      const result = await googleLogin({ credential: credentialResponse.credential }).unwrap();
      // const res = await fetch("/api/auth/google", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ credential: credentialResponse.credential }),
      // });
      // const result = await res.json();
      storeToken(result?.access_token);
      dispatch(userLoggedIn({ user: result.user }));
      const last_url = localStorage.getItem("last_url") || "/";
      navigate(last_url, { replace: true });
      localStorage.removeItem("last_url");
      try {
        await mergeGuestCart({
          userId: result?.user?._id,
          guestId: getOrCreateGuestId(),
        }).unwrap();
        // const userId = result?.user?._id ?? "";
        // const { cart, items } = await getCarts(userId);
        // dispatch(setCart({ cart, items }));
      } catch (error) {
        toast.error(error.message || "Failed to merge cart!");
      }
      navigate("/");
    } catch (error) {
      setServerError(error.message || "Failed to Login!");
    }
  };
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      {serverError && (
        <p className="text-red-500 text-sm bg-red-100 p-2 rounded">
          {serverError}
        </p>
      )}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google login failed")}
          width="100%"
        />
        <button
          type="button"
          className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
        >
          <img
            src="/images/social/facebook.svg"
            alt="Facebook"
            className="w-5 h-5 mr-2"
          />
          <span className="text-black" style={{ color: "black" }}>
            Facebook
          </span>
        </button>
      </div>
    </div>
  );
}
