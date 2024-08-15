import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ImageViewer from "react-simple-image-viewer";

const SwiperGallery = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openImageViewer = (index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };
  return (
    <div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images && images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={image}
                className="my-2 rounded-lg shadow-img cursor-pointer"
                alt={`Vehicle_Image ${index + 1}`}
                onClick={() => openImageViewer(index)}

              />
              <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-black via-black opacity-100 rounded-b-lg"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images && images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              className="rounded-lg"
              alt={`Thumbnail ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {isViewerOpen && (
        <ImageViewer
          src={images}
          currentIndex={currentImage}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};

export default SwiperGallery;
