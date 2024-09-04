import React, { useCallback, useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import image1 from "../../../assets/User-pics/Subtract.png";
import bar from "../../../assets/User-pics/bar.png";
import bars from "../../../assets/User-pics/bars.png";
import icon7 from "../../../assets/User-pics/icon (7).png";
import avatar from "../../../assets/docs.jpg";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { getProfile, updateProfile } from "../../../services/userService";
import { saveUser } from "../../../utils/storageUtils";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"; // Optional spinner library
import PhoneInput from "react-phone-input-2";
import { showToast } from "../../../utils/Toast";
import { Link } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import { MdVerifiedUser } from "react-icons/md";
import TooltipInfo from "../../common/TooltipInfo";
import { BsInfoCircle } from "react-icons/bs";

const Profile = () => {
  const { token } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [documents, setDcuments] = useState([]);
  const [documentVerification, setDocumentVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = documents;

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      saveUser(response.data);
      const { username, email, address, phone, documents, documentVerified } = response.data;
      setDocumentVerification(documentVerified)
      setDcuments(documents);
      setUsername(username);
      setEmail(email);
      setAddress(address);
      setPhone(phone || "");
      console.log(documents[0] || []);
    } catch (error) {
      console.error(error);
      showToast("Error fetching profile data", "error");
      // toast.error("Error fetching profile data");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const profileData = { username, email, address, phone: `+${phone}` };
      const response = await updateProfile(profileData);
      setLoading(false);
      fetchProfile();
      showToast(response.message, "success");
    } catch (error) {
      setLoading(false);
      console.log(error);
      
      showToast("Error updating profile", "error");
      // toast.error("Error updating profile");
    }
  };

  return (
    <>
      <div className="w-[344px] md:w-[650px]  lg:w-[74vw] mx-auto    mt-[50px]  text-black ">
        <div className="text-left text-[36px] lg:text-[2.3vw] font-urbanist font-bold">
          Profile Info
        </div>
        <div className="flex flex-col">
          <form className="" onSubmit={handleSubmit}>
            <div className="text-left  w-full ">
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col lg:flex-row lg:flex-wrap h-[13vh] gap-5 ">
                  <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Full Name"
                    className="w-[344px] md:w-[650px] lg:w-[26vw] h-[46px] lg:h-[4.7vh] rounded-lg p-2 border"
                  />

                  <input
                    name="email"
                    disabled
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[344px] md:w-[650px] lg:w-[26vw] h-[46px] lg:h-[4.7vh]  rounded-lg p-2 border text-gray-400 cursor-not-allowed"
                  />

                  <div className="w-[344px] md:w-[650px] lg:w-[26vw] h-[46px] lg:h-[4.7vh]">
                    <PhoneInput
                      country={"us"}
                      countryCodeEditable={false}
                      disableDropdown={true}
                      buttonStyle={{
                        background: "white",
                        borderRight: "0px",
                      }}
                      containerClass="  mx-auto border-none  outline-none  p-0 m-0 "
                      inputStyle={{ width: "100%", height: "4.68vh" }}
                      inputClass="bg-blue-400 text-black p-0 m-0 border-none rounded outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                    />
                  </div>

                  <input
                    name="address"
                    placeholder="Address"
                    className="w-[344px] md:w-[650px] lg:w-[26vw] h-[46px] lg:h-[4.7vh]  rounded-lg p-2 border"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="w-[313px] md:w-[600px] lg:w-[30vw] h-[192px] mt-[120px] lg:mt-0  border rounded-lg p-5 ">
                  <div className="flex gap-3 my-2">
                    <div className="flex relative justify-center items-center bg-red-600 w-[60px] lg:w-[3vw] h-[60px] lg:h-[6vh] rounded-full">
                      <img src={image1} />
                      {documentVerification ? (
                        <MdVerifiedUser className="absolute text-green-600 bg-white rounded-tl-lg bottom-0 right-0"/>
                      ):(
                    <div className="absolute -bottom-2 -right-2">
                          <TooltipInfo  content="Your document status is pending, if you uploaded the docuemnt then please wait for update">
                        <BsInfoCircle size={20} className='hover:text-blue-800 bg-white rounded-full text-red-600 duration-200'/>
                      </TooltipInfo>
                    </div>
                      )}
                    </div>
                    <div>
                      <p className="text-[15px] lg:text-[0.9vw]  text-[#9698ab] font-urbanist">
                        Documentation
                      </p>
                      <p className="text-[20px] lg:text-[1vw] font-urbanist font-semibold">
                        {username}
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                      <div
                        className={`bg-red-600 h-2.5 rounded-full ${
                          documents.length === 0 || null
                            ? "w-0"
                            : documents.length === 1
                            ? "w-[50%]"
                            : "w-[100%]"
                        }`}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex gap-x-2">
                      <img src={bars} />
                      <p className="text-red-500 ">
                        {documents.length === 0 || null
                          ? "0%"
                          : documents.length === 1
                          ? "50%"
                          : "completed"}
                      </p>
                    </div>
                    <div>
                      <img src={icon7} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="flex">
                <div className={`w-[3vw] h-[5vh] ${images.length > 0 ? 'flex':'hidden'}`}>
                  {images.map((src, index) => (
                    <img
                      className="w-full h-full cursor-pointer hover:scale-105 duration-200"
                      src={src}
                      onClick={() => openImageViewer(index)}
                      key={index}
                      style={{ margin: "2px" }}
                      alt=""
                    />
                  ))}

                  {isViewerOpen && (
                    <ImageViewer
                      src={images}
                      currentIndex={currentImage}
                      disableScroll={false}
                      closeOnClickOutside={true}
                      onClose={closeImageViewer}
                    />
                  )}
      
                  {/* <div className=" flex justify-center items-center w-[7vw] h-[12vh] bg-[#c4c4c4] rounded-xl">
                  <img src={documents[0]} />
                </div> */}
                </div>

               
                <div className="flex">
               <div>
               {
                    images.length === 0 && (<>
                        <div className="h-[98px] w-[98px] mt-[60px] lg:mt-0 border-2 rounded shadow border-[#343444] ">
                                      <img src={avatar} className="w-full h-full object-cover" alt="avatar-img"/>
                          </div>

                    </>)
                  }
               </div>
            
                  <div className=" mt-[60px] lg:mt-0">
                    <div className="flex gap-3 ml-5">
                      {documents.length < 2 && (
                        <div className="flex items-start justify-between flex-col gap-y-2 ">
                           <p className="text-[14px] text-left lg:text-[0.9vw] text-[#737a99] font-urbanist  ">
                            Images must be of your official ID (Passport/License)
                          </p>

                          <p className="text-[14px] text-left lg:text-[0.9vw] text-[#737a99] font-urbanist  ">
                            You must have to upload two photos
                          </p>
                          <Link to={"/user/documents-upload"}>
                            <button className="text-[16px] lg:text-[1vw] font-urbanist py-1 px-4 text-white hover:text-white bg-[#343444] rounded-xl">
                              Upload Docs
                            </button>
                          </Link>
                         
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            <button className="flex justify-center mb-10 items-center font-semibold w-[150px] lg:w-[10vw] h-[54px] lg:h-[6vh] bg-[#f3f3f6] text-[16px] lg:text-[0.8vw] text-[#ca0000] rounded-xl mt-[3vh]">
              {loading ? (
                <ClipLoader size={20} color={"#ca0000"} />
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
