import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getOrCreateGuestId } from "../../utils";
import { useAddToCartMutation } from "../../redux/features/cart/cartApiSlice";

export default function AddToCartButton({ product }) {
  const [addToCart] = useAddToCartMutation();
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const controlsRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  // Handle click outside to close quantity controls
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target)) {
        setShowQuantityControls(() => false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // If Buy Now button is clicked, show quantity controls
    if (!showQuantityControls) {
      setShowQuantityControls(() => true);
    } else {
      try {
        // If Add button is clicked after selecting quantity
        await addToCart({
          productId: product._id,
          varientId: "",
          quantity,
          guestId: getOrCreateGuestId(),
          userId: user ? user?._id : "",
        }).unwrap();

        toast.success("Product added to cart");
        // const userId = user?._id ?? "";
        // const { cart, items } = await getCarts(userId);
        // dispatch(setCart({ cart, items }));
        // Reset and close after adding to cart
        setQuantity(1);
        setShowQuantityControls(() => false);
      } catch (error) {
        toast.error(error?.message || "Failed to add to cart");
      }
    }
  };

  const increaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="relative" ref={controlsRef}>
      {/* Buy Now button */}
      {!showQuantityControls && (
        <button
          onClick={handleAddToCart}
          className={`w-full bg-black hover:bg-gray-800 text-white text-[10px] font-medium rounded-sm transition-all cursor-pointer duration-300 py-1.5`}
          aria-label="Buy Now"
        >
          Add To Cart
        </button>
      )}

      {/* Quantity Controls */}
      {showQuantityControls && (
        <div className="w-full flex items-center bg-white rounded-sm border border-gray-200 text-[10px]">
          <button
            onClick={decreaseQuantity}
            className="p-1.5 hover:bg-gray-100 rounded-l-sm flex-1 cursor-pointer"
          >
            <Minus className="w-2.5 h-2.5 text-black mx-auto" />
          </button>
          <span className="px-1.5 text-[10px] font-medium text-black flex-1 text-center cursor-default">
            {quantity}
          </span>
          <button
            onClick={increaseQuantity}
            className="p-1.5 hover:bg-gray-100 flex-1 cursor-pointer"
          >
            <Plus className="w-2.5 h-2.5 text-black mx-auto" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-1.5 px-1.5 bg-black text-white text-[10px] rounded-r-sm flex-1 cursor-pointer"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
