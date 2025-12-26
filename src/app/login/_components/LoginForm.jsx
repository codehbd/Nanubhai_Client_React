import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/features/auth/authApiSlice";
import { userLoggedIn } from "../../../redux/features/auth/authSlice";
import { loginUserSchema } from "../../../validation/user.dto";
import { Link, useNavigate } from "react-router-dom";
import { getOrCreateGuestId } from "../../../utils";
import { useMergeGuestCartMutation } from "../../../redux/features/cart/cartApiSlice";
import { storeToken } from "../../../storage/local-storage";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginUserSchema),
  });

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [login] = useLoginMutation();
  const [mergeGuestCart] = useMergeGuestCartMutation();
  const onSubmit = async (data) => {
    if (isRemember) {
      localStorage.setItem("rember-user", JSON.stringify(data));
    } else {
      localStorage.removeItem("rember-user");
    }
    try {
      const resData = await login(data).unwrap();
      // ✅ login success — redirect or update UI
      storeToken(resData?.access_token);
      dispatch(userLoggedIn({ user: resData?.user }));
      const last_url = localStorage.getItem("last_url") || "/";
      navigate(last_url, { replace: true });
      localStorage.removeItem("last_url");
      try {
        await mergeGuestCart({
          userId: resData?.user?._id,
          guestId: getOrCreateGuestId(),
        }).unwrap();
        // const userId = resData?.user?._id ?? "";
        // const { cart, items } = await getCarts(userId);
        // dispatch(setCart({ cart, items }));
      } catch (error) {
        toast.error(error.message || "Failed to merge cart!");
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to login!");
    }
  };

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rember-user");
    if (rememberedUser) {
      const user = JSON.parse(rememberedUser);
      if (user?.email && user?.password) {
        setIsRemember(true);
        setValue("email", user.email);
        setValue("password", user.password);
      }
    }
  }, [setValue]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-black"
          style={{ color: "black" }}
        >
          Email address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors?.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black`}
            placeholder="you@example.com"
            style={{ color: "black" }}
          />
        </div>
        {errors?.email && (
          <p className="mt-2 text-sm text-red-600">{errors?.email?.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black"
          style={{ color: "black" }}
        >
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`block w-full pl-10 pr-10 py-2 border ${
              errors?.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black`}
            placeholder="••••••••"
            style={{ color: "black" }}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {errors?.password && (
          <p className="mt-2 text-sm text-red-600">
            {errors?.password?.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            checked={isRemember}
            onChange={(e) => setIsRemember(e.target.checked)}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-black hover:text-primary transition-colors"
          >
            <span className="text-black!" style={{ color: "black" }}>
              Forgot your password?
            </span>
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
