import { Star } from "lucide-react";

export default function Rating({ rating }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={`${
            i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-[10px] text-gray-500 ml-1">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}
