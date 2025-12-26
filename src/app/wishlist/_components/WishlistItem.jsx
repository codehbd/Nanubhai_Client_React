import { ShoppingCart, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeWishlistItem } from "../../../redux/features/wishlist/wishlistSlice";
import { getImageUrl, getOrCreateGuestId } from "../../../utils";
import { Link } from "react-router-dom";
import { useAddToCartMutation } from "../../../redux/features/cart/cartApiSlice";

export default function WishlistItem({ item }) {
  const [addToCart] = useAddToCartMutation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const removeFromWishlist = () => {
    dispatch(removeWishlistItem(item));
    toast.success("Product removed from wishlist!");
  };
  const addWishlistToCart = async () => {
    try {
      await addToCart({
        productId: item.productId,
        quantity: 1,
        guestId: getOrCreateGuestId(),
        userId: user ? user?._id : "",
      }).unwrap();
      toast.success("Product added to cart");
      // const userId = user?._id ?? "";
      // const { cart, items } = await getCarts(userId);
      // dispatch(setCart({ cart, items }));
      removeFromWishlist();
    } catch (error) {
      toast.error(error?.message || "Failed to add to cart");
    }
  };
  return (
    <div key={item?.productId} className="p-4 flex items-start relative">
      {/* Product Image */}
      <div className="w-24 h-24 relative rounded-md overflow-hidden shrink-0">
        {item?.image && (
          <img
            src={getImageUrl(item?.image)}
            alt={item?.name}
            className="w-full h-full object-cover"
            sizes="96px"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="ml-4 grow pr-10">
        <div className="flex justify-between">
          <Link
            to={`/products/${item?.productId}`}
            className="font-extrabold text-black hover:text-blue-300 text-lg "
            style={{ color: "black" }}
          >
            {item?.name}
          </Link>
        </div>
        <p className="text-lg font-extrabold text-black mt-2">
          <span className="flex items-center gap-2">
            {/* Unit Price × Quantity */}
            <span>৳{item?.price}</span>
          </span>
        </p>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-x-4">
        <button
          onClick={() => addWishlistToCart()}
          className="w-fit bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 text-xs shadow-md hover:shadow-xl flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer whitespace-nowrap"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
        <button
          onClick={() => removeFromWishlist()}
          className="text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
          aria-label="Remove item"
        >
          <Trash2 className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
