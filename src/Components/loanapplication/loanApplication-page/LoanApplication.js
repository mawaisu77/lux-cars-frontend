import React,{useEffect, useState} from 'react'
import Header from "../../header/index"
import { Link } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import CurrencyInput from 'react-currency-input-field';

function LoanApplication() {

    // const listCountryCode=[{symbol:"$", code:"USD"},{symbol:"%", code:"EUR"},{symbol:"$", code:"USD"}]
    // let options = [
    //     { id: 1, name: 'Option 1', description: 'Description for Option 1' },
    //     { id: 2, name: 'Option 2', description: 'Description for Option 2' },
    //     { id: 3, name: 'Option 3', description: 'Description for Option 3' },
    //   ];


let [changeState, changeStateFunction]=useState("")

    let options = [
        { id: 1, name: '$', code: 'USD' },
        { id: 2, name: 'I', code: 'UK'},
        { id: 3, name: 'R', code: 'PK' },
      ];
  const  [selectedOption, setSelectedOption] = useState({});
  
    const handleSelectChange = (e) => {
      const selectedId = parseInt(e.target.value); // Convert value to integer
      const selectedObject = options.find(option => option.id === selectedId);
      setSelectedOption(selectedObject || {});
    };

    useEffect(()=>{
        setSelectedOption(selectedOption)
    },[selectedOption])
    
    return (
        <>
            <div className="Backgroundimage-LogIN ">
                <Header textColor="text-white" />
                {/* Pass textColor as a prop */}
                <div className="w-[15.5] flex flex-col mt-[5.5vh]">
                    <div className="text-[2.6vw] font-semibold text-white">Loan Application</div>
                    <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">

                        <Link to="/">
                            {" "}
                            {/* Assuming '/' is your home route */}
                            <button className="hover:text-white">Home</button>
                        </Link>
                        /<button className="hover:text-white">Loan</button>
                    </div>
                </div>
            </div>


            <div className='w-[42.708vw] mx-auto  rounded-[2.083vw] my-[4.167vh] boxShadow shadow'>
                <div className="px-[4.167vw] py-[4.167vh]  text-left ">
                    <div className=' '>
                        <h1 className="text-[1.354vw] font-semibold text-[#1F1F2C] mb-[1.875vh]  " >Personal Information</h1>
                        <div className=''>
                            <form className=' '>
                                <div>
                                    <h1 className="text-[1.042vw]  font-semibold text-[#1F1F2C] mb-[1.042vh]  " >Title</h1>

                                    <div className=' mb-[1.25vh] bg-[#F8F8F8]  w-[5.208vw] flex items-center h-[46px] rounded-[0.313vw]'>
                                        <select className=' text-[15px] text-[#1F1F2C]  mx-[15px] outline-none font-[400] bg-transparent my-[10px] w-[68px] '>
                                            <option>Mr</option>
                                            <option>Mr.s</option>
                                        </select>
                                    </div>
                                    <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]'>
                                        <div className='flex-1  flex flex-col '>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'> Name*</p>
                                            <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                                            <label className='text-[#667085] font-[400] text-[0.729vw]'>First Name</label>
                                        </div>
                                        <div className='flex-1 flex flex-col '>


                                            <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                                            <label className='text-[#667085] font-[400] text-[0.729vw]'>Last Name</label>

                                        </div>
                                    </div>

                                    <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]'>
                                        <div className='flex-1  flex flex-col '>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Email*</p>
                                            <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />

                                        </div>
                                        <div className='flex-1 flex flex-col overflow-hidden  pb-[5px]'>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Home Phone Number</p>
                                            <PhoneInput inputStyle={{ width: "250px", height: "33px", borderRadius: "8px" }}
                                                isValid={(value, country) => {
                                                    if (value.match(/12345/)) {
                                                        return 'Invalid value: ' + value + ', ' + country.name;
                                                    } else if (value.match(/1234/)) {
                                                        return false;
                                                    } else {
                                                        return true;
                                                    }
                                                }}
                                            />

                                        </div>
                                    </div>

                                    <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]'>
                                        <div className='flex-1  flex flex-col '>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Address*</p>
                                            <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />

                                        </div>
                                        <div className='flex-1 flex flex-col overflow-hidden  pb-[5px]'>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Cell Phone Number</p>
                                            <PhoneInput inputStyle={{ width: "225px", height: "45px", borderRadius: "8px" }}
                                                isValid={(value, country) => {
                                                    if (value.match(/12345/)) {
                                                        return 'Invalid value: ' + value + ', ' + country.name;
                                                    } else if (value.match(/1234/)) {
                                                        return false;
                                                    } else {
                                                        return true;
                                                    }
                                                }}
                                            />

                                        </div>
                                    </div>



                                    <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]'>
                                        <div className='flex-1  flex flex-col '>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>City*</p>
                                            <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />

                                        </div>
                                        <div className='flex-1 flex flex-col overflow-hidden  pb-[5px]'>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Work Phone Number</p>
                                            <PhoneInput inputStyle={{ width: "225px", height: "45px", borderRadius: "8px" }}
                                                isValid={(value, country) => {
                                                    if (value.match(/12345/)) {
                                                        return 'Invalid value: ' + value + ', ' + country.name;
                                                    } else if (value.match(/1234/)) {
                                                        return false;
                                                    } else {
                                                        return true;
                                                    }
                                                }}
                                            />

                                        </div>
                                    </div>


                                    <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]'>
                                        <div className='flex-1  flex flex-col '>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'> Years At Address*</p>
                                            <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                                        </div>
                                        <div className='flex-1 flex flex-col '>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'> Months At Address*</p>
                                            <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                                        </div>
                                    </div>


                                    <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]'>
                                        <div className='flex-1  flex flex-col '>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Residence Type</p>
                                            <div className='flex flex-end mb-[16px]'> <input
                                                type="radio"
                                                value="option1"
                                            />
                                                <label className='ml-[2px] text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist '>Own</label>
                                            </div>
                                            <div className='flex flex-end'><input
                                                type="radio"
                                                value="option1"
                                            />
                                                <label className='ml-[2px] text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist '>Rent</label>
                                            </div>
                                        </div>
                                        <div className='flex-1 flex flex-col '>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'> Months At Address*</p>

                                            {/* <CurrencyInput
                                                id="input-example"
                                                name="input-name"
                                                placeholder="Please enter a number"
                                                defaultValue={1000}
                                                decimalsLimit={2}
                                                onValueChange={(value, name, values) => console.log(value, name, values)}
                                            /> */}
                                            <CurrencyInput prefix="$" intlConfig={{ locale: 'en-US', currency: 'GBP' }} />

                                        </div>
                                    </div>


                                    <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]'>
                                        <div className='flex-1/2   flex flex-col '>
                                            <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Vehicle Information</p>
                                            <div className='flex flex-end mb-[16px]'> <input
                                                type="radio"
                                                value="option1"
                                            />
                                                <label className='ml-[2px] text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist '>New</label>
                                            </div>
                                            <div className='flex flex-end'><input
                                                type="radio"
                                                value="option1"
                                            />
                                                <label className='ml-[2px] text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist '>Pre-owned</label>
                                            </div>
                                        </div>

                                    </div>


                                    <div>
                                        <h1 className="text-[1.354vw] font-semibold text-[#1F1F2C] mb-[1.875vh]  " >Employment Information</h1>
                                        <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]'>
                                            <div className='flex-1  flex flex-col '>
                                                <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Employer Name*</p>
                                                <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />

                                            </div>
                                            <div className='flex-1 flex flex-col overflow-hidden  pb-[5px]'>
                                                <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Employer’s Phone* </p>
                                                <PhoneInput inputStyle={{ width: "225px", height: "45px", borderRadius: "8px" }}
                                                    isValid={(value, country) => {
                                                        if (value.match(/12345/)) {
                                                            return 'Invalid value: ' + value + ', ' + country.name;
                                                        } else if (value.match(/1234/)) {
                                                            return false;
                                                        } else {
                                                            return true;
                                                        }
                                                    }}
                                                />

                                            </div>
                                        </div>
                                        <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]'>
                                            <div className='flex-1  flex flex-col '>
                                                <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'> Occupation*</p>
                                                <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                                            </div>
                                            <div className='flex-1 flex flex-col '>

                                                <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'> Years At Employer*</p>
                                                <input className=" border border-[#EBEBEB] h-[44px] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                                                {/* <label className='text-[#667085] font-[400] text-[0.729vw]'>Years At Employer*</label> */}

                                            </div>
                                        </div>

                                        <div className='xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]'>
                                            <div className='flex-1/2 flex flex-col overflow-hidden  pb-[5px]'>
                                                <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Gross Monthly Income (cash/tips/etc)* </p>
                                                <PhoneInput inputStyle={{ width: "225px", height: "45px", borderRadius: "8px" }}
                                                    isValid={(value, country) => {
                                                        if (value.match(/12345/)) {
                                                            return 'Invalid value: ' + value + ', ' + country.name;
                                                        } else if (value.match(/1234/)) {
                                                            return false;
                                                        } else {
                                                            return true;
                                                        }
                                                    }}
                                                />

                                            </div>
                                        </div>
                                    </div>



                                    <div className=' '>
                                        <h1 className="text-[1.354vw] font-semibold text-[#1F1F2C] mb-[1.875vh]  " >Financial Information</h1>


                                        <div className='w-[300px] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]'>
                                            <div className='w-[80%] flex-1/2 flex flex-col overflow-hidden  pb-[5px]'>
                                                <p className='text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]'>Name Of Bank* </p>
                                                <div className='  mb-[1.25vh] bg-[#F8F8F8]  w-[100%] flex items-center h-[46px] rounded-[0.313vw]'>
                                                    <select className=' text-[15px] text-[#1F1F2C]  mx-[15px] outline-none font-[400] bg-transparent my-[10px] w-[100%] '>
                                                        <option>Mr</option>
                                                        <option>Mr.s</option>
                                                    </select>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='w-[300px] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]'>
                                            <div className='w-[80%] flex-1/2 flex flex-col overflow-hidden  pb-[5px]'>
                                                <div className='  mb-[1.25vh]   w-[100%] flex items-center h-[46px] rounded-[0.313vw]'>
                                                   <div className='flex gap-x-[8px]'>
                                                    <div>
                                                    <label class="switch">
                                                        <input type="checkbox"  />
                                                        <span class="slider round"></span>
                                                    </label>
                                                    </div>
                                                    <div><p>Checking Account</p>
                                                    <p>No</p></div>
                                                   </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='w-[300px] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]'>
                                            <div className='w-[80%] flex-1/2 flex flex-col overflow-hidden  pb-[5px]'>
                                                <div className='  mb-[1.25vh]   w-[100%] flex items-center h-[46px] rounded-[0.313vw]'>
                                                   <div className='flex gap-x-[8px]'>
                                                    <div>
                                                    <label class="switch">
                                                    <input type="checkbox" checked />
                                                        <span class="slider round"></span>
                                                    </label>
                                                    </div>
                                                    <div><p>Savings Account</p>
                                                    <p>Yes</p></div>
                                                   </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>


            {/* <div className='w-[73.281vw] h-[10vh] border mx-auto bg-red-200'></div> */}
            <div>
      <h2>Select Object Example</h2>
      {/* <select onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {options && options.map(option => (
           <> <option className='mb-[9rem]' key={option.id} value={option.name}>
           {option.name}
         </option></>
        ))}
      </select> */}
        
    {/* <div className='relative bg-red-400'>
    <select onChange={handleSelectChange}> */}
        {/* <option value="">Select an option</option> */}
        {/* {options && options.map(option => (
           <> <input type='text' placeholder='Enter your text' className='absolute top-0 left-0 z-1 border w-[700px] bg-pink-400'/>
           <option className='mb-[9rem] absolute z-10' key={option.id} value={option.name}>
           <div>{option.code}</div>
         </option>
         </>
        ))}
      </select>   
    </div> */}


    </div>


    <div className='relative bg-red-400'>
  <div className='absolute top-10 left-0 z-10'>
    <input type='text' placeholder={changeState} value={changeState} className=' w-64 border bg-pink-400' />
  </div>
  <div className='absolute top-0 left-64 z-0'>
    <select onChange={handleSelectChange} className='border w-64 bg-pink-400'>
      {options && options.map(option => (
        <option key={option.id} value={option.name}>
          {/* {option.code} */}
          {changeState=option.code}
        </option>
      ))}
    </select>
  </div>
</div>

        </>
    )

}

export default LoanApplication