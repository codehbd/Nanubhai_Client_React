import { Home, Grid, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useGetAllCartQuery } from "../../redux/features/cart/cartApiSlice";
import { getOrCreateGuestId } from "../../utils";

export default function BottomNavbar() {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const guestId = getOrCreateGuestId();
  const { data } = useGetAllCartQuery({
    userId: user?._id,
    guestId,
  });
  return (
    <div className="fixed md:right-4 md:top-1/2 md:-translate-y-1/2 bottom-3 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 z-50 bg-white rounded-full shadow-lg px-3 py-1.5 md:px-2 md:py-3 flex md:flex-col items-center justify-center space-x-5 md:space-x-0 md:space-y-6 border border-gray-200">
      <Link
        to="/"
        className={`flex flex-col items-center p-2 rounded-full hover:bg-gray-200 transition-colors relative ${
          pathname === "/" ? "bg-gray-200" : ""
        }`}
      >
        {pathname === "/" && (
          <div className="absolute -top-1 md:-left-1 md:top-1/2 md:-translate-y-1/2 left-1/2 transform -translate-x-1/2 md:translate-x-0 w-5 md:w-1 h-1 md:h-5 rounded-full bg-primary"></div>
        )}
        <Home className="h-5 w-5 text-gray-800" strokeWidth={2} />
        <span className="text-[10px] font-bold text-gray-800">Home</span>
      </Link>

      <Link
        to="/categories"
        className={`flex flex-col items-center p-2 rounded-full hover:bg-gray-200 transition-colors relative ${
          pathname === "/categories" ? "bg-gray-200" : ""
        }`}
      >
        {pathname === "/categories" && (
          <div className="absolute -top-1 md:-left-1 md:top-1/2 md:-translate-y-1/2 left-1/2 transform -translate-x-1/2 md:translate-x-0 w-5 md:w-1 h-1 md:h-5 rounded-full bg-primary"></div>
        )}
        <Grid className="h-5 w-5 text-gray-800" strokeWidth={2} />
        <span className="text-[10px] font-bold text-gray-800">Category</span>
      </Link>

      <Link
        to={`/cart`}
        className={`flex flex-col items-center p-2 rounded-full hover:bg-gray-200 transition-colors relative ${
          pathname.startsWith("/cart") ? "bg-gray-200" : ""
        }`}
      >
        {pathname.startsWith("/cart") && (
          <div className="absolute -top-1 md:-left-1 md:top-1/2 md:-translate-y-1/2 left-1/2 transform -translate-x-1/2 md:translate-x-0 w-5 md:w-1 h-1 md:h-5 rounded-full bg-primary"></div>
        )}
        <ShoppingCart className="h-5 w-5 text-black" strokeWidth={2} />
        {data?.items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm z-10">
            {data?.items.length}
          </span>
        )}
        <span className="text-[10px] font-bold text-black">Cart</span>
      </Link>
    </div>
  );
}
