import { Frown, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearWishlist } from "../../../redux/features/wishlist/wishlistSlice";
import WishlistItem from "./WishlistItem";

export default function Wishlist() {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.wishlist);

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success("Wishlist cleared successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Wishlist Header */}
      <div className="flex items-center justify-between border-b px-6 py-4 bg-white">
        {/* Left section: Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gray-100">
            <Heart className="h-6 w-6 text-gray-800" strokeWidth={2} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        {/* Right section: Clear wishlist */}
        {items?.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="border text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition cursor-pointer"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {/* Wishlist Items */}
      <div className="divide-y">
        {items?.length > 0 ? (
          items.map((item) => <WishlistItem key={item.productId} item={item} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <Frown size={64} />
            <p className="mt-4 text-lg font-medium text-black">
              Your wishlist is empty
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
