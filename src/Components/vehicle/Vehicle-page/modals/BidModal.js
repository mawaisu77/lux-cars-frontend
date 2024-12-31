import React from 'react';
import { ClipLoader } from 'react-spinners';

const BidModal = ({ isLoading, onBidPlace, onClose, placeBidAmount }) => {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box dark:bg-white">
        <h3 className="font-bold text-lg">Place Your bid here!</h3>
        <p className="py-4">
          Once you place bid then you will be no longer to bid again on this
          car for 24 hours,
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
              className={`btn text-green-600 w-[100px] dark:bg-white hover:bg-gray-200 border-green-600 ${!placeBidAmount || placeBidAmount <= 0 || isLoading ? "bg-gray-200 text-black" : ""}`}
              onClick={onBidPlace}
              disabled={!placeBidAmount || placeBidAmount <= 0 || isLoading}
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

export default BidModal;