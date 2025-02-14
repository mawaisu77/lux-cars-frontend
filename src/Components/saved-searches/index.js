import React from 'react'
import { Link } from 'react-router-dom'
import BidCars from './saved-search/BidCars'
import LocalCars from './saved-search/LocalCars'

const SavedSearchPage = () => {
  return (
    <>
    <div className="back-image">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Saved Searches
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
              Saved Searches
            </button>
          </div>
        </div>
    </div>
    <BidCars />
    <LocalCars />
    </>
  )
}

export default SavedSearchPage