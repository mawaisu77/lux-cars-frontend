import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import UserInvoices from "./UserInvoices";
import useGetMyInvoices from "../../hooks/invoice/useGetMyInvoices";

const Invoice = () => {
    const {invoices, loading, error, fetchInvoices} = useGetMyInvoices();

    useEffect(() => {
     fetchInvoices()
    }, [])


  return (
    <>
      <div className="back-image">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Invoice Portal
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
              Invoices
            </button>
          </div>
        </div>
      </div>
      {!error && invoices &&  <UserInvoices invoices={invoices} fetchInvoices={fetchInvoices} />} 
      </>
  );
};

export default Invoice;
