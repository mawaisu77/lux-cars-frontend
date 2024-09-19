import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import image1 from "../../../assets/Vehicle/IMG (54).png";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import useBidHistory from "../../../hooks/useGetBidHistoryByLotId";
import TimeAgo from 'react-timeago'
import CarReportViewer from "./Report";
import VehicleCostCalculator from "./VehicleCostCalculator";

const SingleProductTabs = ({ data }) => {
  
  // const { bidHistory, loading: loadingBidHistory, error:bidHistoryError, fetchBidHistory } = useBidHistory(data.lot_id);

  // useEffect(() => {
  //   if (data.lot_id) {
  //     fetchBidHistory();
  //   }

  // }, [data.lot_id]);

  // const [loading, setLoading] = useState(true);

  // const handleLoad = () => {
  //   setLoading(false);
  // };

  // const renderIAAIView = () => (
    
  //   <div className="flex flex-col items-center justify-center gap-y-4">
  //      {loading && (
  //       <div className="absolute flex items-center justify-center w-full h-52">
  //         <ClipLoader color="#000" loading={loading} size={50} />
  //       </div>
  //     )}
  //     <iframe
  //       src={data.iaai_360}
  //       width="80%"
  //       height="600px"
  //       allowFullScreen
  //       onLoad={handleLoad} 
  //       style={{ display: loading ? "none" : "block" }} 
  //     />
  //   </div>
  // );

  // const renderCopartView = () => (
  //   <div className="flex flex-col justify-center gap-y-4">
  //     <div className="flex justify-center mt-8">
  //       {data.copart_exterior_360.map((image, index) => (
  //         <img key={index} src={image} alt={`Copart Exterior View ${index + 1}`} className="w-full h-auto mb-2" />
  //       ))}
  //       {data.copart_interior_360 && (
  //         <img src={data.copart_interior_360} alt="Copart Interior View" className="w-full h-auto" />
  //       )}
  //     </div>
  //   </div>
  // );



  return (
    <TabGroup className=" w-[1400px] mx-auto mt-20">
      
      <TabPanels className={'bg-[#f8f8f8] px-10 max-w-[1400px] '}>  
      </TabPanels>
    </TabGroup>
  );
};



export default SingleProductTabs;
