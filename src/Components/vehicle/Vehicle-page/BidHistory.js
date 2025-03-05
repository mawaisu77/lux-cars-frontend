import React, { useEffect } from 'react'
import useBidHistory from '../../../hooks/useGetBidHistoryByLotId';
import TimeAgo from 'react-timeago'
import { ClipLoader } from 'react-spinners';
import avatar from "../../../assets/avatar1.png";

const BidHistory = ({data}) => {
    const { bidHistory, loading: loadingBidHistory, error:bidHistoryError, fetchBidHistory } = useBidHistory(data.lot_id);
    useEffect(() => {
        if (data.lot_id) {
          fetchBidHistory();
        }
    
      }, [data.lot_id]);
    
  return (
    <div className='bg-white flex justify-center items-center shadow-sm'>
     <div className='w-full h-[400px] overflow-y-scroll p-2'>

      {loadingBidHistory ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="#000" loading={loadingBidHistory} size={50} />
            </div>
          ) : bidHistoryError ? (
            <div className="text-red-500 text-center">
              Error loading bid history. Please try again later.
            </div>
          ) : bidHistory?.data?.length === 0 ? (
            <div className="bg-white h-full flex justify-center items-center text-center text-sm lg:text-[0.875vw] text-gray-500">
              No bid history available.
            </div>
          ) : (
            bidHistory?.data && bidHistory?.data
              .sort((a, b) => new Date(b.bid.createdAt) - new Date(a.bid.createdAt))
              .map((item, index) => (
                <div
                  key={index}
                  className="flex w-full items-center shadow-md rounded-lg p-4 mt-1 "
                >
                  <div className="flex items-center w-[44px] h-[44px]">
                    <img
                      className=" rounded-lg w-full h-full object-cover"
                      src={item?.profilePicture ? item?.profilePicture  : avatar}
                      alt="Profile"
                    />
                  </div>
                  <div className="flex justify-between w-full ml-4">
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                       <div className='text-[1rem] font-urbanist font-semibold flex items-center gap-x-2 lg:gap-x-[0.5vw]'>
                       <span>
                          User: 
                        </span>
                        <p className="">
                          {item?.bid?.userID?.substring(0, 8)}
                        </p>
                       </div>
                        <p className="text-[0.9rem] text-gray-500 font-urbanist">
                          <TimeAgo date={item?.bid?.createdAt} />
                        </p>
                      </div>
                      <p
                        className={`text-[0.9rem] ${
                          item.bid.isValid ? 'text-green-600' : 'text-red-600'
                        } font-urbanist`}
                      >
                        {item.bid.isValid ? 'Active' : 'Expired'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p
                        className={`text-[1rem] font-urbanist font-bold ${
                          item.bid.isValid ? 'text-black' : 'text-gray-500'
                        }`}
                      >
                        ${item.bid.bidPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))
          )}
    </div>
    </div>

  )
}

export default BidHistory