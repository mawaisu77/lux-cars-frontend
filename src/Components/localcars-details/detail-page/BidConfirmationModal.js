import React from 'react';
import { ClipLoader } from 'react-spinners';

const BidConfirmationModal = ({ isOpen, onClose, onBidPlace, isLoading }) => {

  return (
   
    <dialog id="local_bid_modal" className="modal">
    <div className="modal-box dark:bg-white">
      <h3 className="font-bold text-lg">Place Your bid here!</h3>
      <p className="py-4">
      Rebid allowed only if you're outbid within 24 hours. Please place your max preliminary bid to ensure winning.
      </p>
      <div className="flex gap-x-2 justify-center">
        {isLoading ? (
          <button
            className="btn text-green-600 w-[100px] dark:bg-white hover:bg-gray-200 border-green-600"
            onClick={onBidPlace}
          >
            <ClipLoader color="#CA0000" size={20} />
          </button>
        ) : (
          <button
            className={`btn text-green-600 w-[100px] dark:bg-white hover:bg-gray-200 border-green-600 `}
            onClick={onBidPlace}
          >
            Proceed
          </button>
        )}
        <button
          className="btn text-red-600 w-[100px] dark:bg-white hover:bg-gray-200 border-red-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </dialog>
  );
};

export default BidConfirmationModal; 