import { useState, useCallback } from "react";
import axios from "axios";

/**
 * Enhanced email service hook with better state management
 * @param {string} apiBaseUrl - Base URL for the API
 * @returns {object} - { sendEmail, loading, error, response, clearStatus }
 */
const useEmailService = (apiBaseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  /**
   * Send email via API
   */
  const sendEmail = useCallback(
    async (emailData) => {
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
        console.error("Email service error:", err);

        // Better error handling with more context
        const errorMessage = err.response?.data?.message || err.message || "Failed to send email. Please try again.";

        const errorDetails = {
          message: errorMessage,
          status: err.response?.status,
          data: err.response?.data,
        };

        setError(errorDetails);
        throw errorDetails;
      } finally {
        setLoading(false);
      }
    },
    [apiBaseUrl]
  );

  /**
   * Clear status (error and response)
   */
  const clearStatus = useCallback(() => {
    setError(null);
    setResponse(null);
  }, []);

  return {
    sendEmail,
    loading,
    error,
    response,
    clearStatus,
  };
};

export default useEmailService;
