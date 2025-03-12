import React from 'react';
import { ClipLoader } from 'react-spinners';

const BuyNowModal = ({ isLoading, onBidPlace, onClose, placeBuyAmount }) => {
  return (
    <dialog id="buy_now_modal" className="modal">
      <div className="modal-box dark:bg-white">
        <h3 className="font-bold text-lg">Buy Now Confirmation</h3>
        <p className="py-4">
         You bid will be placing at top, do you want to place max bid as buy now in ${placeBuyAmount}? 
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

export default BuyNowModal;