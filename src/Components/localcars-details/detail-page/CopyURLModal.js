import React from 'react';
import { toast } from 'react-toastify';

const CopyURLModal = ({ closeModal }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("URL copied to clipboard!");
      closeModal();
    });
  };

  return (
    <dialog id="copy_url_modal" className="modal">
      <div className="modal-box dark:bg-white">
        <h3 className="font-bold text-lg">Copy URL</h3>
        <input 
          type="text" 
          className="input w-full mt-2 dark:bg-white border hover:dark:bg-white" 
          value={window.location.href}
          readOnly 
        />
        <div className="modal-action">
          <button 
            className="btn text-red-600 dark:bg-white hover:dark:bg-gray-200" 
            onClick={closeModal}
          >
            Close
          </button>
          <button 
            className="btn text-green-600 dark:bg-white hover:dark:bg-gray-200" 
            onClick={handleCopy}
          >
            Copy URL
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CopyURLModal;