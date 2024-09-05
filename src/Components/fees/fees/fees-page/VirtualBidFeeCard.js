function VirtualBidFeeCard({ data }) {
  return (
    <>
      <h2 className=" text-left text-[13px]   md:text-[0.938vw] w-[42%]  md:w-[60vw]  font-[500] text-[#7A798A] font-urbanist">
        {data.range}
      </h2>
      <div className="hidden  md:flex justify-between   md:w-[40vw]">
        <h2 className="text-left text-[13px]  md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">
          {data.PreBidFee}
        </h2>
        <h2 className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">
          {data.standard}
        </h2>
      </div>
      <h2 className="text-center   md:hidden   text-[13px] w-[15%]  md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">
        {data.PreBidFee}
      </h2>
      <h2 className="text-right md:hidden  text-[13px]  w-[45%]  md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">
        {data.standard}
      </h2>
    </>
  );
}

export default VirtualBidFeeCard;
