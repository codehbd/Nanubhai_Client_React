import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  useChangeQuantityCartMutation,
  useDeleteCartMutation,
} from "../../../redux/features/cart/cartApiSlice";
import { getImageUrl } from "../../../utils";
import { Link } from "react-router-dom";

export default function CartItem({ item }) {
  const [changeQuantityCart] = useChangeQuantityCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const updateQuantity = async (type, itemId) => {
    try {
      await changeQuantityCart({ id: itemId, bodyData: { type } }).unwrap();
      // const userId = user?._id ?? "";
      // const { cart, items } = await getCarts(userId);
      // dispatch(setCart({ cart, items }));
    } catch (error) {
      toast.error(error?.message || "Failed to change cart quantity!");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await deleteCart(itemId).unwrap();
      // const userId = user?._id ?? "";
      // const { cart, items } = await getCarts(userId);
      // dispatch(setCart({ cart, items }));
    } catch (error) {
      toast.error(error?.message || "Failed to remove from cart!");
    }
  };
  return (
    <div key={item?.productId} className="p-4 flex items-start relative">
      {/* Product Image */}
      <div className="w-24 h-24 relative rounded-md overflow-hidden shrink-0">
        {(item?.varient?.image || item?.image) && (
          <img
            src={getImageUrl(item?.varient?.image || item?.image)}
            alt={item?.name}
            className="object-cover"
            sizes="96px"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="ml-4 grow pr-10">
        <div className="flex justify-between">
          <Link
            to={`/products/${item?.productId}`}
            className="font-extrabold text-black hover:text-blue-300 text-base md:text-lg "
            style={{ color: "black" }}
          >
            {item?.name}
            {item?.varient && (
              <span className="ml-1 text-xs text-gray-500">
                ({item?.varient?.sku})
              </span>
            )}
          </Link>{" "}
        </div>
        <p className="text-base md:text-lg font-extrabold text-black mt-2">
          <span className="flex items-center gap-2">
            {/* Unit Price × Quantity */}
            <span>৳{item?.price}</span>
            <span className="text-gray-400 text-sm font-medium">×</span>
            <span>{item?.quantity}</span>
            <span>=</span>

            {/* Final Price */}
            <span className="text-black font-extrabold">৳{item?.final}</span>

            {/* Original Price (strikethrough) */}
            {item?.original > item?.final && (
              <span className="line-through text-gray-500 text-sm">
                ৳{item?.original}
              </span>
            )}
          </span>

          {/* Extra Price (optional) */}
          {item?.extraPrice > 0 && (
            <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">
              <span className="text-[13px] font-semibold">
                +৳{item.extraPrice}
              </span>
              <span className="opacity-80">(Extra)</span>
            </div>
          )}
        </p>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Quantity Controls */}
          <div className="flex items-center mt-4">
            <button
              onClick={() => updateQuantity("DEC", item?._id)}
              className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center bg-gray-200 rounded-md transition-colors cursor-pointer"
            >
              <span
                className="text-black text-lg md:text-xl font-extrabold "
                style={{ color: "black" }}
              >
                −
              </span>
            </button>
            <div className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center bg-black text-white mx-2">
              {item?.quantity}
            </div>
            <button
              onClick={() => updateQuantity("INC", item?._id)}
              className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center bg-gray-200 rounded-md transition-colors cursor-pointer"
            >
              <span
                className="text-black text-xl font-extrabold "
                style={{ color: "black" }}
              >
                +
              </span>
            </button>
          </div>
          {item?.applied?.length > 0 && (
            <div className="border border-green-600 bg-green-50 rounded-md p-1 md:p-2 mt-4 max-w-xs">
              {item?.applied.map((apply, idx) => (
                <p key={idx} className="text-xs text-green-600 font-bold">
                  * {apply}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Button - Positioned absolutely to avoid overlapping */}
      <button
        onClick={() => removeFromCart(item?._id)}
        className="text-gray-700 hover:text-red-500 absolute top-4 right-4 transition-colors cursor-pointer"
        aria-label="Remove item"
      >
        <Trash2 className="h-6 w-6" />
      </button>
    </div>
  );
}
