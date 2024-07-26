import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import { API_BASE_URL } from "../../../services/baseService";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        {loading ? (
          <div className="flex justify-center">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};

export default Verify;
