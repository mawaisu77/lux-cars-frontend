import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeAgo from "react-timeago";
import { FaEye } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import luxLogo from "../../assets/Logo/Horizontal0 1.png";

const OfferCards = ({ offer, onUpdate, loading, error, success, updateOfferResponse, triggerRefresh }) => {
  const navigate = useNavigate();

  const handleOpenModal = () => {
    document.getElementById("offer_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("offer_modal").close();
    triggerRefresh(); 

  };

  const handleAcceptOffer = async () => {
    await onUpdate(offer?.offer?.id, "OfferAccepted");
  };

  const handleRejectOffer = async () => {
    await onUpdate(offer?.offer?.id, "OfferRejected");
  };

  const handleNavigate = () => {
    navigate(`/vehicle-detail/${offer?.carDetails?.lot_id || "-"}`);
  };
  console.log("updateOfferResponse", updateOfferResponse);

  return (
    <>
      <tr className="border-t">
        {/* Car Image */}
        <td className="text-nowrap px-4 py-2">
          <div className="w-[60px] h-[60px] rounded-md overflow-hidden bg-gray-100">
            <img
              className="w-full h-full object-cover"
              src={offer.carData?.carImages[0] || ""}
              alt="Car"
            />
          </div>
        </td>
        {/* Car Title */}
        <td
          className="text-nowrap px-4 py-2 hover:text-blue-800 hover:underline cursor-pointer"
          onClick={handleNavigate}
        >
          {`${offer.carData?.year || "-"} ${offer.carData?.make || "-"} ${
            offer.carData?.model || "-"
          }`}
        </td>
        {/* VIN */}
        <td className="text-nowrap px-4 py-2">{offer.carData?.vin || "-"}</td>
        {/* Location */}
        <td className="text-nowrap px-4 py-2">
          {`${offer.carData?.carLocation || "-"}, ${
            offer.carData?.carState || "-"
          }`}
        </td>
        {/* Posted Time Ago */}
        <td className="text-nowrap px-4 py-2">
          <TimeAgo date={offer.carData?.createdAt} />
        </td>

        {/* Offer Price */}
        <td className="text-nowrap px-4 py-2 font-bold">
          <span className={""}>
            ${offer.offer?.offerPrice || "N/A"}
          </span>
        </td>

        {/* Status */}
        <td
          className={`text-nowrap px-4 py-2 font-semibold ${
            offer.offer?.offerStatus === "OfferAccepted"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {offer.offer?.offerStatus }
        </td>

        {/* Accept offer button */}
        <td className={`text-nowrap font-semibold`}>
          {offer.offer?.offerStatus === "Pending" && (
             <button
             className="bg-green-500 hover:bg-green-600 text-xs text-white font-bold py-1 px-2 rounded"
             onClick={handleOpenModal}
           >
               Update Offer
             </button>
          )}
        </td>
      </tr>
      {/* Modal for confirmation */}
      <dialog id="offer_modal" className="modal">
        <div className="modal-box">
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader size={30} color={"#D0021B"} loading={loading} />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : updateOfferResponse?.data?.offerData?.offerStatus === "OfferAccepted" ? (
            <>
              <div className="flex flex-col items-center">
          <img src={luxLogo} alt="LuxCar Logo" className="w-20 h-auto mb-4" />
          <p className="text-green-500 text-center font-semibold">
            {updateOfferResponse?.message}
          </p>
          <p className="text-gray-700 text-center mt-2">
            Thank you for accepting the offer. Please wait for LuxCar’s response.
            Our team will review your offer and get back to you shortly.
          </p>
          <button
            className="btn text-gray-600 w-[100px] mt-4"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg">Confirm Offer Acceptance</h3>
              <p className="py-4">
                Are you sure you want to accept this offer?
              </p>
              <div className="flex gap-x-2 justify-center">
                <button
                  className="btn text-green-600 w-[100px]"
                  onClick={handleAcceptOffer}
                >
                  Accept
                </button>
                <button
                  className="btn text-red-600 w-[100px]"
                  onClick={handleRejectOffer}
                >
                  Reject
                </button>
                <button
                  className="btn text-gray-600 w-[100px]"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
};

export default OfferCards;
