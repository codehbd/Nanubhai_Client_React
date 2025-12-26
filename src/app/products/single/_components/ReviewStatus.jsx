import { Star } from "lucide-react";
import { useMemo } from "react";

export default function ReviewStatus({ ratings }) {
  const averageRating = useMemo(() => {
    const total = ratings?.length
      ? ratings.reduce((sum, item) => sum + Number(item.rating), 0)
      : 0;
    return total ? (total / ratings?.length).toFixed(1) : 0;
  }, [ratings]);
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
          <Star className="h-6 w-6 text-white fill-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Customer Reviews
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-7 h-7 text-yellow-400 fill-yellow-400 drop-shadow-sm"
            />
          ))}
        </div>
        <span className="text-2xl font-bold text-gray-900">
          {averageRating} out of 5
        </span>
      </div>

      <p className="text-lg text-gray-600">
        Based on <span className="font-semibold">{ratings?.length}</span>{" "}
        reviews
      </p>
    </div>
  );
}
