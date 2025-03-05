import { FaRegFileAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { getStatusColor } from "./statusColor";
import { useState } from "react";
import { validatePaymentDetails } from "../payment/validatePayment";
import { Modal } from "@mui/material";
import logo from "../../assets/lux-logo/bidcaribbeansBlueLogo.jpg";
import { BsInfoCircle } from "react-icons/bs";
import { FaCcMastercard, FaRegCreditCard, FaSpinner } from "react-icons/fa6";
import { Tooltip as ReactTooltip } from "react-tooltip";
import PaymentForm from "../payment/PaymentForm";
import baseService from "../../services/baseService";
import { showToast } from "../../utils/Toast";

export default function UserInvoices({invoices, fetchInvoices}) {

  const [paymentLoading, setPaymentLoading] = useState(false); 

  const [openModal, setOpenModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    card_name: "",
    card_number: "",
    card_cvv: "",
    card_exp: "",
    card_amount: "",
    email: "",
    paymentPurpose: "Invoice Payment", 
  });

  const validateForm = () => {
    const newErrors = validatePaymentDetails(paymentDetails);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({});

  const handleOpenModal = (invoice) => {

    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      card_amount: invoice.price, 
      invoiceID: invoice.id
    }));
    setOpenModal(true);
  };


  
  const handleCloseModal = () => {
    setOpenModal(false);
    setPaymentDetails({ 
      card_name: "",
      card_number: "",
      card_cvv: "",
      card_exp: "",
      card_amount: "",
      email: "",
      paymentPurpose: "Invoice Payment",
    });
  };


  const handleSubmit = async (e, invoiceID) => {
    e.preventDefault();
    if (validateForm()) {
      const formattedPaymentDetails = {
        ...paymentDetails,
        card_number: paymentDetails.card_number.replace(/\s+/g, ""),
      };     
      setPaymentLoading(true); 
      try {
        const response = await baseService.post(`/pay-invoice?invoiceID=${invoiceID}`, { ...formattedPaymentDetails });
        if (response.status === 200) {
            showToast("Payment Successful", "success");
            handleCloseModal();
            fetchInvoices()
        }
      } catch (error) {
        console.error("Payment error:", error);
        handleCloseModal();
      } finally {
        setPaymentLoading(false); 
      }
    }
  };
  
  return (
    <div className="w-full lg:w-[85vw] mx-auto p-4 lg:p-[1vw] lg:leading-[2vw]">
      <div className="flex items-center gap-2 lg:gap-[0.5vw] mb-6 lg:mb-[1.5vw]">
        <FaRegFileAlt className="w-5 lg:w-[1.25vw] h-5 lg:h-[1.25vw] text-gray-600" />
        <h2 className="text-xl lg:text-[1.25vw] font-semibold text-gray-700">Invoices</h2>
      </div>
  
      <div className="overflow-x-auto mx-auto ">
        <table className="min-w-[1000px] w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-3 lg:py-[0.75vw] lg:text-[1vw] font-medium text-gray-600">Invoice ID</th>
              <th className="py-3 lg:py-[0.75vw] lg:text-[1vw] font-medium text-gray-600">Type</th>
              <th className="py-3 lg:py-[0.75vw] lg:text-[1vw]  font-medium text-gray-600">Price</th>
              <th className="py-3 lg:py-[0.75vw] lg:text-[1vw]  font-medium text-gray-600">Status</th>
              <th className="py-3 lg:py-[0.75vw] lg:text-[1vw]  font-medium text-gray-600">Created At</th>
              <th className="py-3 lg:py-[0.75vw] lg:text-[1vw]  font-medium text-gray-600">Image</th>
              <th className="py-3 lg:py-[0.75vw] lg:text-[1vw]  font-medium text-gray-600">Payment</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.data?.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 lg:py-[1vw]">
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices?.data?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="text-left py-3 lg:py-[0.75vw] lg:text-[1vw]">
                    <a
                      href={`${invoice.invoice}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {invoice.id}
                    </a>
                  </td>
                  <td className="py-3 lg:py-[0.75vw] lg:text-[1vw] text-left text-gray-600">
                    {invoice.invoiceType}
                  </td>
                  <td className="text-left py-3 lg:py-[0.75vw] lg:text-[1vw]">
                    <span
                      className={`font-medium ${
                        invoice?.price < 0 ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {invoice?.price < 0 ? "-" : ""}$
                      {Math.abs(invoice?.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                  <td className="text-left py-3 lg:py-[0.75vw] lg:text-[1vw]">
                    <span
                      className={`py-2 lg:py-[0.25vw] lg:text-[1vw] px-3 lg:px-[0.75vw] rounded-full text-sm ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="text-left py-3 lg:py-[0.75vw] lg:text-[1vw] text-gray-600">
                    {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="text-left py-3 lg:py-[0.75vw] lg:text-[1vw]">
                    <div className="flex items-center gap-2">
                      <a
                        href={invoice.invoice}
                        className="inline-flex items-center gap-1 px-3 lg:px-[0.75vw] py-1 lg:py-[0.25] lg:text-[1vw] rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoEyeOutline className="w-4 lg:w-[1vw] h-4 lg:text-[1vw] lg:h-[1vw]" />
                        View
                      </a>
                    </div>
                  </td>
                  <td className="text-left py-3 lg:py-[0.75vw] lg:text-[1vw] ">
                    <div className="flex items-center gap-2">
                      {invoice.status === "Pending" && (
                        <button
                          onClick={() => handleOpenModal(invoice)}
                          className="inline-flex items-center gap-1 px-3 lg:px-[0.75vw] lg:text-[1vw] py-1 lg:py-[0.25vw] rounded-md lg:rounded-[0.375vw] bg-green-500 hover:bg-green-600 text-white transition-colors text-sm "
                        >
                          Pay
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
   <Modal open={openModal} onClose={handleCloseModal} >
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
              <h2 className="text-xl font-bold">Bidcaribbeans Payment</h2>
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
            onSubmit={(e) => handleSubmit(e, paymentDetails.invoiceID)} 
            cardAmount={paymentDetails.card_amount}
            loading={paymentLoading}
          />
        </div>
      </Modal>
    </div>
  );
}  