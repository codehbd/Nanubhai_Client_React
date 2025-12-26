import { getImageUrl } from "../../../utils";
import dayjs from "dayjs";
import { Star, User } from "lucide-react";

export default function ReviewCard({ rating }) {
  return (
    <div className="min-w-[320px] bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-xl p-6 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-full p-3 mr-4 shadow-sm">
            {rating?.user[0]?.image ? (
              <img
                src={getImageUrl(rating?.user[0]?.image)}
                alt={rating?.user[0]?.name}
                className="w-[40px] h-[40px] rounded-full"
              />
            ) : (
              <User className="h-6 w-6 text-blue-600" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-base">
              {rating?.user[0]?.name}
            </p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < rating?.rating
                      ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {dayjs(rating?.createdAt).format("MMM D, YYYY h:mm A")}
        </span>
      </div>
      <p className="text-gray-700 text-base leading-relaxed border-l-4 border-blue-200 pl-4">
        {rating?.review}
      </p>
    </div>
  );
}
