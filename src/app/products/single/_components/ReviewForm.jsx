import { useState, useEffect } from "react";
import { MessageSquare, Send, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateRatingMutation } from "../../../../redux/features/rating/ratingApiSlice";
import { createRatingSchema } from "../../../../validation/rating.dto";
import { getToken } from "../../../../storage/local-storage";

// ⭐ Star Rating component
const StarRating = ({ rating, setRating }) => (
  <div className="flex items-center space-x-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="p-1 transition-all duration-200 hover:scale-110 transform hover:rotate-12"
        >
          <Star
            className={`w-8 h-8 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400 drop-shadow-lg"
                : "text-gray-300 hover:text-yellow-300"
            } transition-colors duration-150`}
          />
        </button>
      ))}
    </div>
    {rating > 0 && (
      <span className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
        {rating}.0
      </span>
    )}
  </div>
);

export default function ReviewForm({ productId }) {
  const [createRating] = useCreateRatingMutation();
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = getToken();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createRatingSchema),
    defaultValues: { rating: 0, review: "", productId },
  });

  // Sync rating with form state
  useEffect(() => {
    setValue("rating", rating);
    setValue("productId", productId);
  }, [rating, productId, setValue]);

  const onSubmit = async (data) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const resData = await createRating({ token, bodyData: data }).unwrap();
      toast.success(resData?.message || "Review submitted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to submit review!");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3">
          <MessageSquare className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Share Your Experience
        </h3>
        <p className="text-gray-600">
          Help others by sharing your thoughts about this product
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Your Rating <span className="text-red-500">*</span>
          </label>
          <StarRating rating={rating} setRating={setRating} />
          {errors?.rating && (
            <p className="mt-2 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="review"
            className="block text-sm font-semibold text-gray-900 mb-3"
          >
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="review"
            {...register("review")}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-none transition-all duration-200"
            placeholder="What did you like or dislike? How was your experience with the product?"
          />
          {errors?.review && (
            <p className="mt-2 text-sm text-red-600">{errors.review.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 text-xs shadow-md hover:shadow-xl flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <Send className="h-5 w-5 mr-2" />
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
