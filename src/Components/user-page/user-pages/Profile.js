import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import image1 from "../../../assets/User-pics/Subtract.png";
import bar from "../../../assets/User-pics/bar.png";
import bars from "../../../assets/User-pics/bars.png";
import icon7 from "../../../assets/User-pics/icon (7).png";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { getProfile, updateProfile } from "../../../services/userService";
import { saveUser } from "../../../utils/storageUtils";
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners'; // Optional spinner library
import PhoneInput from "react-phone-input-2";


const Profile = () => {
  const { token } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(""); 
  const [documents, setDcuments] = useState([]); 


  const [loading, setLoading] = useState(false)

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      // const response = await axios.get('http://localhost:8000/api/v1/user/profile', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      saveUser(response.data);
      const { username, email, address, phone, documents } = response.data;
      setDcuments(documents)
      setUsername(username);
      setEmail(email);
      setAddress(address);
      setPhone(phone || ""); 
      console.log(documents)
      console.log(documents[0] || [])

    } catch (error) {
      console.error(error);
      toast.error("Error fetching profile data");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const profileData = { username, email, address, phone:`+${phone}` };
      const response = await updateProfile(profileData);
      //  await axios.put('http://localhost:8000/api/v1/user/edit-profile', profileData, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      setLoading(false)
      fetchProfile();
      toast.success(response.message)
    } catch (error) {
      setLoading(false)
      console.error(error);
      toast.error("Error updating profile");
    }
  };

  return (
    <>
      <div className="w-[74vw] h-[53vh] mx-auto  mt-[50px]">
        <div className="text-left text-[2.3vw] font-urbanist font-bold">
          Profile Info
        </div>
        <div className="flex">
          <form className="" onSubmit={handleSubmit}>
            <div className="text-left  w-full ">
              <div className="flex">
                <div className="flex flex-wrap h-[13vh] gap-5 ">
                  <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Full Name"
                    className="w-[26vw] h-[4.7vh] rounded-lg p-2 border"
                  />

                  <input
                    name="email"
                    disabled
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[26vw] h-[4.7vh]  rounded-lg p-2 border text-gray-400 cursor-not-allowed"
                  />

                  <div className="w-[26vw] h-[4.7vh]">
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
                    className="w-[26vw] h-[4.7vh]  rounded-lg p-2 border"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className=" w-[30vw]  border rounded-lg p-5 ">
                  <div className="flex gap-3 my-2">
                    <div className="flex justify-center items-center bg-red-600 w-[3vw] h-[6vh] rounded-full">
                      <img src={image1} />
                    </div>
                    <div>
                      <p className="text-[0.9vw]  text-[#9698ab] font-urbanist">
                        Documentation
                      </p>
                      <p className="text-[1vw] font-urbanist font-semibold">
                        lorem Ipsum
                      </p>
                    </div>
                  </div>
                  <img src={bar} className="w-[15vw] my-2" />
                  <div className="flex justify-between ">
                    <div className="flex">
                      <img src={bars} />
                      <p className="text-red-500">+15%</p>
                    </div>
                    <div>
                      <img src={icon7} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[28vw] h-[12vh]    ">
                <div className=" flex justify-center items-center w-[7vw] h-[12vh] bg-[#c4c4c4] rounded-xl">
                  <img src={documents[0]} />
                </div>
                <div className="">
                  <div className="flex gap-3 ml-5">
                    <button className="text-[1vw] w-[6vw] font-urbanist h-[4.25vh] text-black hover:text-white hover:bg-[#343444] rounded-full">
                      Upload
                    </button>
                    <button className="flex text-[1vw] font-urbanist justify-center items-center w-[6vw] h-[4.25vh] text-black hover:text-white hover:bg-[#343444] rounded-full">
                      <RiDeleteBin5Line color="red" />
                      Delete
                    </button>
                  </div>
                  <p className="text-[0.9vw] text-[#737a99] font-urbanist ml-5">
                    Images must be .png or .jpg format. Min size 120x120px
                    (avatar)
                  </p>
                </div>
              </div>
            </div>
            <button className="flex justify-center items-center font-semibold w-[150px] lg:w-[10vw] h-[54px] lg:h-[6vh] bg-[#f3f3f6] text-[12px] lg:text-[0.8vw] text-[#ca0000] rounded-full mt-[3vh]">
              {loading ? <ClipLoader size={20} color={"#ca0000"} /> : "Update Profile"}    
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
