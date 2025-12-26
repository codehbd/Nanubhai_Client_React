import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function CategoryBannerSlider({ images }) {
  return (
    <div className="relative  w-full h-[350px] md:h-[500px] rounded-2xl  overflow-hidden">
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
        {images.map((img) => (
          <SwiperSlide key={img._id}>
            <div className="relative  w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg mx-auto my-6 max-w-[95%]">
              {/* Background Image */}
              <img
                src={img.image}
                alt={img._id}
                // priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-center text-white p-6">
                {/* <h2 className="text-3xl md:text-5xl font-bold mb-3">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl">{slide.subtitle}</p> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
