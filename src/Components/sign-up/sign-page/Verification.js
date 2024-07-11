import React, { useState, useRef  } from "react";
import Header from "../../header/Header/Header";
import { Link } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

import "./verification.css"

const Verification = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showProgress, setShowProgress] = useState(false)
  const fileInputRef =  useRef(null)

  const handleFileInputClick = () => {
    fileInputRef.current.click()
  }

  const uploadFile = (event) => {
    const file = event.target.files[0]
    if(!file) return
    const filename = file.name.length > 12 ? `${file.name.substring(0, 13)}... .${file.name.split('.')[1]}` : file.name
    const formData = new FormData()
    formData.append('file', file)
  }

  return (
    <>
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
      <div className="h-[730px] lg:h-[85vh] w-full lg:w-[36.1] mx-auto">
        <div className="mt-[8.6vh] text-[36px] lg:text-[2vw] font-bold font-urbanist">
          Documents
        </div>

        <div className="w-[30vw]   mx-auto mt-[7vh] h-[44vh] leading-8">
          <p className="text-left text-[1.16vw] font-urbanist font-semibold">Verify and Start Bidding!</p>
          <p className="text-left text-[#7a798a] text-[0.9vw]">Submit the photo of your official ID (Passport/License)</p>
          <div className="w-full h-[15.5vh] my-6  border rounded-xl " onClick={handleFileInputClick}>
          <input type="file" name="file" hidden ref={fileInputRef} onChange={uploadFile}/>

            <div className="flex flex-col justify-center items-center w-[25vw] h-[15vh] mx-auto ">
              <div  className="flex justify-center items-center w-[2.6vw] h-[5.4vh] bg-[#f9fafb] rounded-full">
              <FiUploadCloud />
              </div>
              
              <p className="text-[#7a798a] text-[0.9vw]"><span className="text-red-600">Click to upload</span> or drag and drop</p>
              <p className="text-[#7a798a] text-[0.9vw]">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>

          {
            showProgress && (
              <section className="loading-area ">
                {
                  files.map((file, index)=> (
                    <li className=" flex justify-between items-center bg-red-200 p-5" key={index}>
                    <FaFileAlt className=""/>
                      <div className="content w-full">
                        <div className="details flex justify-between items-center ">
                          <div className="name">
                              {`${file.name} - uploading`}
                          </div>
                          <div className=" ml-3 percent">
                          {`${file.loading}%`}
                          </div>
                          <div className=" h-[6px] w-full mb-[4px] bg-[#fff] rounded-lg ">
                            <div className={`h-full  bg-red-500  rounded-lg w-[${file.loading}%] `}>
                                    
                            </div>
                          </div>
                        </div>
                      </div>
                  </li>
                  ))
                }
           
            </section>
            )
          }

      
          <section className="uploaded-area ">
            {
              uploadedFiles.map((file, index) => (
                <li className="row list-none flex justify-between items-center p-2" key={index}>
                <div className="content upload gap-x-4 flex items-center">
                  <FaFileAlt />
                  <div className="details flex flex-col ">
                    <div className="name">{file.name}</div>
                    <div className="file">{file.size}</div>
                  </div>
                </div>
                <FaRegCheckCircle />
              </li>
              ))
            }
          
          </section>
          <div className="flex justify-between">
              <button className="flex justify-center items-center text-[1vw] font-urbanist hover:bg-red-600 hover:text-white w-[14vw] h-[6vh] border rounded-lg">
                  Cancel
              </button>
              <button className="flex justify-center items-center text-[1vw] font-urbanist hover:bg-red-600 hover:text-white w-[14vw] h-[6vh] border rounded-lg">
                   Submit
              </button>

          </div>
        </div>

        {/* <div className="text-[14px] lg:text-[0.7vw] font-urbanist mt-[5vh]">
          Already have an account?{" "}
          <Link to="/Login">
            <span className="text-[#ca0000] cursor-pointer">Login</span>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default Verification;
