import { HandCoins, Heart, ShoppingCart } from "lucide-react";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import Rating from "./Rating";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateDiscountedPrice,
  getImageUrl,
  getOrCreateGuestId,
  isDiscountValid,
} from "../../../utils";
import { addWishlistItem } from "../../../redux/features/wishlist/wishlistSlice";
import { useAddToCartMutation } from "../../../redux/features/cart/cartApiSlice";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductDetailCard({ product }) {
  const [addToCart] = useAddToCartMutation();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Final price depending on variant
  const { finalPrice, originalPrice } = useMemo(() => {
    const priceToUse = selectedVariant?.price ?? product.price;
    return calculateDiscountedPrice(product, priceToUse);
  }, [product, selectedVariant]);

  // Quantity handlers
  const increaseQuantity = () => setQuantity((q) => q + 1);
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : q));

  // Cart & buy handlers
  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        varientId: selectedVariant?._id || "",
        quantity,
        guestId: getOrCreateGuestId(),
        userId: user?._id ?? "",
        image: selectedVariant?.image || product.images[0]?.image,
      }).unwrap();
      toast.success("Product added to cart");
      setQuantity(1);
    } catch (error) {
      toast.error(error?.message || "Failed to add to cart");
    }
  };

  const handleBuy = async () => {
    try {
      await addToCart({
        productId: product._id,
        varientId: selectedVariant?._id || "",
        quantity,
        guestId: getOrCreateGuestId(),
        userId: user?._id ?? "",
        image: selectedVariant?.image || product.images[0]?.image,
      }).unwrap();
      toast.success("Product added to cart");
      navigate("/cart");
    } catch (error) {
      toast.error(error?.message || "Failed to add to cart");
    }
  };

  // Wishlist handler
  const handleAddWishlist = () => {
    dispatch(
      addWishlistItem({
        productId: product._id,
        varientId: selectedVariant?._id ?? "",
        image: selectedVariant?.image || product.images[0]?.image,
        name: product.name,
        price: selectedVariant?.price ?? product.price,
      })
    );
    toast.success("Product added to wishlist");
  };

  const handleVarient = (variant) => {
    setSelectedVariant(variant);
    setCurrentImageIndex(0);
  };

  const handleSlideCurrentImage = (index) => {
    setCurrentImageIndex(index);
    setSelectedVariant(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
            {/* Discount Badge */}
            {product?.discount &&
            isDiscountValid(
              product?.discount?.info?.startDate,
              product?.discount?.info?.endDate
            ) ? (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow z-10">
                {product?.discount?.method === "bogo"
                  ? `Buy ${product?.discount?.info?.minQty} Get ${product?.discount?.value}`
                  : product?.discount?.method === "percentage"
                  ? `-${product?.discount?.value}% Off`
                  : `৳${product?.discount?.value} Off`}
              </span>
            ) : null}

            {/* Wishlist Button */}
            <button
              onClick={handleAddWishlist}
              title="Add to Wishlist"
              className="absolute top-3 right-3 bg-black/70 hover:bg-black p-2 rounded-full cursor-pointer z-10 transition"
            >
              <Heart className="h-5 w-5 text-white" strokeWidth={2} />
            </button>

            {/* Main Image */}
            {/* <img
              src={
                selectedVariant?.image
                  ? getImageUrl(selectedVariant.image)
                  : product.images[currentImageIndex]
                  ? getImageUrl(product.images[currentImageIndex].image)
                  : ""
              }
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            /> */}
            {/* Main Image Slider */}
<Swiper
  modules={[Autoplay, Navigation, Pagination]}
  autoplay={{
    delay: 3000,
    disableOnInteraction: true,
  }}
  loop
  grabCursor={true}
  slidesPerView={1}
  touchRatio={1}
  touchAngle={45}
  navigation={true}
  pagination={{ clickable: true }}
  onSlideChange={(swiper) => setCurrentImageIndex(swiper.realIndex)}
  className="w-full h-full"
>
  {(selectedVariant?.image
    ? [{ image: selectedVariant.image }]
    : product.images
  ).map((img, index) => (
    <SwiperSlide key={index}>
      <img
        src={getImageUrl(img.image)}
        alt={product.name}
        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
      />
    </SwiperSlide>
  ))}
</Swiper>

          </div>

          {/* Image Thumbnails */}
          <div className="hidden md:flex justify-center flex-wrap gap-2">
            {product.images.map((imgVal, index) => (
              <button
                key={imgVal._id}
                onClick={() => handleSlideCurrentImage(index)}
                className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                  index === currentImageIndex
                    ? "border-primary scale-105"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={getImageUrl(imgVal.image)}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* Mobile Image Thumbnails Slider */}
          <div className="md:hidden w-full">
            <Swiper
              slidesPerView="auto"
              spaceBetween={8}
              grabCursor={true}
              className="w-full"
            >
              {product.images.map((imgVal, index) => (
                <SwiperSlide key={imgVal._id} style={{ width: "auto" }}>
                  <button
                    onClick={() => handleSlideCurrentImage(index)}
                    className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex
                        ? "border-primary scale-105"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={getImageUrl(imgVal.image)}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <h1 className="text-2xl text-black font-extrabold mb-2">
            {product.name}
          </h1>
          <div className="mb-2 flex items-center gap-x-2">
            <Rating rating={product?.rating} />
            {(selectedVariant?.stock ?? product.stock) === 0 ? (
              <span className="text-sm font-medium text-red-600">
                Out Of Stock
              </span>
            ) : (
              <span className="text-sm font-medium text-green-600">
                In Stock ({selectedVariant?.stock ?? product.stock})
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="flex justify-between items-center">
            <div className="flex items-center mb-2">
              <span className="text-xl font-bold text-black">
                ৳ {finalPrice}
              </span>
              {finalPrice < originalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ৳ {originalPrice}
                </span>
              )}
            </div>
            {product.extraPrice && (
              <span className="flex items-center text-gray-500">
                <HandCoins size={20} className="mr-1" /> + ৳{" "}
                {product.extraPrice}
              </span>
            )}
          </div>

          {/* Variant Selection */}
          {product.varients?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-base font-extrabold text-black mb-2">
                Choose Variant
              </h3>
              {/* Desktop View - Flex */}
              <div className="hidden md:flex gap-3 flex-wrap">
                {product.varients.map((variant) => (
                  <button
                    key={variant._id}
                    onClick={() => handleVarient(variant)}
                    className={`p-1 border rounded-md flex flex-col items-center transition-all ${
                      selectedVariant?._id === variant._id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={getImageUrl(variant.image)}
                      alt={variant.sku}
                      className="w-[50px] h-[50px] object-cover rounded"
                    />
                    <span className="text-xs mt-1 text-gray-800">
                      ৳ {variant.price}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {variant.stock > 0
                        ? `In Stock (${variant.stock})`
                        : "Out of Stock"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Mobile View - Slider */}
              <div className="md:hidden overflow-hidden">
                <Swiper
                  slidesPerView={1.5}
                  spaceBetween={12}
                  grabCursor={true}
                  className="w-full"
                >
                  {product.varients.map((variant) => (
                    <SwiperSlide key={variant._id}>
                      <button
                        onClick={() => handleVarient(variant)}
                        className={`p-2 border rounded-md flex flex-col items-center transition-all w-full ${
                          selectedVariant?._id === variant._id
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300"
                        }`}
                      >
                        <img
                          src={getImageUrl(variant.image)}
                          alt={variant.sku}
                          className="w-[60px] h-[60px] object-cover rounded"
                        />
                        <span className="text-xs mt-2 text-gray-800 font-medium">
                          ৳ {variant.price}
                        </span>
                        <span className="text-[10px] text-gray-500 mt-1">
                          {variant.stock > 0
                            ? `In Stock (${variant.stock})`
                            : "Out of Stock"}
                        </span>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-4">
            <h3 className="text-base text-black font-extrabold mb-2">
              Quantity
            </h3>
            <div className="flex items-center">
              <button
                onClick={decreaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-l-md bg-gray-200 hover:bg-gray-300 border border-gray-300"
              >
                <span className="text-lg font-bold text-black">-</span>
              </button>
              <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white text-black">
                {quantity}
              </div>
              <button
                onClick={increaseQuantity}
                className="w-8 h-8 flex items-center justify-center rounded-r-md bg-gray-200 hover:bg-gray-300 border border-gray-300"
              >
                <span className="text-lg font-bold text-black">+</span>
              </button>
            </div>
          </div>

          {/* Cart / Buy */}
          <div className="flex justify-center gap-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="w-3/5 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
              <span className="bg-white rounded-full w-4 h-4 flex items-center justify-center ml-1.5 font-bold text-[9px] text-black">
                {quantity}
              </span>
            </button>
            <button
              onClick={handleBuy}
              className="w-3/5 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center"
            >
              Buy Now
            </button>
          </div>

          {/* Category */}
          <h4 className="text-xs font-medium text-gray-500 mb-2">
            {product?.category[0]?.name}
          </h4>

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-base font-extrabold mb-3 text-black">
              Product Description
            </h3>
            <p className="text-sm font-medium text-black leading-6">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
