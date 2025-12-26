import { ShoppingCart as CartIcon, Frown } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getOrCreateGuestId } from "../../../utils";
import {
  useApplyCouponToCartMutation,
  useClearCartMutation,
  useGetAllCartQuery,
} from "../../../redux/features/cart/cartApiSlice";

export default function ShoppingCartList() {
  const [clearCart] = useClearCartMutation();
  const [applyCouponToCart, { isLoading }] = useApplyCouponToCartMutation();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const { user } = useSelector((state) => state.auth);
  const guestId = getOrCreateGuestId();
  const { data } = useGetAllCartQuery({
    userId: user?._id,
    guestId,
  });

  const handleCouponApply = async () => {
    if (!user) {
      return navigate("/login");
    }
    try {
      await applyCouponToCart({
        couponCode: couponCode,
      }).unwrap();
      setCouponCode("");
      // const userId = user?._id ?? "";
      // const { cart, items } = await getCarts(userId);
      // dispatch(setCart({ cart, items }));
      toast.success("Coupon applied successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleClearCart = async () => {
    try {
      const userId = user?._id ?? "";
      const guestId = getOrCreateGuestId();
      await clearCart({
        userId: userId || "",
        guestId: !userId ? guestId : "",
      }).unwrap();
      // const { cart, items } = await getCarts(userId);
      // dispatch(setCart({ cart, items }));
    } catch (error) {
      toast.error(error?.message || "Failed to remove from cart!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Cart Header */}
      <div className="flex items-center justify-between border-b px-6 py-4 bg-white">
        {/* Left section: Icon + Title */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gray-100">
            <CartIcon className="h-6 w-6 text-gray-800" strokeWidth={2} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
        </div>

        {/* Right section: Clear cart */}
        {data?.items?.length > 0 && (
          <button
            onClick={handleClearCart}
            className="border text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition cursor-pointer"
          >
            Clear Cart
          </button>
        )}
      </div>

      {/* Cart Items */}
      <div className="divide-y">
        {data?.items?.length > 0 ? (
          data?.items.map((item) => <CartItem key={item._id} item={item} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <Frown size={64} />
            <p className="mt-4 text-lg font-medium text-black">
              Your cart is empty
            </p>
          </div>
        )}
      </div>

      {/* Coupon Section */}
      <div className="p-4 border-t">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Enter coupon code here"
            className="grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-black font-bold placeholder:text-black placeholder:opacity-60"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            onClick={handleCouponApply}
            disabled={data?.items?.length < 1 || isLoading}
            className={`bg-black text-white font-extrabold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors shadow-md ${
              data?.items?.length < 1 || isLoading
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            {isLoading ? "Applying" : "Add Coupon"}
          </button>
        </div>
      </div>

      {/* Total & Checkout */}
      <div className="bg-black text-white p-4 flex items-center justify-between">
        <div
          className="font-extrabold text-lg text-white!"
          style={{ color: "white" }}
        >
          Total - ৳{data?.cart?.total}
        </div>
        <button
          onClick={() => (user ? navigate("/checkout") : navigate("/login"))}
          className={`flex items-center space-x-2 font-extrabold group hover:text-primary transition-colors bg-primary px-4 py-1 rounded-md shadow-md  ${
            data?.items?.length < 1 ? "cursor-not-allowed " : "cursor-pointer"
          }`}
          disabled={data?.items?.length < 1}
        >
          <span className="text-white!" style={{ color: "white" }}>
            Next
          </span>
          <span className="text-xl group-hover:translate-x-1 transition-transform text-white">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
