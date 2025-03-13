import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStatusBadgeClass } from "./badges";
import useGetMyTransactions from "../../../hooks/invoice/getMyTransactions";
import moment from "moment-timezone";

const TransactionDetailTable = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { transactions, loading, error, fetchTransactions } =
    useGetMyTransactions();
  const [sortOrder, setSortOrder] = useState("latest"); // Add this line

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
  };

  // Add loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full lg:rounded-[100%] h-12 lg:h-[3vw] lg:w-[3vw] w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Add error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-center">
          <p>Error loading transactions: {error}</p>
          <button
            onClick={fetchTransactions}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Check if transactions array is empty
  if (!transactions.data || transactions?.data?.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-center">
          <p>No transactions found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <div className="bg-vehicle">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            My Transactions
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
              Transaction History
            </button>
          </div>
        </div>
      </div> */}
      <div className="w-[90vw] lg:w-[85vw] px-4 mx-auto sm:px-6 lg:px-[2vw] my-4 lg:my-[1vw]">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="">
            <h1 className="text-[24px] md:text-[36px] lg:text-[2.3vw] text-left font-semibold text-gray-900">
              Transaction History
            </h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex items-center gap-4 lg:gap-[1vw]">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] text-sm lg:text-[0.875vw] font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Sort by {sortOrder === "latest" ? "Latest" : "Oldest"}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1 lg:py-[0.25vw]">
                    <button
                      onClick={() => handleSort("latest")}
                      className={`block px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] text-sm lg:text-[0.875vw]   w-full lg:w-[100%] text-left ${"sortOrder" === "latest" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                      Latest
                    </button>
                    <button
                      onClick={() => handleSort("oldest")}
                      className={`block px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] text-sm lg:text-[0.875vw] w-full lg:w-[100%] text-left ${"sortOrder" === "oldest" ? "bg-gray-100 text-gray-900" : "text-gray-700"}`}
                    >
                      Oldest
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-[2vw] flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow-[1vw] ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 text-nowrap lg:py-[0.875vw] pl-2  lg:pl-[1vw] pr-3  lg:pr-[0.75vw] text-left text-sm lg:text-[0.875vw] leading-[1.25vw] font-medium text-gray-500 sm:pl-6"
                      >
                        TRANSACTION ID
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 text-nowrap lg:py-[0.875vw] pl-2  lg:pl-[1vw] pr-3  lg:pr-[0.75vw] text-left text-sm lg:text-[0.875vw] leading-[1.25vw] font-medium text-gray-500 sm:pl-6"
                      >
                        DATE
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-nowrap lg:py-[0.875vw] pl-2  lg:pl-[1vw] pr-3  lg:pr-[0.75vw] text-left text-sm lg:text-[0.875vw] leading-[1.25vw] font-medium text-gray-500 sm:pl-6"
                      >
                        PAYMENT PURPOSE
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-nowrap lg:py-[0.875vw] pl-2  lg:pl-[1vw] pr-3  lg:pr-[0.75vw] text-left text-sm lg:text-[0.875vw] leading-[1.25vw] font-medium text-gray-500 sm:pl-6"
                      >
                        AMOUNT (USD)
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-nowrap lg:py-[0.875vw] pl-2   lg:pl-[1vw] pr-3 lg:pr-[0.75vw] text-left text-sm lg:text-[0.875vw] leading-[1.25vw] font-medium text-gray-500 sm:pl-6"
                      >
                        STATUS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {transactions?.data &&
                      [...transactions.data]
                        .sort((a, b) => {
                          const dateA = new Date(a.createdAt);
                          const dateB = new Date(b.createdAt);
                          return sortOrder === "latest"
                            ? dateB - dateA
                            : dateA - dateB;
                        })
                        .map((transaction, index) => (
                          <tr key={index}>
                            <td className="  px-3 lg:px-[0.75vw] py-4 lg:py-[1vw] text-sm lg:text-[0.875vw]  text-left font-medium text-gray-900 sm:pl-6">
                              {transaction?.id || "N/A"}
                              <svg
                                className="inline-block ml-1 h-4 w-4 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                                <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                              </svg>
                            </td>

                            <td className="whitespace-nowrap text-left px-3 lg:px-[0.75vw] py-4 lg:py-[1vw] text-sm lg:text-[0.875vw] text-gray-500">
                              {moment(transaction?.createdAt).format(
                                "DD-MM-YYYY HH:mm"
                              ) || "N/A"}
                            </td>
                            <td className="whitespace-nowrap text-left px-3 lg:px-[0.75vw] py-4 lg:py-[1vw] text-sm lg:text-[0.875vw] text-gray-500">
                              {transaction?.paymentPurpose || "N/A"}
                            </td>
                            <td className="whitespace-nowrap text-left px-3 lg:px-[0.75vw] py-4 lg:py-[1vw] text-sm lg:text-[0.875vw] text-gray-500">
                              {transaction?.amount || "N/A"}
                            </td>
                            <td className="whitespace-nowrap text-left px-3 lg:px-[0.75vw] py-4 lg:py-[1vw] text-sm lg:text-[0.875vw] text-gray-500">
                              <span
                                className={`inline-flex rounded-full lg:rounded-[0.5vw] px-2 lg:px-[0.5vw] text-xs lg:text-[0.75vw] font-semibold leading-5 lg:leading-[1.25vw] ${getStatusBadgeClass(transaction?.paymentStatus)}`}
                              >
                                {transaction?.paymentStatus || "N/A"}
                              </span>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetailTable;
