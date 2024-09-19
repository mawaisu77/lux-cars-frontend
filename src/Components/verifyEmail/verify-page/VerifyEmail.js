import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { API_BASE_URL } from "../../../services/baseService";
import luxcar_logo from '../../../assets/Logo/Horizontal0 1.png';

const Verify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/auth/verify-email/${token}`
        );
        setMessage(response.data.message);
        navigate("/login");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setMessage(error.response.data.message);
        } else {
          setMessage("An unexpected error occurred");
        }
      } finally {
        setLoading(false); // Stop loading when the request is complete
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <div className="flex justify-center mb-4">
        <img src={luxcar_logo} alt="LuxCars Logo" className="w-44" />
      </div>
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        LuxCars Verification
      </h1>
      {loading ? (
        <div className="flex justify-center">
          <ClipLoader size={50} color={"#ca0000"} loading={loading} />
        </div>
      ) : (
        <p className="text-lg font-medium text-gray-600">{message}</p>
      )}
    </div>
  </div>
  );
};

export default Verify;
