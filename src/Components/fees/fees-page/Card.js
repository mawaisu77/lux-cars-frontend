import { PiUsersFill } from "react-icons/pi";
// export feesLeftCard from "../"
// heading ,icon
function Card({ data}) {
  return (
    <>
      <div className="rounded-[15px] md:rounded-[0.938vw] flex items-center w-[48%]  lg:w-[10vw] w-[45%] md:h-[20vh] lg:h-[24.5vh] md:w-[13.5vw] lg:w-[10.292vw] h-[170px] shadow ">
        <div className="mx-[1.1vw]  ">
          <div className="md:w-[5vw] md:h-[7vh] lg:h-[8vh] h-[50px] w-[50px]  md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[15px] md:rounded-[0.938vw] flex items-center mx-auto mb-[0.781vh]">
            {/* <PiUsersFill size={25} className="mx-auto" /> */}
            {data.icon}
          </div>
          <h2 className="text-[16px]  md:text-[1.1vw]   lg:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
           {data.heading}
          </h2>
        </div>
      </div>
    </>
  );
}

export default Card;
