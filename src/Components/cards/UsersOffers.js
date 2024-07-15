import React from 'react'
import { TfiReload } from "react-icons/tfi";
import { IoMdHeartEmpty } from "react-icons/io";
import image1 from '../../assets/User-pics/IMG (46).png'
import image2 from '../../assets/User-pics/IMG (47).png'

const UsersOffers = () => {
    const UserCard = [
        {
          carPic: image1,
          model: `"2018 BMW X1 DRIVE"`,
          name: "Mark Allen",
          lot: "Lot:38498458",
          Damage: "Damage: Engine Damage",
          Destination: "Location: YorkTown",
          resived: "Offer recived",
          amount: "76,500$",
          view: "View history"
        },
        {
          carPic: image1,
          model: `"2018 BMW X1 DRIVE"`,
          name: "Mark Allen",
          lot: "Lot:38498458",
          Damage: "Damage: Engine Damage",
          Destination: "Location: YorkTown",
          resived: "Offer recived",
          amount: "76,500$",
          view: "View history"
        }, {
          carPic: image1,
          model: `"2018 BMW X1 DRIVE"`,
          name: "Mark Allen",
          lot: "Lot:38498458",
          Damage: "Damage: Engine Damage",
          Destination: "Location: YorkTown",
          resived: "Offer recived",
          amount: "76,500$",
          view: "View history"
        }, {
          carPic: image1,
          model: `"2018 BMW X1 DRIVE"`,
          name: "Mark Allen",
          lot: "Lot:38498458",
          Damage: "Damage: Engine Damage",
          Destination: "Location: YorkTown",
          resived: "Offer recived",
          amount: "76,500$",
          view: "View history"
        },  
        // You can add more objects here
      ];
    
      return (
        <div className='flex flex-wrap gap-x-5 justify-center items-center gap-y-10 mt-[10vh]'>
          {UserCard.map((card, index) => (
            <div key={index} className='w-[17.5vw] h-[60vh]  rounded-xl shadow-xl py-3'>
              <div className='relative'>
                <img src={card.carPic} className='w-[15.5vw] h-[30vh] rounded-xl mx-auto' />
                <div className='flex justify-center items-center absolute w-[4vw] h-[3.8vh] bg-black text-[white] rounded-lg top-3 right-6'>
                  <IoMdHeartEmpty />
                  100
                </div> 
              </div>
    
              <div>
                <div className='text-left px-3 border-b font-urbanist'>
                  <p className='font-semibold text-[1.12vw] py-2'>
                    {card.model}
                  </p>
                
                    <div className='flex gap-3'>
                    <div>
                    <img src={image2} className='w-[2.86vw] h-[6vh] rounded-lg'/>
                    </div>
                
                <div>
                <p className='text-[0.9vw] font-semibold'>
                    {card.name}
                  </p>
                  <div className='text-[0.8vw] text-[#7a798a] py-2'>
                    <p>{card.lot}</p>
                    <p>{card.Damage}</p>
                    <p>{card.Destination}</p>
                  </div>
                    </div>
                        </div>     
                
                </div>
                <div className='flex px-3 justify-between border-t py-2'>
                  <div>
                    <p className='text-[0.8vw] text-[#7a798a]'>{card.resived}</p>
                    <p className='text-[1.1vw] font-semibold'>{card.amount}</p>
                  </div>
                  <div className='flex justify-center items-center text-right lg:gap-[0.3vw]'>
                    <button className='w-[4.8vw] h-[3.5vh] bg-red-600 text-white font-urbanist text-[1vw] rounded-3xl'>
                        Accept
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
             
        </div>
      );
    }

export default UsersOffers