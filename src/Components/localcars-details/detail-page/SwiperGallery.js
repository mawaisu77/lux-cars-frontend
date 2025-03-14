import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import ImageModal from "../../cards/ImageModal";
import { LuxLogoWhite } from "../../../utils/constant";
import bidcaribbeanLogo from "../../../assets/lux-logo/logo-tag.png";
const SwiperGallery = ({ images, carData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Open modal with selected image
  const openModalImg = (index) => {
    setCurrentImageIndex(index);
    setImageModalOpen(true);
  };
  // Close modal
  const closeModalImg = () => {
    setImageModalOpen(false);
  };
  // Go to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  // Go to the previous image
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="">
      <div className="relative ">
        <div className="absolute  z-10 bottom-0 w-36 lg:w-[15vw] rounded-lg">
          <img
            src={bidcaribbeanLogo}
            className="my-2 rounded-lg shadow-img cursor-pointer"
            alt={`Vehicle_Image`}
          />
        </div>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          className="mySwiper2 "
        >
          {images &&
            images.map((image, index) => (
              <SwiperSlide key={index} className="w-full">
                <div className="relative h-[300px] lg:h-[30vw]">
                  <img
                    src={image}
                    className="w-full h-full  object-cover rounded-lg shadow-img cursor-pointer"
                    alt={`Vehicle_Image ${index + 1}`}
                    onClick={() => openModalImg(index)} // Open modal on image click
                  />
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
        className="mySwiper mt-2"
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute z-10 bottom-[2px] lg:bottom-[0.2vw] w-16 lg:w-[5vw] rounded-lg">
                <img
                  src={bidcaribbeanLogo}
                  className=""
                  alt={`Vehicle_Image`}
                />
              </div>
              <img
                src={image}
                className="rounded-lg lg:rounded-[0.5vw] h-[80px] sm:h-[100px] lg:h-[7vw] "
                alt={`Thumbnail ${index + 1}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeModalImg}
        images={images}
        currentImageIndex={currentImageIndex}
        goToPrevImage={goToPrevImage}
        goToNextImage={goToNextImage}
        logo={bidcaribbeanLogo}
      />
    </div>
  );
};

export default SwiperGallery;
