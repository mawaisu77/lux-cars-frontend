import Header from "../header/index";
import { Link } from "react-router-dom";
// import Image_Placeholder(1) from "../"
// import Image1 from "../../../assets/fees/Image_Placeholder.png"

import image from "../../../src/assets/fees/Image Placeholder.png"
import image1 from "../../../src/assets/fees/Image_Placeholder(1).png"
import image2 from "../../../src/assets/fees/repeat.png"
import image3 from "../../../src/assets/fees/Horizontal - White0 1.png"
import { PiUsersFill } from "react-icons/pi";

function Feespage() {
  return (
    <>
      <div className="bg-fees">
        <Header className="text-white" />
        <div className="hidden  lg:block">
          <div className="  w-[15.5] flex flex-col  mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Fees Overview
            </div>

            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                {" "}
                <button className="hover:text-white  ">Home</button>
              </Link>
              /<button className="hover:text-white">Fees Overview</button>
            </div>
          </div>
        </div>
      </div>

      
     <div className="w-auto px-[16px] md:px-[0px] w-[100%] md:w-[80vw]  lg:w-[73.177vw]  mx-auto md:mt-[4.167vh] :md:mb-[4.167vh] mt-[70px] mb-[70px]">
        <div className="md:flex md:justify-between ">
          <div className='w-auto w-[100%] md:w-[44vw] lg:w-[38.073vw] '>
            <div className="">
            <h1 className="text-left text-[36px] md:text-[1.875vw]  font-[700] text-[#1F1F2C] font-urbanist md:mb-[1.25vh] mb-[40px]">Bidding at LUX</h1>
            <div className="relative">
            <img src={image1} className="w-auto"/>
            <img src={image3} className=" w-[200px] md:w-[14vw] absolute top-[56px] md:top-[10.917vh] left-[25px] md:left-[1.5vw]"/>
            </div>
            </div>
            <div className="md:mt-[1.25vh]  mt-[40px]">
              <h2 className="text-left text-[24px] md:text-[1.25vw] font-[700] text-[#1F1F2C] font-urbanist">Advantages Of Bidding Through Lux First Choice Cars</h2>
             <div className="mt-[35px] mb-[35px] md:mb-[0px] md:mt-[0.833vh] flex flex-wrap justify-center md:justify-start gap-[12px]">
              
              <div className="rounded-[0.938vw] flex items-center w-[45%] md:w-[13vw] w-[45%] lg:w-[10.292vw] h-[25vh] shadow ">
                <div className="mx-[1.1vw]  ">
                <div className="h-[8vh]  md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className="text-[16px] md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">no dealer  <br />
                license required</h2>
                </div>
              </div>
              <div className="rounded-[0.938vw] flex items-center w-[45%] md:w-[13vw] w-[45%] lg:w-[10.292vw] h-[25vh] shadow ">
                <div className="mx-[1.1vw]  ">
                <div className="h-[8vh] md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
                no annual <br />
                membership fee
                  </h2>
                </div>
              </div>
              <div className="rounded-[0.938vw] flex items-center md:w-[13vw] lg:w-[10.292vw] h-[25vh] shadow ">
                <div className="mx-[1.1vw]  ">
                <div className="h-[8vh] md:w-[4.5vw] lg:w-[3.5vw]  text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
                ability to search  <br />
                two auctions
                 </h2>
                </div>
              </div>
              <div className="rounded-[0.938vw] flex items-center w-[46%] md:w-[13vw] lg:w-[10.292vw] h-[190px] md:h-[25vh] shadow ">
                <div className="mx-auto md:mx-[1.1vw]  text-center">
                <div className="h-[8vh] w-[55px] md:w-[4.5vw] lg:w-[3.5vw]  text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
                availability of <br />full vehicle<br /> descriptions<br /> and details
                 </h2>
                </div>
              </div>
              <div className="rounded-[0.938vw] flex items-center w-[43%] md:w-[13vw] lg:w-[10.292vw] h-[180px] md:h-[25vh] shadow ">
                <div className="mx-auto md:mx-[1.1vw]  ">
                <div className="h-[8vh] w-[50px] md:w-[4.5vw] lg:w-[3.5vw]  text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
                helps buyers<br /> avoid <br />purchasing<br /> staged cars
                  
                </h2>
                </div>
              </div>
             </div>
            </div>
          </div>
          <div className="w-[100%] md:w-[33.542vw] md:mt-[0vw] mt-[140px] ">
            <div>
              <h2 className="text-left text-[30px] md:text-[1.875vw] font-[700] text-[#1F1F2C] font-urbanist mb-[1.25vh]">Bidding at COPART / IAAI</h2>
              <img src={image}/> 
            </div>
            
              <h2 className="text-left text-[20px] md:text-[1.35vw] font-[700] text-[#1F1F2C] font-urbanist mb-[1.25vh]">drawbacks of bidding directly t Copart/IAAI auctions</h2>

              <div className="mt-[0.833vh] flex flex-wrap  gap-[12px]">
              
              <div className="rounded-[0.938vw] flex items-center w-[45%]  md:w-[13vw] lg:w-[10.292vw] h-[25vh] shadow ">
                <div className="mx-auto md:mx-[1.1vw]  ">
                <div className="h-[8vh]  w-[55px] md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
                requirement for <br /> a dealer/broker<br /> license
                 </h2>
                </div>
              </div>
              <div className="rounded-[0.938vw] flex items-center  w-[45%] md:w-[13vw] lg:w-[10.292vw] h-[25vh] shadow ">
                <div className="mx-auto md:mx-[1.1vw]  ">
                <div className="h-[8vh]  w-[55px] md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
                annual <br />membership fee<br /> at both sites
                </h2>
                </div>
              </div>
              <div className="rounded-[0.938vw] flex items-center w-[45%] md:w-[13vw] lg:w-[10.292vw] h-[25vh] shadow ">
                <div className="mx-auto md:mx-[1.1vw]  ">
                <div className="h-[8vh]  w-[55px] md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
                separate<br /> deposits for <br />each auction
                 </h2>
                </div>
              </div>
              <div className="rounded-[0.938vw] flex items-center w-[45%]  md:w-[13vw] lg:w-[10.292vw] h-[25vh] shadow ">
                <div className="mx-auto md:mx-[1.1vw]  ">
                <div className="h-[8vh]  w-[55px] md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
                shorter vehicle <br />descriptions <br />and details
               </h2>
                </div>
              </div>
              <div className="rounded-[0.938vw] flex items-center  w-[45%] md:w-[13vw] lg:w-[10.292vw] h-[25vh] shadow ">
                <div className="mx-auto md:mx-[1.1vw]  ">
                <div className=" h-[8vh]  w-[55px] md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">
                higher public <br /> fees <br />
                available
                    
                </h2>
                </div>
              </div>
              <div className="rounded-[0.938vw] flex items-center w-[45%] md:w-[13vw] lg:w-[10.292vw] h-[25vh] shadow ">
                <div className="mx-auto md:mx-[1.1vw]  ">
                <div className="h-[8vh] md:w-[4.5vw] lg:w-[3.5vw] text-white bg-[#DF4949] rounded-[0.938vw] flex items-center mx-[30px] mb-[0.781vh]">
                <PiUsersFill size={25} className="mx-auto"/>
                </div>
                <h2 className=" md:text-[1.042vw]  font-[700] text-[#1F1F2C] font-urbanist">increased risk of <br/>purchasing <br/>staged vehicles
                </h2>
                </div>
              </div>
             </div>
          </div>
        </div>
       <div className="md:mt-[3vh] mt-[100px] md:mb-[3vh] mb-[100px]" >
        <h2  className="text-left text-[36px] md:text-[1.25vw] font-[700] text-[#1F1F2C] font-urbanist">Fees:</h2>
        <p  className="text-left text-[17px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">Copart buyer fees are charged for all vehicles and other items purchased at a Copart auction, including miscellaneous salvage items sold as “Other Goods.” Different fees are assessed for individual/public buyers and business buyers with valid licenses on file. Fee may differ depending on the amount of the winning bid.</p>
        <div className="text-left flex gap-[10px] md:gap-[0.521vw] mt-[1.563vh] mb-[0.833vh]">
          <button className="py-[10px] md:py-[0.521vh] px-[17px] md:px-[0.885vw] rounded-[6px] md:rounded-[0.313vw] bg-[#CA0000] text-[15px]  md:text-[0.781vw] font-[500] text-[#FFFFFF] font-urbanist">COPART</button>
          <button  className="py-[10px] md:py-[0.521vh] px-[17px] md:px-[0.885vw] rounded-[6px] md:rounded-[0.313vw] bg-[#F8F8F8] text-[15px] md:text-[0.781vw] font-[500] text-[#1F1F2C] font-urbanist">IAAI</button>
        </div>
       </div>
       <div className=" w-[66.823vw] mx-auto mb-[50px] md:mb-[1.719vh]">
        
        <div className="flex flex-wrap justify-between">
        <div className="text-left flex flex-wrap gap-[0.417vw] items-center">
          <div className="rounded-[2.396vw] bg-[#D8ECFF] w-[20px] h-[20px] lg:w-[1.802vw] md:w-[2.5vw] md:h-[4vh] lg:h-[3.3vh] flex items-center justify-center">
            <img src={image2}  className="w-[70%] md:w-[1vw]"/> 
          </div>
          <h2  className="text-left text-[10px] md:text-[0.938vw] font-[600] text-[#131313] font-urbanist">Buyer Fees Lists</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center  gap-[0.417vw]">
          <select className="md:w-[6.5vw] lg:w-[5vw] rounded-[4px] md:rounded-[0.417vw] border border-[#131313] outline-none h-[2.781vh] text-left text-[10px] md:text-[0.5vw] lg:text-[0.529vw] font-[400] font-urbanist">
            <option className="">General fee</option>
            <option>General fee</option>
            <option>General fee</option>
          </select>
          <div className="md:w-[1.8vw] lg:w-[1.042vw] h-[2.5vh] flex items-end justify-center border rounded-[0.217vw]">
            <p className="text-[#292D32]">...</p>
          </div>
        </div>
       
        </div>
        <div className="flex justify-between mt-[15px] md:mt-[0.833vh] mr-[1.875vw]">
          <h2  className="text-left text-[10px] md:text-[0.938vw] font-[600] text-[#131313] font-urbanist">Sale Price Range</h2>
          <h2  className="text-left text-[10px] md:text-[0.938vw] font-[600] text-[#131313] font-urbanist">Standard Vehicle Fee</h2>
        </div>
        <hr  className="bg-[#131313] opacity-[35%] mt-[0.521vh] mb-[0.833vh]"/>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw]  mb-[20px]  md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw]  mb-[20px]  md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw]  mb-[20px]  md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw]  mb-[20px]  md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw] mb-[20px]  md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <button  className="text-left text-[15px] md:text-[0.781vw] rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] py-[0.833vh] px-[2.083vh] font-[700] text-[#CA0000] font-urbanist">Load More</button>
       </div>
       <div className=" w-[66.823vw] mx-auto  mb-[20px] md:mb-[1.719vh]">
        
        <div className="flex flex-wrap justify-between">
        <div className="text-left flex items-center flex-wrap gap-[0.417vw]">
          <div className="rounded-[2.396vw] bg-[#D8ECFF] lg:w-[1.802vw] w-[20px] h-[20px] md:w-[2.5vw] md:h-[4vh] lg:h-[3.3vh] flex items-center justify-center">
            <img src={image2}  className="w-[70%] md:w-[1vw]"/> 
          </div>
          <h2 className="text-left text-[18px] md:text-[0.938vw] font-[600] text-[#7A798A] font-urbanist">Virtual Bid Fee</h2>
        </div>
        <div className="hidden md:flex flex-wrap justify-center items-center  gap-[0.417vw]">
          <select className="md:w-[6.5vw] lg:w-[5vw] rounded-[0.417vw] border border-[#131313] outline-none h-[2.781vh] text-left md:text-[0.5vw] lg:text-[0.529vw] font-[400] font-urbanist">
            <option className="">General fee</option>
            <option>General fee</option>
            <option>General fee</option>
          </select>
          <div className="md:w-[1.8vw] lg:w-[1.042vw] h-[2.5vh] flex items-end justify-center border rounded-[0.217vw]">
            <p className="text-[#292D32]">...</p>
          </div>
        </div>
        
        </div>
        <div className="flex justify-between mt-[15px] md:mt-[0.833vh] mr-[1.875vw]">
          <h2  className="text-left text-[10px] md:text-[0.938vw] font-[600] w-[26.823vw]  text-[#131313] font-urbanist">Sale Price Range</h2>
          <h2  className="text-left text-[0.938vw] hidden md:flex font-[600] text-[#131313] font-urbanist">Pre Bid Fee</h2>
          <h2  className="text-left text-[10px] md:text-[0.938vw] font-[600] text-[#131313] font-urbanist">Standard Vehicle Fee</h2>
        </div>
        <hr  className="bg-[#131313] opacity-[35%] mt-[0.521vh] mb-[0.833vh]"/>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw]   mb-[20px]  md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw]   mb-[20px]  md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw]   mb-[20px]  md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw] mb-[20px]  md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <div className="flex justify-between mt-[0.833vh] mr-[1.875vw] mb-[20px] md:mb-[1.302vh]">
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
          <h2  className="text-left text-[13px] md:text-[0.938vw] font-[500] text-[#7A798A] font-urbanist">$0.01 - $49.99</h2>
        </div>
        <button  className="text-left text-[15px] md:text-[0.781vw] rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] py-[0.833vh] px-[2.083vh] font-[700] text-[#CA0000] font-urbanist">Load More</button>
       </div>
       <div className="mt-[30px] md:mt-[1.563vh]">
        <h2  className="text-left text-[24px] md:text-[1.25vw] font-[700] text-[#1F1F2C] font-urbanist mb-[30px] md:mb-[0vh]">Gate fee</h2>
        <p  className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">A $79 Gate Fee is assessed to all Copart purchases. This fee covers administrative costs and the movement of the item from our storage location to the Buyer loading area.</p>
        
       </div>

       <div className="mt-[30px] md:mt-[1.563vh]">
        <h2  className="text-left text-[24px] md:text-[1.25vw] font-[700] text-[#1F1F2C] font-urbanist mb-[30px] md:mb-[0vh]">Late Fees, Storage Fees, Mailing Fees, and Relist Fees:</h2>
        <p  className="text-left text-[15px] md:text-[0.938vw]  font-[400] text-[#7A798A] font-urbanist">The vehicle amount and all applicable fees must be paid within 3 business days of purchase, including the day of sale, to avoid a fee of $50 per vehicle (late fee). Storage rates may vary by location. If the lot is not paid in full within 8 calendar days (including the day of sale), the vehicle will be relisted. The Relist Fee will be 10% of the final sale price with a minimum of $750. Mailing fee $50 is applicable for each won lot.</p>
       </div>

      </div> 
      
    </>
  );
}

export default Feespage;
