import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeAgo from "react-timeago";
import { FaEye } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import luxLogo from "../../assets/Logo/Horizontal0 1.png";
import { Modal, Box } from "@mui/material"; // Import Modal and Box

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OfferCards = ({
  offer,
  onUpdate,
  loading,
  error,
  updateOfferResponse,
  triggerRefresh,
  setUpdateOfferResponse,
}) => {
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const [open, setOpen] = useState(false); // State for Modal visibility

  const navigate = useNavigate();

  const handleOpenModal = (id) => {
    setSelectedOfferId(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setUpdateOfferResponse(null);
    triggerRefresh();
  };

  const handleAcceptOffer = async (id) => {
    if (id) {
      await onUpdate(id, "OfferAccepted");
    }
  };

  const handleRejectOffer = async (id) => {
    if (selectedOfferId) {
      await onUpdate(selectedOfferId, "OfferRejected");
    }
  };

  const handleNavigate = () => {
    navigate(`/local-vehicle-detail/${offer?.carData?.id || "-"}`);
  };
  // console.log("=== offer ===", offer);
  return (
    <>
      <tr className="border-t">
        {/* Car Image */}
        <td className="text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw]">
          <div className="w-[60px] lg:w-[3.125vw] h-[60px] lg:h-[3.125vw] rounded-md lg:rounded-[0.375vw] overflow-hidden bg-gray-100">
            <img
              className="w-full h-full object-cover"
              src={offer.carData?.carImages[0] || ""}
              alt="Car"
            />
          </div>
        </td>
        {/* Car Title */}
        <td
          className="text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] hover:text-blue-800 hover:underline cursor-pointer"
          onClick={handleNavigate}
        >
          {`${offer.carData?.year || "-"} ${offer.carData?.make || "-"} ${
            offer.carData?.model || "-"
          }`}
        </td>
        {/* VIN */}
        <td className="text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw]">{offer.carData?.vin || "-"}</td>

        {/* Offer Price */}
        <td className="text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-bold">
          <span className={""}>${offer.offer?.offerPrice || "N/A"}</span>
        </td>

        {/* Status */}
        <td
          className={`text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-semibold ${
            offer.offer?.offerStatus === "OfferAccepted"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {offer.offer?.offerStatus}
        </td>

        {/* Posted Time Ago */}
        <td className="text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw]">
          <TimeAgo date={offer.carData?.createdAt} />
        </td>

        {/* Accept offer button */}
        <td className={`text-nowrap font-semibold`}>
          {(offer.offer?.offerStatus === "Pending" ||
            offer.offer?.offerStatus === "Expired") && (
            <button
              className="bg-green-500 hover:bg-green-600 text-xs lg:text-[1vw] text-white   p-1 lg:px-[0.5vw] lg:py-[2vh] rounded"
              onClick={() => handleOpenModal(offer?.offer?.id)}
            >
              Update Offer
            </button>
          )}
        </td>
      </tr>

      {/* Material UI Modal for confirmation */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="flex justify-center items-center">
              <ClipLoader size={30} color={"#D0021B"} loading={loading} />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : updateOfferResponse?.data?.offerData?.offerStatus ===
            "OfferAccepted" ? (
            <>
              <div className="flex flex-col items-center">
                <img
                  src={luxLogo}
                  alt="LuxCar Logo"
                  className="w-20 h-auto mb-4"
                />
                <p className="text-green-500 text-center font-semibold">
                  {updateOfferResponse?.message}
                </p>
                <p className="text-gray-700 text-center mt-2">
                  Thank you for accepting the offer. Please wait for LuxCar’s
                  response. Our team will review your offer and get back to you
                  shortly.
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
              <h3 id="modal-title" className="font-bold text-lg">
                Confirm Offer Acceptance
              </h3>
              <p id="modal-description" className="py-4">
                Are you sure you want to accept this offer?
              </p>
              <div className="flex gap-x-2 justify-center">
                <button
                  className="btn text-green-600 w-[100px] lg:w-[5.208vw] lg:text-[1vw] dark:bg-white dark:border-green-600 dark:text-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => handleAcceptOffer(offer?.offer?.id)}
                >
                  Accept
                </button>
                <button
                  className="btn text-red-600 w-[100px] lg:w-[5.208vw] dark:bg-white dark:border-red-600 dark:text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={handleRejectOffer}
                >
                  Reject
                </button>
                <button
                  className="btn text-gray-600 w-[100px] lg:w-[5.208vw] dark:bg-white dark:border-gray-600 dark:text-gray-600 hover:bg-gray-600 hover:text-white"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default OfferCards;
