import AddToCartButton from "../../../components/button/AddToCartButton";
import {
  calculateDiscountedPrice,
  getImageUrl,
  isDiscountValid,
} from "../../../utils";
import Rating from "./Rating";
import { HandCoins, Heart } from "lucide-react";
import { addWishlistItem } from "../../../redux/features/wishlist/wishlistSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ProductCard({ product, index }) {
  const { finalPrice, originalPrice } = calculateDiscountedPrice(
    product,
    product.price
  );
  const dispatch = useDispatch();

  const handleAddWishlist = () => {
    dispatch(
      addWishlistItem({
        productId: product._id,
        varientId: "",
        image: product?.images?.[0]?.image,
        name: product?.name,
        price: product?.price,
      })
    );
    toast.success("Product added to wishlist");
  };

  return (
    <article
      className="bg-white z-[10] rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full animate-fadeIn"
      style={{
        animation: `fadeIn 0.5s ease-out ${0.1 * index}s both`,
      }}
    >
      {/* Product Image with Discount Badge and Wishlist */}
      <figure className="relative aspect-[4/3] overflow-hidden">
        <Link to={`/products/${product?._id}`}>
          <img
            src={
              product?.images?.length > 0
                ? getImageUrl(product?.images[0]?.image)
                : "/placeholder.jpg"
            }
            alt={product?.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
        {/* Discount Badge */}
        {Object.keys(product?.discount || {}).length > 0 &&
          isDiscountValid(
            product?.discount?.info?.startDate,
            product?.discount?.info?.endDate
          ) && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
              {product?.discount?.method === "bogo"
                ? `Buy ${product?.discount?.info?.minQty} Get ${product?.discount?.value}`
                : product?.discount?.method === "percentage"
                ? `-${product?.discount?.value}% Off`
                : `৳${product?.discount?.value} Off`}
            </span>
          )}

        {/* ❤️ Wishlist Button (Top-right corner) */}
        <button
          onClick={handleAddWishlist}
          title="Add to Wishlist"
          className="absolute top-2 right-2 bg-black/70 p-2 rounded-full hover:bg-black transition-colors"
        >
          <Heart className="h-5 w-5 text-white" strokeWidth={2} />
        </button>
      </figure>

      {/* Product Details */}
      <div className="p-3 flex flex-col grow">
        <h4 className="text-xs font-medium text-gray-500 mb-1">
          {product?.category?.[0]?.name}
        </h4>

        <Link to={`/products/${product?._id}`}>
          <h3
            className="text-sm font-bold mb-1 line-clamp-2 text-black hover:text-blue-800"
            title={product?.name}
          >
            {product?.name}
          </h3>
        </Link>

        <Rating rating={product?.rating} />

        {product?.freeDelivery && (
          <span className="text-[10px] text-green-600 font-medium mb-1">
            Free Shipping
          </span>
        )}

        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-black">
                ৳ {finalPrice}
              </span>
              {product?.previousPrice && product.previousPrice > finalPrice && (
                <span className="text-xs text-gray-500 line-through">
                  ৳ {product.previousPrice}
                </span>
              )}
            </div>

            {product?.extraPrice && (
              <span className="flex items-center gap-1 text-gray-500 text-sm">
                <HandCoins size={18} />+ ৳{product?.extraPrice}
              </span>
            )}
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
