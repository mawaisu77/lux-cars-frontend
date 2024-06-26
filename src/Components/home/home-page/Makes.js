import React from 'react';

const Makes = () => {
  const makes = [
    { Make: "Honda" },
    { Make: "BMW" },
    { Make: "Bently" },
    { Make: "Acura" },
    { Make: "Hondai" },
    { Make: "Sazuki" },
    { Make: "Lamborgini" },
    { Make: "Frary" },
    { Make: "Land Rover" },
    { Make: "Alfa Romeo" },
    { Make: "Yahama Atv" },
    { Make: "KIA" },
    { Make: "Nissan" },
    { Make: "Chysler" },
    { Make: "Chevrolet" },
    { Make: "Honda" },
    { Make: "BMW" },
    { Make: "Bently" },
    { Make: "Acura" },
    { Make: "Hondai" },
    { Make: "Sazuki" },
    { Make: "Lamborgini" },
    { Make: "Frary" },
    { Make: "Land Rover" },
    { Make: "Alfa Romeo" },
    { Make: "Yahama Atv" },
    { Make: "KIA" },
    { Make: "Nissan" },
    { Make: "Chysler" },
    { Make: "Chevrolet" },
    { Make: "Honda" },
    { Make: "BMW" },
    { Make: "Bently" },
    { Make: "Acura" },
    { Make: "Hondai" },
    { Make: "Sazuki" },
    { Make: "Lamborgini" },
    { Make: "Frary" },
    { Make: "Land Rover" },
    { Make: "Alfa Romeo" },
    { Make: "Yahama Atv" },
  ];

  return (
    <div className="h-[48.5vh] w-[98.9vw]">
      <div>
        <div className="flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw] pt-[5.5vh]">
          Popular Makes
        </div>
        <hr className='h-1 bg-red-500 w-20 mx-auto mt-8' />
        {/* For desktop */}
        <div className='hidden lg:flex w-[78vw] mx-auto flex-wrap gap-[0.5vw] gap-y-6 mt-[4vh] justify-center'>
          {makes.map((make, index) => (
            <button
              key={index}
              className='font-urbanist bg-[#ebebeb] py-[1.5vh] px-[1.1vw] rounded-lg text-[15px] lg:text-[0.75vw]'
            >
              {make.Make}
            </button>
          ))}
        </div>
        {/* For mobile */}
        <div className='lg:hidden w-[78vw] h-[30vh] mx-auto overflow-x-auto'>
          <div className='grid grid-rows-3 gap-y-5 gap-x-4 lg:gap-[0.5vw]  auto-cols-max mt-6' style={{ gridAutoFlow: 'column' }}>
            {makes.map((make, index) => (
              <button
                key={index}
                className='font-urbanist bg-[#ebebeb] py-[1.5vh] px-[1.1vw] rounded-lg text-[15px] flex justify-center items-center'
              >
                {make.Make}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makes;



 