// Modal.js
import React from "react";

const Modal = ({ id, title, children, actions, onClose }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-x-4">
            {actions.map((action, index) => (
              <button
                key={index}
                className={`btn w-[100px] ${action.textColor}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
