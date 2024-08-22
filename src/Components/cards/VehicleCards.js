import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSimilarCars from "../../hooks/useSimilarCars";
import "./swiperstyles.css";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { ClipLoader } from "react-spinners";

const VehicleCards = React.memo(({carData}) => {
  const { cars, loading, error } = useSimilarCars(carData.year, carData.make);

  console.log("ethy ne cars", cars)
  return (
    <div className="h-[784px] relative lg:h-[90vh] w-full lg:w-[98.9vw] mt-[5vh]  ">
    {/* //add loading */}
    {loading ? (
      <div className="flex justify-center items-center h-full">
        <ClipLoader />
        </div>
    ) : error ? (
      <div className="flex justify-center items-center h-full">
      <p className="text-red-500">{error}</p>
    </div>
    ) : (
      <div className="relative ">
      <Swiper
        style={{
          "--swiper-pagination-color": "#FFBA08",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "16px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        slidesPerView={1}
        spaceBetween={80}
        breakpoints={{
          640: { slidesPerView: 1 },
          740: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        scrollbar={{ draggable: true }}
        loop={true}
        navigation={{
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            if (index < 4) {
              return `<span class="${className}"></span>`;
            }
            return "";
          },
        }}
         modules={[Navigation, Pagination]}
        className="w-full lg:w-[72vw] h-[550px] lg:h-[66vh] mt-[40px]"
      >
        {cars && cars?.data?.cars?.map((card, index) => (
          <SwiperSlide className=" relative w-[370px]">
            <div
              key={index}
              className="w-[327px] bg-white mx-auto lg:w-[17.3vw]  rounded-xl shadow-lg"
            >
              <div className="p-5 lg:p-[1vw]">
                <img
                  className="w-[290px]  lg:w-[15.8vw] h-[290px] lg:h-[31.2vh]"
                  src={card.image}
                  alt="Car_img"
                />
              </div>

              <div>
                        <div className="flex justify-between px-5 lg:px-[1vw] font-urbanist text-[18px] lg:text-[1.17vw] font-bold py-2 leading-[3vh] text-left">
                          {card.title.length > 20 ? `${card.title.slice(0, 20)}...` : card.title}
          
                        </div>
                        <div>
                          <div className="flex px-5 pb-[1vh]  ">
                            <div className="flex justify-between items-center   w-full">
                              <div className="flex flex-col">
                                <div className="flex gap-x-1">
                                  <p className="py-[0.5vh] font-semibold">
                                    Lot:
                                  </p>
                                  <p className="py-[0.5vh]">{card.lot_id}</p>
                                </div>
                                <div className="flex gap-x-1">
                                  <p className="py-[0.5vh] font-semibold">
                                    Status:
                                  </p>
                                  <p className="py-[0.5vh]">{card.status}</p>
                                </div>
                                <div className="flex gap-x-1 flex-n">
                                  <p className="py-[0.5vh] font-semibold">
                                    Location:
                                  </p>
                                  <p className="py-[0.5vh] text-nowrap">
                                    {card.location}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link to={`/vehicle-detail/${card.lot_id}`}>
                          <button className=" w-[270px] mb-[1vh] lg:w-[15vw]  rounded-xl h-[40px] lg:h-[5.5vh] text-[16px] lg:text-[1.04vw] bg-[#7a798a] text-white font-urbanist mt-3 hover:bg-[#ca0000] duration-200">
                            Bid Now
                          </button>
                          </Link>
                        </div>
                      </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="arrow-left arrow">
          <IoIosArrowDropleft
            size={35}
            className="text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150"
          />
        </button>
        <button className="arrow-right arrow ">
          <IoIosArrowDropright
            size={35}
            className="text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150"
          />
        </button>
    </div>
    )}
    
    
    </div>
  );
});

export default VehicleCards;
