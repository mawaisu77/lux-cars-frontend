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
            <div className="back-image-Help ">
                <Header className="text-white" />
                <div className="w-[15.5] flex flex-col  mt-[5.5vh]">
                    <div className="text-[2.6vw] font-semibold text-white">Help</div>

                    <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist ">
                        <Link to="/">
                            {" "}
                            <button className="hover:text-white  ">Home</button>
                        </Link>
                        /<button className="hover:text-white">Help</button>
                    </div>
                </div>
            </div>
            <div className="h-[100vh]  w-[74vw] mx-auto">
                <div className="flex flex-col mx-auto mt-[8.6vh]  w-[33vw]">
                    <p className=" text-[1.7vw]  font-bold font-urbanist">
                        How Can We Help You?
                    </p>
                    <p className="text-[0.9vw] text-[#7a798a]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
                        obcaecati dignissimos quae quo ad iste ipsum officiis deleniti
                        asperiores sit.
                    </p>
                    <form className="space-y-4">
                        <div className="flex items-center border rounded-xl my-[5vh]">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="sm:w-[300px] md:w-[400px] lg:w-[36vw] h-[6.23vh] rounded-l-xl pl-2 text-[1vw]"
                                placeholder="Type your question here"
                            />
                            <div className="flex h-[6.23vh] w-[4.5vw] justify-center items-center bg-red-700 rounded-r-xl">
                                <GoSearch size={27} color="white" />
                            </div>
                        </div>
                    </form>
                    <div className="text-[0.9vw] text-[#7a798a]">
                        Or choose a categories to quickly find the help you need
                    </div>
                </div>
                <div className="mt-[6vh]  flex flex-wrap justify-center gap-[1vw] gap-y-6">
                    {helpItems.map((item, index) => (
                        <div key={index} className="flex flex-col gap-[0.7vh] justify-center items-center w-[17.25vw] h-[25vh] shadow-lg rounded-xl ">
                            <div className="flex justify-center items-center rounded-xl w-[3vw] h-[6vh] bg-red-500 ">
                                {item.icon}
                            </div>
                            <p className="text-[1.3vw] font-urbanist font-semibold">{item.heading}</p>
                            <p className="text-[0.68vw] font-urbanist text-[#7a798a] w-[15vw]">{item.p}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Help;

