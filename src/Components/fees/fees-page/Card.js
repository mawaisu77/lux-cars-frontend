import { PiUsersFill } from "react-icons/pi";
// export feesLeftCard from "../"
// heading ,icon
function Card({ data}) {
  return (
    <>
      <div className="rounded-[8px] md:rounded-[0.938vw] flex items-center w-[45%] md:w-[13vw] w-[45%] lg:w-[10.292vw] h-[170px] shadow ">
        <div className="mx-[1.1vw]  ">
          <div className="h-[8vh]  md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
            {/* <PiUsersFill size={25} className="mx-auto" /> */}
            {data.icon}
          </div>
          <h2 className="text-[16px] md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
           {data.heading}
          </h2>
        </div>
      </div>
    </>
  );
}

export default Card;
