import { Link } from "react-router-dom";
import { getImageUrl } from "../../../utils";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories/${category?._id}`}
      className="relative aspect-square rounded-xl overflow-hidden bg-gray-900 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-xl"
    >
      {/* Category Image */}
      <div className="w-full h-full flex items-center justify-center relative">
        {category.image && (
          <img
            src={getImageUrl(category.image)}
            alt={`${category.name} category`}
            className="-mt-6 md:-mt-0 w-8 h-8 md:w-30 md:h-30 object-contain transition-transform duration-500 group-hover:scale-110"
          />
        )}

        {/* Category name overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-1">
          <span className="mb-1 md:mb-0 block text-center text-xs md:text-base font-normal text-white">
            {category.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
