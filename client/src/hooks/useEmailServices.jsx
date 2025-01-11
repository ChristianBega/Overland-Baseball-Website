import { useState } from "react";
import axios from "axios";

const useEmailService = (apiBaseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const sendEmail = async (emailData) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await axios.post(`${apiBaseUrl}/contact/forms/submit`, emailData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse(res);
      return res.data;
    } catch (err) {
      console.error("Network error:", err); // Log the error for debugging
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, sendEmail };
};

export default useEmailService;
