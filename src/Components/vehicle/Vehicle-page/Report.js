import React, { useEffect } from "react";
import useGetCarReport from "../../../hooks/useGetCarReport";
import { Document, Page, pdfjs } from "react-pdf";
import { FaSpinner } from "react-icons/fa6";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const CarReportViewer = ({ vin }) => {
  const { carReport, loading, error, fetchCarReport } = useGetCarReport(vin);

  const handleClick = () => {
    document.getElementById("my_modal").showModal();
  };

  const handleCloseModal = () => {
    document.getElementById("my_modal").close();
  };

  const handleDownload = () => {
    if (carReport) {
      const link = document.createElement("a");
      link.href = carReport;
      link.download = `CarReport_${vin}.pdf`;
      link.click();
      document.getElementById("my_modal").close();
    }
  };

  useEffect(() => {
    fetchCarReport();
  }, [vin]);


  return (
    <div className="mt-4 shadow-md rounded-md p-6">
       <h2 className="text-2xl font-semibold bg-gray-300 mb-4 border-b-2 border-gray-200 p-2 rounded-md">
         Report
       </h2>
    {loading && (
      <div className="flex items-center justify-center h-[400px]">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        <p className="ml-2 text-blue-500">Loading PDF...</p>
      </div>
    )}

    {error && (
      <div className="text-red-500 p-2 flex justify-center items-center rounded-lg h-[400px]">
        {error}
      </div>
    )}

    {!loading && !error && carReport && (
      <div>
          <div className="relative">
          <div className="h-[570px] overflow-hidden border border-gray-300 rounded-lg p-2">
            <Document file={carReport}>
              <Page pageNumber={1}  />
            </Document>
          </div>

          <div  onClick={handleClick} className="absolute cursor-pointer inset-0 bg-white hover:bg-opacity-50 bg-opacity-70  duration-100 rounded-lg p-2 flex items-center justify-center">
            {/* <p className="text-lg font-semibold">Get report</p> */}
          </div>
        </div>

        <div className="mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handleClick}
            >
              View Full Report
            </button>
          </div>
      </div>
    )}

<dialog id="my_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Make Payment to get full report</h3>
          <p className="py-4">
            Once you make payment then you can access the full report and can download.
          </p>
          <div className="flex gap-x-2 justify-center">
            <button
              className="btn text-green-600 w-[120px]"
              onClick={handleDownload}
            >
              Get Report
            </button>
            <button
              className="btn text-red-600 w-[120px]"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
  </div>
  );
};

export default CarReportViewer;
