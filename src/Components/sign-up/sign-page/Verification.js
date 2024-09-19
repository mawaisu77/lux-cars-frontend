import React, { useRef, useState } from "react";
import Header from "../../header/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { FiUploadCloud } from "react-icons/fi";
import "./verification.css";
import axios from "axios";
import { getToken, getUser } from "../../../utils/storageUtils";
import { showToast } from "../../../utils/Toast";
import { API_BASE_URL } from "../../../services/baseService";

const Verification = () => {
  const fileUploadRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

  const [isUploadEnabled, setIsUploadEnabled] = useState(false); // To track the upload button state
  const navigate = useNavigate();

    // Handle file selection process
    const onFileSelect = (event) => {
      const selected = Array.from(event.files);
  
      // Update the state with the selected files
      setSelectedFiles(selected);
  
      // Check if exactly 2 files are selected, enable upload if true
      if (selected.length === 2) {
        setIsUploadEnabled(true);
      } else {
        setIsUploadEnabled(false);
      }
    };

      // Handle file removal process
  const onFileRemove = (event) => {
    const remainingFiles = selectedFiles.filter(
      (file) => file.name !== event.file.name
    );

    // Update the state with the remaining files
    setSelectedFiles(remainingFiles);

    // Check if exactly 2 files remain selected, enable upload if true
    if (remainingFiles.length === 2) {
      setIsUploadEnabled(true);
    } else {
      setIsUploadEnabled(false);
    }
  };
  

  const uploadDocuments = async (documentFiles) => {
    let formData = new FormData();
    documentFiles.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}user/upload-documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadedFiles((prevFiles) => {
              return prevFiles.map((uploadedFile) => ({
                ...uploadedFile,
                progress,
              }));
            });
          },
        }
      );

      setUploadedFiles((prevFiles) => {
        return prevFiles.map((uploadedFile) => ({
          ...uploadedFile,
          progress: 100,
        }));
      });

      // Handle successful upload
      console.log("Upload successful:", response.data);
      navigate("/user/profile");
      showToast("Document uploaded successfully", "success");
    } catch (error) {
      // Handle error
      console.error("Error uploading documents:", error);
      setUploadedFiles((prevFiles) => {
        return prevFiles.map((uploadedFile) => ({
          ...uploadedFile,
          progress: "error",
        }));
      });
      // console.log("backend error", error.response.data.message)
      showToast(error.response.data.message, "error");
      navigate("/user/profile");
    }

    if (fileUploadRef.current) {
      fileUploadRef.current.clear();
    }
  };

  const documentUploadHandler = ({ files }) => {
    const newFiles = Array.from(files).map((file) => ({
      file,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB", // Convert size to KB and fix to 2 decimal points
      progress: 0,
      preview: URL.createObjectURL(file), // Create a preview URL for the image
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    uploadDocuments(Array.from(files));
  };

  const customChooseButton = () => (
    <div className=" lg:w-[32vw] ">
      <p className="text-left text-[18px] lg:text-[1.16vw] font-urbanist font-semibold text-black">
        Verify and Start Bidding!
      </p>
      <p className="text-left text-[#7a798a] text-[14px] lg:text-[0.9vw]">
        Submit the photo of your official ID (Passport/License)
      </p>
      <p className="text-left text-[#7a798a] text-[14px] lg:text-[0.9vw]">
        You can upload only two documents
      </p>
      <div className="w-full bg-slate-100 py-4 my-6  border rounded-xl flex flex-col justify-center items-center">
        <div className="flex justify-center items-center w-[2.6vw] h-[5.4vh] bg-[#f9fafb] rounded-full">
          <FiUploadCloud color="red" size={30} />
        </div>
        <p className="text-[#7a798a] text-[12px] lg:text-[0.9vw]">
          <span className="text-red-600">Click to upload</span> or drag and drop
        </p>
        <p className="text-[#7a798a] text-[12px] lg:text-[0.9vw]">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>
    </div>
  );

  const customUploadButton = () => (
    <button
    className={`w-[32vw] text-[16px] lg:text-[1vw] font-urbanist hover:bg-red-600 hover:text-white text-black duration-100 border-2 rounded-lg ${
      isUploadEnabled ? "" : "cursor-not-allowed opacity-50"
    }`}
    disabled={!isUploadEnabled} // Disable button until 2 files are selected
    onClick={uploadDocuments}
  >
    Upload
  </button>
  );

  const customCancelButton = () => (
    <button className=" w-[32vw]  items-center text-[16px] lg:text-[1vw] font-urbanist bg-red-600 text-white border-2 rounded-lg">
      Cancel
    </button>
  );

    // Handle file clearing (all files removed)
    const onFileClear = () => {
      setSelectedFiles([]);
      setIsUploadEnabled(false); // Disable upload when no files are selected
    };

  return (
    <div className=" ">
      <div className="Backgroundimage-Signup">
        <Header textColor="text-white" />
        <div className="hidden lg:block">
          <div className="w-[15.5] flex flex-col mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">SignUp</div>
            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">
              <Link to="/">
                <button className="hover:text-white">Home</button>
              </Link>
              /<button className="hover:text-white">SignUp</button>/
              <button className="hover:text-white">Verification</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" mb-52 max-w-[86vw] md:max-w-[36.1vw] mx-auto ">
        <div className="mt-[8.6vh]  text-[36px] lg:text-[2vw] font-bold font-urbanist">
          Upload Documents
        </div>
        <div className="max-w-[342px] lg:max-w-[37vw] mx-auto leading-10 ">
          <FileUpload
            className="  "
            ref={fileUploadRef}
            headerClassName="max-w-[370px]  border-2 lg:max-w-[37vw] lg:h-[70vh]  mt-[30px]   "
            contentClassName="overflow-y-auto "
            contentStyle={{ maxHeightheight: "700px" }}
            customUpload={true}
            multiple
            onSelect={onFileSelect} // Monitor file selection
            onRemove={onFileRemove} // Monitor file removal
            onClear={onFileClear} 
            uploadHandler={documentUploadHandler}
            // emptyTemplate={<p className="m-0 text-[1vw]">Drag and drop files to here to upload.</p>}
            chooseLabel={customChooseButton()}
            chooseOptions={{ icon: ".", className: "custom-choose-btn" }}
            uploadLabel={customUploadButton()}
            uploadOptions={{ icon: ".", className: "custom-upload-btn" }}
            cancelLabel={customCancelButton()}
            cancelOptions={{ icon: ".", className: "custom-cancel-btn" }}
          />
          <div className=" overflow-y-scroll">
            {uploadedFiles.map(({ name, size, progress, preview }) => (
              <div key={name} className="mt-4 ">
                <div className="flex items-center ">
                  <img
                    src={preview}
                    alt={name}
                    className="w-16 h-16 mr-4 object-cover rounded"
                  />
                  <div className="flex gap-x-2 w-full">
                    <div>{size}</div>
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-red-700 dark:text-white">
                          {name}
                        </span>
                        <span className="text-sm font-medium text-red-700 dark:text-white">
                          {progress === "error" ? "Error" : `${progress}%`}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5  ">
                        <div
                          className="bg-red-600 h-2.5 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
