import React, { useEffect, useState } from "react";
import useGetCarReport from "../../../hooks/useGetCarReport";
import { Document, Page, pdfjs } from "react-pdf";
import { FaCcMastercard, FaRegCreditCard, FaSpinner } from "react-icons/fa6";
import { Modal } from "@mui/material";
import logo from "../../../assets/lux-logo/bidcaribbeansBlueLogo.jpg";
import { BsInfoCircle } from "react-icons/bs";
import PaymentForm from "../../payment/PaymentForm";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { validatePaymentDetails } from "../../payment/validatePayment";
import { showToast } from "../../../utils/Toast";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; 
import "react-pdf/dist/esm/Page/TextLayer.css"; 
import baseService from "../../../services/baseService";
import { reportPaymentValue } from "../../../utils/constant";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const CarReportViewer = ({ vin }) => {
  const { carReport, loading, error, fetchCarReport } = useGetCarReport(vin);
  const [paymentLoading, setPaymentLoading] = useState(false); // New loading state for payment


 
  useEffect(() => {
    fetchCarReport();
  }, [vin]);


  const [openModal, setOpenModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    card_name: "",
    card_number: "",
    card_cvv: "",
    card_exp: "",
    card_amount: reportPaymentValue,
    email: "",
    paymentPurpose: "Report Payment", 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = validatePaymentDetails(paymentDetails);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [errors, setErrors] = useState({});

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
    setPaymentDetails({ 
      card_name: "",
      card_number: "",
      card_cvv: "",
      card_exp: "",
      card_amount: reportPaymentValue,
      email: "",
      paymentPurpose: "Adding Funds",
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formattedPaymentDetails = {
        ...paymentDetails,
        card_number: paymentDetails.card_number.replace(/\s+/g, ""),

      };     
      setPaymentLoading(true); 

      try {
        const response = await baseService.post('/process-payment', { ...formattedPaymentDetails });
        if (response.status === 201) {
          if (response.data.data === "success") {
            showToast("Payment Successful", "success");
            handleDownload();
        } 
        
        }
      } catch (error) {
        console.error("Payment error:", error);
        handleCloseModal();

      } finally {
        setPaymentLoading(false); 
      }

    }
  };

  const handleDownload = () => {
    if (carReport) {
      const link = document.createElement("a");
      link.href = carReport;
      link.download = `CarReport_${vin}.pdf`;
      link.click();
      alert("Report Downloaded Successfully");
      handleCloseModal();

    }
  };



  return (
    <div className=" mt-[2vh] shadow-sm rounded-[0.375vw] lg:w-[41vw]   bg-white p-[1.5vw]">
      <h2 className="text-md lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
         Report
       </h2>
    {loading && (
      <div className="flex w-full items-center justify-center  ">
        <FaSpinner className="animate-spin text-blue-500 text-[2.25vw]" />
        <p className="ml-2 text-blue-500">Loading PDF...</p>
      </div>
    )}

    {error && (
      <div className="text-red-500 p-[0.5vw] flex justify-center items-center rounded-[0.5vw]  ">
        {error}
      </div>
    )}

    {!loading && !error && carReport && (
      <div>
          <div className="relative">
          <div className="  overflow-hidden border border-gray-300 rounded-[0.5vw] p-[0.5vw]">
            <Document file={carReport}>
              <Page pageNumber={1}  />
            </Document>
          </div>

          <div  onClick={handleOpenModal} className="absolute cursor-pointer inset-0 bg-white hover:bg-opacity-50 bg-opacity-70  duration-100 rounded-lg p-2 flex items-center justify-center">
            {/* <p className="text-lg font-semibold">Get report</p> */}
          </div>
        </div>

        <div className="mt-4">
            <button
              className="bg-blue-500 text-white lg:text-[1.2vw] py-[0.5vw] px-[1vw] rounded-lg hover:bg-blue-600"
              onClick={handleOpenModal}
            >
              View Full Report
            </button>
          </div>
      </div>
    )}


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
            loading={paymentLoading}
            cardAmount={reportPaymentValue}
          />
        </div>  
      </Modal>
  </div>
  );
};

export default CarReportViewer;
