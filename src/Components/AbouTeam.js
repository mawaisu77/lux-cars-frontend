import React from 'react'
 
import { team } from '../data/data'

const AbouTeam = () => {
 

    return (
        <>
            <div className='h-[77vh] bg-[#f8f8f8]'>
                <div className='text-[2.3vw] font-urbanist font-semibold mb-[5vh] pt-[9.3vh]'>
                    Meet Our Team
                    <hr className='h-1 bg-red-500 w-20 mx-auto'/>
                </div>
                
                <div className='w-[55vw] mx-auto'>
                    <p className='text-[0.9vw] text-[#7a798a] mb-[5vh]'>
                        Our team is composed of dedicated professionals who are passionate about cars and committed to providing exceptional service. Led by experienced industry experts, we work together to ensure that every client receives the best possible experience.
                    </p>
                    <div className='flex gap-4'>
                        {team.map((member, index) => (
                            <div key={index} className='h-[40vh] w-[18vw] border shadow-lg rounded-xl'>
                                <div className='p-[1vw]'>
                                    <img src={member.img} alt={member.name} className=' h-[31vh] w-[16vw]' />
                                    <p className='text-center text-[1.3vw] font-urbanist mt-2'>
                                        {member.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AbouTeam;
