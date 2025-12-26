import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { forgetPasswordSchema } from "../../../validation/user.dto";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApiSlice";

export default function ForgotPasswordForm() {
  const [forgotPassword] = useForgotPasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const resData = await forgotPassword(data).unwrap();
      toast.success(
        resData?.message || "Password reset link set to your email!"
      );
    } catch (error) {
      toast.error(error.message || "Failed to send password reset link!");
    }
  };

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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform cursor-pointer duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? "Sending Email..." : "Send"}
        </button>
      </div>
    </form>
  );
}
