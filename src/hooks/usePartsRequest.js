import axios from "axios";
import { getToken } from "../utils/storageUtils";

const usePartsRequest = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const addPartsRequest = async (requestPayload) => {
    try {
      const token = getToken();
      const partsRequest = await axios.post(
        `${API_BASE_URL}add_partsRequest`,
        requestPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return partsRequest;
    } catch (err) {
      console.log("ERROR ADDING APPLICATION", err);
    }
  };

  return { addPartsRequest };
};

export default usePartsRequest;
