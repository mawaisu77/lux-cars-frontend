function BuyerFeesListCard({ data}) {
  return (
    <>
      <h2 className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">
        {data.range}
      </h2>
      <h2 className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">
        {data.standard}
      </h2>
    </>
  );
}

export default BuyerFeesListCard;
