import React, { useState, useEffect } from "react";
import PaymentForm from "../../../payment/PaymentForm";
import { Modal } from "@mui/material";
import { biddingConfig } from "./FundsData";
import { FaRegCreditCard } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import logo from "../../../../assets/lux-logo/bidcaribbeansBlueLogo.jpg";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BsCalendarEventFill, BsInfoCircle } from "react-icons/bs";
import { validatePaymentDetails } from "../../../payment/validatePayment";
import useAddFunds from "../../../../hooks/useAddFunds";
import { showToast } from "../../../../utils/Toast";

export default function BiddingLimit({ fetchFunds }) {
  const [openModal, setOpenModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    card_name: "",
    card_number: "",
    card_cvv: "",
    card_exp: "",
    card_amount: "",
    email: "",
    deposit: 0,
    paymentPurpose: "Adding Funds",
  });
  const [errors, setErrors] = useState({});

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
      ...(name === "card_amount" ? { deposit: parseInt(value, 10) || 0 } : {}), // Update deposit as integer when card_amount changes
    }));
  };

  const validateForm = () => {
    const newErrors = validatePaymentDetails(paymentDetails);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const {
    handleAddFunds,
    loading: addingFundsLoading,
    error: addingFundsError,
  } = useAddFunds();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formattedPaymentDetails = {
        ...paymentDetails,
        card_number: paymentDetails.card_number.replace(/\s+/g, ''), 
      };
      handleAddFunds(formattedPaymentDetails);
      fetchFunds();
      handleCloseModal();
    }
  };


  // useEffect(() => {
  //   if (addingFundsError) {
  //     console.log("error idr hy")
  //     showToast(addingFundsError, "error");
  //   }
  // }, [addingFundsError, addingFundsLoading]);
  

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          className="bg-white p-6 rounded-lg shadow-lg"
          style={{
            width: "800px",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="bg-[#008b98] rounded-lg w-full">
            <img
              src={logo}
              alt="Company Logo"
              className="w-[25%] h-auto mx-auto"
            />
          </div>
          <div className="flex gap-x-2 items-center justify-between mb-4 py-2">
            <div className="flex gap-x-2 items-center">
              <h2 className="text-xl font-bold ">Bidcaribbeans Payment</h2>

              <BsInfoCircle
                data-tooltip-id="payment-info-tooltip"
                className="font-extrabold text-20 animate-pulse"
              />
              <ReactTooltip
                id="payment-info-tooltip"
                place="bottom"
                content="Bidcaribbeans payment important information"
              />
            </div>
            <div className="flex items-center gap-x-2">
              <FaRegCreditCard
                size={30}
                className="text-yellow-500"
                title="Credit card"
              />
              <FaCcMastercard
                size={30}
                className="text-blue-600"
                title="Master card"
              />
            </div>
          </div>

          <PaymentForm
            paymentDetails={paymentDetails}
            handleInputChange={handleInputChange}
            errors={errors}
            onSubmit={handleSubmit}
            cardAmount={100}
          />
        </div>
      </Modal>

      <button
        className="w-full py-1.5 md:py-[0.5vw] mt-6 md:mt-[1.25vw] bg-primary-red text-white border-none rounded text-lg md:text-20 font-semibold cursor-pointer"
        onClick={handleOpenModal}
      >
        Increase My Bidding Limit
      </button>
    </>
  );
}
