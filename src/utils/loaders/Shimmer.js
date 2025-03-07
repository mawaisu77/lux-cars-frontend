/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import { Link } from 'react-router-dom';

const Shimmer = () => {
  return (
    <div className="text-gray-700 body-font w-[100vw]">
      <div className="container px-2 py-8 mx-auto max-w-[85vw] sm:max-w-[85vw]">
        <div className="flex flex-wrap justify-center">
          {/* Repeat the shimmer card for the desired number of times */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div className="h-full border-2 border-gray-200 rounded-lg overflow-hidden">
                <div className="lg:h-48 bg-gray-400 md:h-36 w-full object-cover object-center animate-pulse" />
                <div className="p-6">
                  <h2 className="bg-gray-400 animate-pulse h-4 w-1/4 mb-2" />
                  <h1 className="w-1/2 mb-4 h-6 animate-pulse bg-gray-500" />
                  <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400" />
                  <p className="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400" />
                  <p className="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400" />
                  <div className="flex items-center flex-wrap">
                    <Link className="bg-indigo-300 h-4 animate-pulse mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0" />
                    <span className="bg-indigo-300 w-16 mt-2 h-4 animate-pulse mr-3 px-2 inline-flex items-center ml-auto leading-none text-sm pr-5 py-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
