import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import Modal from "./Modal360";
import { ClipLoader } from "react-spinners";
import ReactPlayer from "react-player";
import VideoModal from "./ModalVideo";
import ImageModal from "../../cards/ImageModal";
import { LuxLogoWhite } from "../../../utils/constant";
import { vehicleScoreColors } from "./VehicleScoreColor";
import bidcaribbeansLogo from "../../../assets/lux-logo/logo-tag.png";

const SwiperGallery = ({ images, carData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };
  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

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
  const renderIAAIView = () => (
    <div className="flex flex-col items-center justify-center gap-y-4">
      {loading && (
        <div className="absolute flex items-center justify-center w-full h-52">
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      )}
      <iframe
        title="car"
        src={carData.iaai_360}
        width="80%"
        height="600px"
        onLoad={() => setLoading(false)}
        allowFullScreen
        style={{ display: loading ? "none" : "block" }}
      />
    </div>
  );

  const renderCopartView = () => (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex justify-center mt-8">
        {carData.copart_exterior_360.map((image, index) => (
          <img
            key={index}
            src={image}
            onLoad={() => setLoading(false)} // Set loading to false when iframe is fully rendered
            alt={`Copart Exterior View ${index + 1}`}
            className="w-full h-auto mb-2"
          />
        ))}
        {carData.copart_interior_360 && (
          <img
            src={carData.copart_interior_360}
            alt="Copart Interior View"
            onLoad={() => setLoading(false)} // Set loading to false when iframe is fully rendered
            className="w-full h-auto"
          />
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="relative">
        <>
          {carData?.vehicle_score && (
            <div
              className={`absolute flex gap-x-1 items-center z-10 text-[14px] top-5 text-xs left-4 bg-black text-white py-2 px-4 rounded-lg ${vehicleScoreColors(carData?.vehicle_score?.split("/")[0])}`}
              onClick={openModal}
            >
              Vehicle Score:
              <span className="font-bold text-[15px]">
                {carData?.vehicle_score}
              </span>
            </div>
          )}

          <button
            className="absolute z-10 bottom-5 lg:bottom-[1.25vw] text-xs right-4 lg:right-[1vw] lg:leading-[1.5vw] bg-black text-white lg:text-[1vw] py-1 lg:py-[0.25vw] lg:px-[0.5vw] px-2 rounded-lg lg:rounded-[0.5vw]"
            onClick={openModal}
          >
            360° View
          </button>
          {carData.video && (
            <button
              className="absolute z-10 bottom-5 lg:bottom-[1.25vw] text-xs right-28 lg:right-[7vw] bg-black text-white lg:text-[1vw] lg:leading-[1.5vw] py-1 lg:py-[0.25vw] lg:px-[0.5vw] px-2 rounded-lg lg:rounded-[0.5vw]"
              onClick={openVideoModal}
            >
              Video
            </button>
          )}
          <div className="absolute  z-10 bottom-2 w-36 lg:w-[15vw] rounded-lg">
            <img
              src={bidcaribbeansLogo}
              className="my-2 rounded-lg shadow-img cursor-pointer"
              alt={`Vehicle_Image`}
            />
          </div>
        </>

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
              <SwiperSlide key={index}  className="w-full">
                <div className="relative h-[300px] lg:h-[30vw]">
                  <img
                    src={image}
                    className="w-full h-full  object-cover rounded-lg shadow-img cursor-pointer"
                    alt={`Vehicle_Image ${index + 1}`}
                    onClick={() => openModalImg(index)} // Open modal on image click
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
        className="mySwiper mt-2 lg:mt-[1vw]"
      >
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index} className="relative">

           <div className="absolute z-10 bottom-[2px] lg:bottom-[0.2vw] w-16 lg:w-[5vw] rounded-lg">
            <img
              src={bidcaribbeansLogo}
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

      {/* Modal for 360° View */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {carData?.base_site === "iaai" && carData?.iaai_360 && renderIAAIView()}
        {carData?.base_site === "copart" &&
          (carData?.copart_exterior_360?.length > 0 ||
            carData?.copart_interior_360) &&
          renderCopartView()}
      </Modal>

      {/* Modal for Video View */}
      <VideoModal isOpen={isVideoModalOpen} onClose={closeVideoModal}>
        <ReactPlayer
          url={carData?.video}
          controls={true}
          width={"90%"}
          height={"100%"}
          config={{ file: { attributes: { preload: "auto" } } }}
        />
      </VideoModal>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={closeModalImg}
        images={images}
        currentImageIndex={currentImageIndex}
        goToPrevImage={goToPrevImage}
        goToNextImage={goToNextImage}
        logo={bidcaribbeansLogo}
      />
    </div>
  );
};

export default SwiperGallery;
