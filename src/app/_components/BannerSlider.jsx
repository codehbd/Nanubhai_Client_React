import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "/images/best_selling.jpg",
    alt: "First Slide",
    title: "Best Selling",
    subtitle: "Shop our most popular products",
    link: "/products?type=best-selling",
  },
  {
    id: 2,
    image: "/images/new_arrival.jpg",
    alt: "Second Slide",
    title: "New Arrivals",
    subtitle: "Explore the latest trends in store",
    link: "/products?type=new",
  },
  {
    id: 3,
    image: "/images/top_rated.jpg",
    alt: "Third Slide",
    title: "Top Rated",
    subtitle: "See what our customers love most",
    link: "/products?type=top-rated",
  },
  {
    id: 4,
    image: "/images/featured.jpg",
    alt: "Fourth Slide",
    title: "Featured",
    subtitle: "Handpicked items just for you",
    link: "/products?type=featured",
  },
];

export default function BannerSlider() {
  return (
    <div className="relative w-full h-[350px] md:h-[500px] rounded-2xl  overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        speed={2000}
        slidesPerView={"auto"}
        freeMode={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg mx-auto my-6 max-w-[95%]">
              {/* Background Image */}
              <Link to={slide.link}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  //  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                {/* Overlay with Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-center text-white p-6">
                  <h2 className="text-3xl md:text-5xl font-bold mb-3">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl">{slide.subtitle}</p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
