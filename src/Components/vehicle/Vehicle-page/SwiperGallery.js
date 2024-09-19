import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import ImageViewer from "react-simple-image-viewer";
import Modal from "./Modal360";
import { ClipLoader } from "react-spinners";
import ReactPlayer from 'react-player'
import VideoModal from "./ModalVideo";
import ReactDOM from "react-dom";

const SwiperGallery = ({ images, carData }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); // State to manage modal visibility
  const [loading, setLoading] = useState(true); // For loading spinner


  const openImageViewer = (index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };
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
  const handleLoad = () => {
    setLoading(false);
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
        onLoad={() => setLoading(false)} // Set loading to false when iframe is fully rendered
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
        {!isViewerOpen && (
        <>
           <button
           className="absolute z-10 bottom-5 text-xs right-4 bg-black text-white py-1 px-2 rounded-lg"
           onClick={openModal} 
 
         >
           360° View
         </button>
       { carData.video && <button
           className="absolute z-10 bottom-5 text-xs right-28 bg-black text-white py-1 px-2 rounded-lg"
           onClick={openVideoModal} 
 
         >
           Video
         </button>}
         <div
           className="absolute z-10 bottom-5 w-28 text-sm left-3 rounded-lg"
         >
            <img
              src={"https://res.cloudinary.com/dqe7trput/image/upload/v1724846628/Horizontal_-_White0_2_haq83u.svg"}
              className="my-2 rounded-lg shadow-img cursor-pointer"
              alt={`Vehicle_Image`}
             />
           
         </div>
           </>
      )}
     

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
          className="mySwiper2 "
        >
          {images &&
            images.map((image, index) => (
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
      </div>

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
        {images &&
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                className="rounded-lg"
                alt={`Thumbnail ${index + 1}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {isViewerOpen && ReactDOM.createPortal(
          <ImageViewer
          backgroundStyle={{
            zIndex:50,
           }}
            disableScroll={false}
            src={images}
            currentIndex={currentImage}
            onClose={closeImageViewer}
          />,
          document.body // Render in the root of the DOM
        )}

      {/* Modal for 360° View */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {carData.base_site === "iaai" && carData.iaai_360 && renderIAAIView()}
        {carData.base_site === "copart" &&
          (carData.copart_exterior_360.length > 0 ||
            carData.copart_interior_360) &&
          renderCopartView()}
      </Modal>

        {/* Modal for Video View */}
      <VideoModal isOpen={isVideoModalOpen} onClose={closeVideoModal}>
       <ReactPlayer url={carData?.video} controls={true} width={'90%'} height={'100%'}  config={{ file: { attributes: { preload: 'auto' } } }} 

       />
      </VideoModal>
    </div>
  )
};

export default SwiperGallery;
