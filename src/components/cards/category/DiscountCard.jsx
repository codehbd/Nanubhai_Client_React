import { Link } from "react-router-dom";

export default function DiscountCard() {
  return (
    <Link
      to={`/products?type=discount`}
      className="relative aspect-square rounded-xl overflow-hidden bg-gray-900 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-xl"
    >
      {/* Image */}
      <div className="w-full h-full flex items-center justify-center relative">
        <img
          src={"/icons/offer.svg"}
          alt={`discount category`}
          className="w-10 h-10 md:w-30 md:h-30 object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount name overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-1">
          <span className="block text-center text-xs md:text-base font-normal text-white truncate">
            Discount
          </span>
        </div>
      </div>
    </Link>
  );
}
