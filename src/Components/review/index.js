import React, { useState } from 'react';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { API_BASE_URL } from '../../services/baseService';
import { getToken, getUser } from '../../utils/storageUtils';
import { showToast } from '../../utils/Toast';

const ReviewPopup = ({ onClose, user }) => {
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}reviews/place-review`, { rating }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (response.status === 201) {
        localStorage.setItem(`hasReviewed_${user.email}`, 'true');
        onClose();
      } else {
        showToast("failed to submit review")
        console.error('Failed to submit review:', response.statusText);
      }
    } catch (error) {
        showToast("Error submitting review")
      console.error('Error submitting review:', error);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(`loginTime_${user.email}`, new Date().getTime() + 10000); // Reset the timer to 2 hours from now
    onClose();
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);

  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Please leave a review!</h2>
          <p className="text-gray-600 mt-2">We’d love to have your feedback!</p>
          <div className="flex justify-center mt-4">
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={44}
                isHalf={false}
                emptyIcon={<TiStarOutline />}
                halfIcon={<TiStarHalfOutline />}
                fullIcon={<TiStarFullOutline />}
                activeColor="#ffd700"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            className="bg-gray-200 text-gray-700 w-full sm:w-[22.5vw] md:w-[17.5vw] lg:w-[12.5vw] rounded-lg py-2 px-4"
            onClick={handleSkip}
          >
            Later
          </button>
          <button
            className={`${rating === 0 ? 'cursor-not-allowed bg-gray-500':'bg-red-600 cursor-pointer'}  text-white w-full sm:w-[22.5vw] md:w-[17.5vw] lg:w-[12.5vw] rounded-lg py-2 px-4`}
            onClick={handleSubmit}
            disabled={rating === 0 ? true:false}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
