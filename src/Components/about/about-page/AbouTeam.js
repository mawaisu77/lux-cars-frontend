import React from 'react';
import { team } from '../../../data/data';

const AbouTeam = () => {
  return (
    <>
      <div className='  w-full mx-auto bg-[#f8f8f8]  py-[9.3vh]'>
        <div className='text-center'>
          <h1 className='text-[36px] lg:text-[2.3vw] font-urbanist font-semibold mb-4'>
            Meet Our Team
          </h1>
          <hr className='h-1 bg-red-500 w-20 mx-auto mb-6'/>
        </div>
        
        <div className='w-[343px] md:w-[750px] lg:w-[60vw] mx-auto'>
          <p className='text-[14px] lg:text-[0.9vw] text-[#7a798a] mb-8'>
            Our team is composed of dedicated professionals who are passionate about cars and committed to providing exceptional service. Led by experienced industry experts, we work together to ensure that every client receives the best possible experience.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            {team.map((member, index) => (
              <div key={index} className='    w-[330px] lg:w-[18vw] border shadow-lg rounded-xl flex flex-col items-center p-5'>
                <img src={member.img} alt={member.name} className='  w-full object-cover rounded-lg' />
                <p className='text-center text-[18px] lg:text-[1.3vw] font-urbanist mt-2'>
                  {member.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AbouTeam;

