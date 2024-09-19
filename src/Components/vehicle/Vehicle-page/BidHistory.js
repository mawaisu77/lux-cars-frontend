import React, { useEffect } from 'react'
import useBidHistory from '../../../hooks/useGetBidHistoryByLotId';
import TimeAgo from 'react-timeago'
import { ClipLoader } from 'react-spinners';

const BidHistory = ({data}) => {
    const { bidHistory, loading: loadingBidHistory, error:bidHistoryError, fetchBidHistory } = useBidHistory(data.lot_id);
    useEffect(() => {
        if (data.lot_id) {
          fetchBidHistory();
        }
    
      }, [data.lot_id]);
    
  return (
    <div className='h-[400px] overflow-y-scroll flex justify-center items-center shadow-md p-[1.5vw] '>
     <div className=''>

      {loadingBidHistory ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="#000" loading={loadingBidHistory} size={50} />
            </div>
          ) : bidHistoryError ? (
            <div className="text-red-500 text-center">
              Error loading bid history. Please try again later.
            </div>
          ) : bidHistory?.data?.length === 0 ? (
            <div className="text-center text-sm lg:text-[0.875vw] text-gray-500">
              No bid history available.
            </div>
          ) : (
            bidHistory?.data && bidHistory?.data
              .sort((a, b) => new Date(b.bid.createdAt) - new Date(a.bid.createdAt))
              .map((item, index) => (
                <div
                  key={index}
                  className="flex shadow-md rounded-lg p-4 mt-1 "
                >
                  <div className="flex items-center">
                    <img
                      className="w-[44px] h-[44px] rounded-lg"
                      src={item.profilePicture}
                      alt="Profile"
                    />
                  </div>
                  <div className="flex justify-between w-full ml-4">
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-[1rem] font-urbanist font-bold">
                          {item.username}
                        </p>
                        <p className="text-[0.9rem] text-gray-500 font-urbanist">
                          <TimeAgo date={item.bid.createdAt} />
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