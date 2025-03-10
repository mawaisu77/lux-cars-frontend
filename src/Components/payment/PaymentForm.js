import React from "react";
import InputMask from "react-input-mask";
import { ClipLoader } from "react-spinners";

const PaymentForm = ({
  paymentDetails,
  handleInputChange,
  errors,
  onSubmit,
  loading,
  cardAmount,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Cardholder Name */}
      <div className="mb-4">
        <label className="block font-semibold">Cardholder Name</label>
        <input
          type="text"
          name="card_name"
          value={paymentDetails.card_name}
          onChange={handleInputChange}
          placeholder="Enter cardholder name"
          className="border rounded p-2 w-full"
        />
        {errors.card_name && (
          <p className="text-red-500 text-sm">{errors.card_name}</p>
        )}
      </div>
      {/* Card Number */}
      <div className="mb-4">
        <label className="block font-semibold">Card Number</label>
        <InputMask
          mask="9999 9999 9999 9999"
          name="card_number"
          value={paymentDetails.card_number}
          onChange={handleInputChange}
          placeholder="1234 5678 9012 3456"
          className="border rounded p-2 w-full"
        />
        {errors.card_number && (
          <p className="text-red-500 text-sm">{errors.card_number}</p>
        )}
      </div>

      {/* Card CVV */}
      <div className="mb-4">
        <label className="block font-semibold">Card CVV</label>
        <InputMask
          mask="999"
          name="card_cvv"
          value={paymentDetails.card_cvv}
          onChange={handleInputChange}
          placeholder="123"
          className="border rounded p-2 w-full"
        />
        {errors.card_cvv && (
          <p className="text-red-500 text-sm">{errors.card_cvv}</p>
        )}
      </div>

      {/* Card Expiration */}
      <div className="mb-4">
        <label className="block font-semibold">Card Expiration (MM/YY)</label>
        <InputMask
          mask="99/99"
          name="card_exp"
          value={paymentDetails.card_exp}
          onChange={handleInputChange}
          placeholder="MM/YY"
          className="border rounded p-2 w-full"
        />
        {errors.card_exp && (
          <p className="text-red-500 text-sm">{errors.card_exp}</p>
        )}
      </div>

      {/* Deposit Amount */}
      <div className="mb-4">
        <label className="block font-semibold" title="US Dollar">
          Deposit Amount (BSD)
        </label>
        <input
          type="text"
          name="card_amount"
          value={paymentDetails.card_amount}
          onChange={handleInputChange}
          disabled={cardAmount}
          placeholder="Enter deposit amount"
          className="border rounded p-2 w-full"
          min="1"
        />
        {errors.card_amount && (
          <p className="text-red-500 text-sm">{errors.card_amount}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={paymentDetails.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          className="border rounded p-2 w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Payment Purpose (Disabled) */}
      <div className="mb-4">
        <label className="block font-semibold">Payment Purpose</label>
        <input
          type="text"
          name="payment_purpose"
          value={paymentDetails.paymentPurpose}
          disabled
          className="border rounded p-2 w-full bg-gray-200"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary-red text-white py-2 rounded font-semibold mt-4"
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <ClipLoader size={20} color={"#fff"} />
        ) : (
          "Submit Payment"
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
