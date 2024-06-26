import React from 'react'
import image31 from "../../../assets/HCards/Avatar.png"
import image32 from "../../../assets/HCards/IMG (20).png"
import image33 from "../../../assets/HCards/IMG (21).png"
import image34 from "../../../assets/HCards/IMG (22).png"
import image35 from "../../../assets/HCards/2 (1).png"
import image41 from "../../../assets/HCards/logoIAAI.png"
import image42 from "../../../assets/HCards/IMG (23).png"
import image43 from "../../../assets/HCards/2 (2).png"
import image44 from "../../../assets/HCards/IMG (24).png"
import image45 from "../../../assets/HCards/IMG (25).png"
const Partners = () => {
  const partners = [
    {
      logo: image31,
      name: "Carport",
      numbers: "76300 vehicles",
      img1: image32,
      img2: image33,
      img3: image34,
      img4: image35,
    },
    {
      logo: image41,
      name: "IAAI",
      numbers: "76300 vehicles",
      img1: image42,
      img2: image43,
      img3: image45,
      img4: image44,
    }
  ]

  return (
    <div className="h-[830px] lg:h-[80vh] w-[100%] lg:w-[98.9vw]  bg-[#f8f8f8]">
      <div className="">
        <div className="flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw] pt-[9.5vh]">
          Popular Partners
          
        </div>
        <hr className='h-1 bg-red-500 w-20 mx-auto mt-8' />
        <div className='flex flex-col lg:flex-row gap-4 justify-center  mx-auto  w-[350px] lg:w-[50vw] mt-[6.5vh]'>
          {partners.map((partner, index) => (
            <div key={index} className='w-[337px] lg:w-[23.4vw] h-[295px] lg:h-[43.3vh] bg-white rounded-2xl shadow-xl mx-[1vw]'>
              <div className= 'p-3 lg:p-[1vw]'>
                <div className='flex justify-between   gap-[1vw]'>
                  <img className='w-[48px] lg:w-[4.1vw]  h-[48px] lg:h-[8vh]' src={partner.logo} alt="Logo" />
                  <div className='text-left'>
                    <p className='font-urbanist font-semibold text-[18px] lg:text-[1.3vw]'>
                      {partner.name}
                    </p>
                    <p className='font-urbanist text-[14px] lg:text-[0.7vw] text-[#6d6d6d]'>
                      {partner.numbers}
                    </p>
                  </div>
                  <button className='text-[#ca0000] border border-[#ca0000] font-urbanist font-semibold text-[13px] lg:text-[0.91vw] px-[22px] py-[9px] lg:h-[5vh] lg:w-[9vw] rounded-full'>
                    See Inventory
                  </button>
                </div>
                <div className='flex gap-[1vw] mt-[2vh]'>
                  <div>
                    <img className='h-[204px] lg:h-[29.5vh] w-[142px] lg:w-[9.5vw]' src={partner.img1} alt="Image1" />
                  </div>
                  <div>
                    <div className='flex gap-[1vw]'>
                      <img className='w-[75px] lg:w-[5vw] h-[75px] lg:h-[10vh]' src={partner.img2} alt="Image2" />
                      <img className='w-[75px] lg:w-[5vw] h-[75px] lg:h-[10vh]' src={partner.img4} alt="Image4" />
                    </div>
                    <div className='mt-2 lg:mt-[2vh]'>
                      <img className='w-[157px] lg:w-[11vw] h-[121px] lg:h-[17vh]' src={partner.img3} alt="Image3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Partners
