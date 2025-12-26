import { Suspense, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getDiscountCountdown,
  getImageUrl,
  isDiscountValid,
} from "../../utils";
import { useGetAllDiscountCategoriesQuery } from "../../redux/features/category/categoryApiSlice";
import "swiper/css";
import "swiper/css/effect-fade";
import ErrorMessage from "../../components/ErrorMessage";

export default function CategoryDiscountSlider() {
  return (
    <Suspense
      fallback={
        <div className="h-[250px] md:h-[300px] flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SliderContent />
    </Suspense>
  );
}

function SliderContent() {
  const {
    data: discountCategories,
    isLoading,
    isError,
    error,
  } = useGetAllDiscountCategoriesQuery();

  if (isLoading) {
    return (
      <div className="h-[250px] md:h-[300px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage message={error?.message || "Something went wrong"} />;
  }

  return (
    <div className="relative w-full h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-xl">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={2000}
        className="h-full"
      >
        {discountCategories?.categories?.map((category) =>
          isDiscountValid(
            category?.discount?.info?.startDate,
            category?.discount?.info?.endDate
          ) ? (
            <SwiperSlide key={category._id}>
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Link to={`/categories/${category._id}`}>
                  {/* Background Image */}
                  <img
                    src={getImageUrl(
                      category.firstProductImage?.image || category.image
                    )}
                    alt={category.name}
                    // priority={index === 0}
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent flex flex-col justify-center px-8 md:px-12">
                    <h3 className="text-primary font-bold text-lg md:text-xl mb-1">
                      {category.discount.info.name}
                    </h3>

                    <h2 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
                      {category.name}
                    </h2>

                    {/* Discounts */}
                    <span className="text-white text-xl md:text-2xl font-bold">
                      Upto{" "}
                      {category.discount.method === "flat"
                        ? `Flat ${category.discount.value} Off`
                        : `${category.discount.value}% Off`}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <TimeOut
                      startDate={category.discount.info.startDate}
                      endDate={category.discount.info.endDate}
                    />
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ) : null
        )}
      </Swiper>
    </div>
  );
}

function TimeOut({ startDate, endDate }) {
  const [countdown, setCountdown] = useState(() =>
    getDiscountCountdown(startDate, endDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getDiscountCountdown(startDate, endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [startDate, endDate]);

  const { days, hours, minutes, seconds, status } = countdown;

  let message;
  if (status === "upcoming")
    message = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  else if (status === "active")
    message = `Ends in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  else message = "Expired";

  return (
    <div className="w-fit flex items-center bg-black/60 rounded-full px-4 py-2">
      <Clock className="h-5 w-5 text-white mr-2" />
      <p className="text-sm md:text-base text-white font-bold">{message}</p>
    </div>
  );
}
