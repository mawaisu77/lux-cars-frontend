import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import ImageModal from "../../cards/ImageModal";
import { LuxLogoWhite } from "../../../utils/constant";

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
    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
  }}
  modules={[FreeMode, Navigation, Thumbs, Autoplay]}
  className="mySwiper2 w-full h-full"
>
  {images &&
    images.map((image, index) => (
      <SwiperSlide key={index} className="w-full">
        <div className="relative w-full h-[40vw">
          <img
            src={image}
            className="my-2 rounded-lg w-full h-full bg-green-400 object-fill shadow-img cursor-pointer"
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
            <SwiperSlide key={index}>
              <div className="relative w-full h-[10vw]">
                <img
                  src={image}
                  className="rounded-lg w-full h-full object-cover"
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>

        
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
        logo={LuxLogoWhite}
      />
    </div>
  )
};

export default SwiperGallery;
