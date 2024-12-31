// src/Components/modals/SignInModal.js
import React from 'react';
import { Link } from 'react-router-dom';

const SignInModal = ({ closeModal }) => {
  return (
    <dialog id="sign_in_modal" className="modal">
      <div className="modal-box dark:bg-white">
        <h3 className="font-bold text-lg">Sign In Required</h3>
        <p className="py-4">Please sign in to place a bid on this vehicle.</p>
        <div className="flex gap-x-4 justify-center items-center">
          <button className="btn text-red-600 dark:bg-white" onClick={closeModal}>
            Close
          </button>
          <Link to="/login">
            <button className="btn text-green-600 dark:bg-white">Sign In</button>
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default SignInModal;