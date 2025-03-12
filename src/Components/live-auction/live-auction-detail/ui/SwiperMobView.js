import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";


const SwiperMobView = ({ images, carData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="mb-2">
      <div className="relative">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="mySwiper2 h-[70vw] mb-2"
        >
          {images &&
            images.map((image, index) => (
              <SwiperSlide key={index} className="h-full">
                <div className="relative h-full">
                  <img
                    src={image}
                    className="my-2 h-full w-full object-cover rounded-lg shadow-img cursor-pointer"
                    alt={`Vehicle_Image ${index + 1}`}
                    // onClick={() => openModalImg(index)} 
                  />

                  <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black via-black opacity-100 rounded-b-lg"></div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper h-[20vw]"
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index} className="h-full">
              <img
                src={image}
                className="rounded-lg w-full h-full object-cover"
                alt={`Thumbnail ${index + 1}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
  

  

    </div>
  )
};

export default SwiperMobView
