import React from "react";
import { Link } from "react-router-dom";
import Header from "../../header/Header/Header";
import { GoSearch } from "react-icons/go";
import { GrSend } from "react-icons/gr";
import { BiSolidFolderPlus } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs";

const Help = () => {
    const helpItems = [
        {
            icon: <GrSend color="white" size={20}/>,
            heading: "Get Started",
            p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
        },
        {
            icon: <BiSolidFolderPlus size={25} color="white" />,
            heading: "Creating",
            p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
        },
        {
            icon: <BsCartFill  size={25} color="white"/>,
            heading: "Buying",
            p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
        },
        {
            icon: <BiSolidFolderPlus size={25} color="white" />,
            heading: "selling",
            p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
        },
        {
            icon: <GrSend  size={25} color="white" />,
            heading: "Partners",
            p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
        },
        {
            icon: <BsCartFill  size={25} color="white"/>,
            heading: "Bidders",
            p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
        },
    ];

    return (
        <>
    <Header className="text-white" />
     <div className='back-image-Help'>
      <div className='hidden lg:block'>
        <div className='w-[15.5] flex flex-col pt-[12.5vh]'>
          <div className='text-[2.6vw] font-semibold text-white'>
            Help
          </div>
          <div className='text-white flex gap-3 justify-center text-[1vw] font-urbanist'>
            <Link to="/">
              <button className='hover:text-white hover:text-[1.1vw]'>Home</button>
            </Link>
            /
            <button className='hover:text-white hover:text-[1.1vw]'>Help</button>
          </div>
        </div>
      </div>
    </div>
            <div className="h-[2000px] lg:h-[100vh] w-[342px]   md:w-[500px] lg:w-[74vw] mx-auto">
                <div className="flex flex-col mx-auto mt-[100px] lg:mt-[8.6vh] w-[342px]   md:w-full  lg:w-[33vw]">
                    <p className=" text-[30px] lg:text-[1.7vw]  font-bold font-urbanist">
                        How Can We Help You?
                    </p>
                    <p className="text-[18px] lg:text-[0.9vw] text-[#7a798a]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
                        obcaecati dignissimos quae quo ad iste ipsum officiis deleniti
                        asperiores sit.
                    </p>
                    <form className="space-y-4">
                        <div className="flex justify-between items-center border rounded-xl my-[5vh]">
                            <input
                                type="text"
                                 
                                className="sm:w-[342px] md:w-[500px] lg:w-[36vw] h-[6.23vh] rounded-l-xl pl-2 text-[18px] lg:text-[1vw]"
                                placeholder="Type your question here"
                            />
                            <div className="flex h-[64px] lg:h-[6.23vh] w-[90px] lg:w-[4.5vw] justify-center items-center bg-red-700 rounded-r-xl">
                                <GoSearch size={27} color="white" />
                            </div>
                        </div>
                    </form>
                    <div className="text-[18px] lg:text-[0.9vw] text-[#7a798a]">
                        Or choose a categories to quickly find the help you need
                    </div>
                </div>
                <div className="mt-[6vh]  flex flex-wrap justify-center gap-10 lg:gap-[1vw] gap-y-6">
                    {helpItems.map((item, index) => (
                        <div key={index} className="flex flex-col gap-[0.7vh] justify-center items-center border w-[330px] lg:w-[17.25vw] h-[230px] lg:h-[25vh] shadow-lg rounded-xl ">
                            <div className="flex justify-center items-center rounded-xl w-[60px] lg:w-[3vw] h-[60px] lg:h-[6vh] bg-red-500 ">
                                {item.icon}
                            </div>
                            <p className="text-[20px] lg:text-[1.3vw] font-urbanist font-semibold">{item.heading}</p>
                            <p className="text-[13px] lg:text-[0.68vw] font-urbanist text-[#7a798a] w-[284px] lg:w-[15vw]">{item.p}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Help;

