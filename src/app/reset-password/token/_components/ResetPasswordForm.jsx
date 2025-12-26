import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../../../../validation/user.dto";
import { useResetPasswordMutation } from "../../../../redux/features/auth/authApiSlice";

export default function ResetPasswordForm({ token }) {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const resData = await resetPassword(data, token).unwrap();
      toast.success(resData?.message || "Password reset successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-black"
          style={{ color: "black" }}
        >
          New Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="newPassword"
            type="password"
            {...register("newPassword")}
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors?.newPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black`}
            placeholder="you@example.com"
            style={{ color: "black" }}
          />
        </div>
        {errors?.newPassword && (
          <p className="mt-2 text-sm text-red-600">
            {errors?.newPassword?.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-black"
          style={{ color: "black" }}
        >
          Confirm Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors?.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black`}
            placeholder="you@example.com"
            style={{ color: "black" }}
          />
        </div>
        {errors?.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">
            {errors?.confirmPassword?.message}
          </p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform cursor-pointer duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? "Resetting..." : "Reset"}
        </button>
      </div>
    </form>
  );
}
