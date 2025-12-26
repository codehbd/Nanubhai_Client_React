import { useSelector } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";

import ProfileMenu from "./ProfileMenu";
import NavLocation from "./NavLocation";
import { getOrCreateGuestId } from "../../utils";
import { useGetAllCartQuery } from "../../redux/features/cart/cartApiSlice";
import { Link } from "react-router-dom";

export default function NavProfile() {
  const { user } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const guestId = getOrCreateGuestId();
  const { data } = useGetAllCartQuery({
    userId: user?._id,
    guestId,
  });

  // useEffect(() => {
  //   const items = readGuestCart();
  //   dispatch(setCart({ items }));
  // }, []);

  return (
    <div className="flex items-center space-x-1 md:space-x-4">
      {user ? (
        <span className="hidden md:block font-medium text-black">
          Hi, {user?.name?.split(" ")[0]}
        </span>
      ) : (
        <div className="hidden md:flex gap-x-4">
          <Link
            to="/"
            className="font-medium text-black hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="font-medium text-black hover:text-primary transition-colors"
          >
            Products
          </Link>
          <Link
            to="/login"
            className="font-medium text-black hover:text-primary transition-colors"
          >
            Login
          </Link>
        </div>
      )}
      <Link
        to={`/wishlist`}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors relative"
        aria-label="Shopping cart"
      >
        <Heart className="h-7 w-7 text-black" strokeWidth={2} />
        {wishlistItems?.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm z-10">
            {wishlistItems?.length}
          </span>
        )}
      </Link>
      <Link
        to={`/cart`}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors relative"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-7 w-7 text-black" strokeWidth={2} />
        {data?.items?.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm z-10">
            {data?.items?.length}
          </span>
        )}
      </Link>
      <NavLocation />
      <ProfileMenu />
    </div>
  );
}
