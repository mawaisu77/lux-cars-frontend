// src/components/CustomToast.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = () => {
  return <ToastContainer />;
};

const showToast = (message, type = 'default') => {
  console.log(message, type)
  const options = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};

export { CustomToast, showToast };
