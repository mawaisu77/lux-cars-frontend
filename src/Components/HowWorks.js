import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
 import icon1 from "../assets/Icon (2).svg"
import icon2 from "../assets/Icon (3).svg"
import icon3 from "../assets/Icon (4).svg";
import icon4 from "../assets/Icon (5).svg";
import icon5 from "../assets/Order_history.svg"

const HowWorks = () => {
  return (
    <>
      <div className="Backgroundimage-How">
        <Header className="text-white" />
        <div className="w-[15.5] flex flex-col  mt-[5.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            How It Works
          </div>

          <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist ">
            <Link to="/">
              {" "}
              <button className="hover:text-white  ">Home</button>
            </Link>
            /<button className="hover:text-white">How it Works</button>
          </div>
        </div>
      </div>

      <div className="h-[150vh] w-[91vw] mx-auto">
      <div className='flex flex-col mx-auto mt-[8.6vh]  w-[33vw]'>
     <p className=" text-[2vw]  font-bold font-urbanist">Step-by-Step Guide for Users </p> 
     <p className="text-[0.9vw] text-[#7a798a]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos
quae quo ad iste ipsum officiis deleniti asperiores sit.</p>





  </div>
  <div className="w-[74vw] mx-auto mt-[5vh]  ">
     <div className=" flex justify-between items-center gap-[2.5vw]  w-[34vw] h-[20.3vh]  ">
          <div className="text-right w-[30vw] h-[18vh]">
            <p className="font-urbanist  text-[1.2vw] font-bold mb-[1.5vh]">
                Registration
            </p>
            <p className="text-[1vw] font-urbanist text-[#7a798a]">
            Users must register to start bidding. The registration process is straightforward and requires providing official identification documents for verification.
            </p>

          </div>
          <div className="flex justify-center items-center w-[9vw] h-[16.5vh] hover:bg-[#df4949] hover:text-white rounded-3xl shadow-lg">
          <img src={icon1} className="hover:"/>
          </div>
          
     </div>     
</div>



<div className="flex justify-between w-[74vw] mx-auto mt-[5vh] ">
     <div className=" flex justify-between items-center gap-[2.5vw]  w-[34vw] h-[20.3vh]  ">
         
          
     </div>   
     <div className="flex justify-between items-center gap-[2.5vw]  w-[34vw] h-[20.3vh]  ">
     <div className="flex justify-center items-center w-[9vw] h-[16.5vh] rounded-3xl shadow-lg hover:bg-[#df4949] hover:text-white">
             <img src={icon2}/>
          </div>

     <div className="text-left w-[30vw] h-[18vh]">
            <p className="font-urbanist  text-[1.2vw] font-bold mb-[1.5vh]">
                Big Power
            </p>
            <p className="text-[1vw] font-urbanist text-[#7a798a]">
            Upon registration, users can set their bid power, determining the maximum amount they can bid on any lot. Bid power is secured with a refundable deposit, payable via various methods.
            </p>

          </div>
         
      </div>  
</div>

<div className="w-[74vw] mx-auto mt-[5vh]  ">
     <div className=" flex justify-between items-center gap-[2.5vw]  w-[34vw] h-[20.3vh]  ">
          <div className="text-right w-[30vw] h-[18vh]">
            <p className="font-urbanist  text-[1.2vw] font-bold mb-[1.5vh]">
                Vehical Search
            </p>
            <p className="text-[1vw] font-urbanist text-[#7a798a]">
            Users can utilize advanced filters and online search functionality to find specific lots. Detailed lot information is provided to assist in making informed choices.
            </p>

          </div>
          <div className="flex justify-center items-center w-[9vw] h-[16.5vh] rounded-3xl shadow-lg hover:bg-[#df4949] hover:text-white">
          <img src={icon3} />
          </div>
          
     </div>     
</div>


<div className="flex justify-between w-[74vw] mx-auto mt-[5vh]  ">
     <div className=" flex justify-between items-center gap-[2.5vw]  w-[34vw] h-[20.3vh]  ">
         
          
     </div>   
     <div className="flex justify-between items-center gap-[2.5vw]  w-[34vw] h-[20.3vh]  ">
     <div className="flex justify-center items-center w-[9vw] h-[16.5vh] rounded-3xl shadow-lg hover:bg-[#df4949] hover:text-white ">
    <img src={icon4} />
          </div>

     <div className="text-left w-[30vw] h-[18vh]">
            <p className="font-urbanist  text-[1.2vw] font-bold mb-[1.5vh]">
                Bidding and Buying
            </p>
            <p className="text-[1vw] font-urbanist text-[#7a798a]">
            Users can bid on lots online without requiring a license. Once a bid is successful, users can pay the auction invoice, and the platform handles the rest, including vehicle pickup and delivery to the designated port.
            </p>

          </div>
         
      </div>  
</div>



<div className="w-[74vw] mx-auto mt-[5vh]  ">
     <div className=" flex justify-between items-center gap-[2.5vw]  w-[34vw] h-[20.3vh]  ">
          <div className="text-right w-[30vw] h-[18vh]">
            <p className="font-urbanist  text-[1.2vw] font-bold mb-[1.5vh]">
                Order Tracking
            </p>
            <p className="text-[1vw] font-urbanist text-[#7a798a]">
            The platform offers online order tracking, providing users with updates on their car delivery. Notifications are sent at each step of the process, including photos and interim status changes
            </p>

          </div>
          <div className="flex justify-center items-center w-[9vw] h-[16.5vh] rounded-3xl shadow-lg hover:bg-[#df4949] hover:text-white">
             <img src={icon5} className="text-yellow-600" style={{color:"yellow"}} color="yellow"/>
          </div>
        
          
     </div>     
</div>





      </div>
    </>
  );
};

export default HowWorks;
