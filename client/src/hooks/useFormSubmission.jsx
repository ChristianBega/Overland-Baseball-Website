import { useState, useCallback, useEffect } from "react";
import useEmailServices from "./useEmailServices";
import useLocalRateLimiting from "./useLocalRateLimiting";
import useAuthenticatedForm from "./useAuthenticatedForm";

/**
 * Orchestrates form submission with auth, rate limiting, and email service
 * @param {object} config - Configuration object
 * @param {string} config.apiBaseUrl - API base URL
 * @param {boolean} config.requireAuth - Whether form requires authentication
 * @param {string} config.rateLimitIdentifier - Identifier for rate limiting (email)
 * @param {number} config.maxAttempts - Max submission attempts
 * @param {number} config.successDisplayDuration - How long to show success message (ms)
 * @returns {object} - Complete form submission state and handlers
 */
const useFormSubmission = ({ apiBaseUrl, requireAuth = false, rateLimitIdentifier = null, maxAttempts = 3, successDisplayDuration = 4000 }) => {
  const [submissionError, setSubmissionError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Auth check
  const { user, loading: authLoading, isAuthenticated, authError } = useAuthenticatedForm(requireAuth);

  // Email service
  const { sendEmail, loading: emailLoading, error: emailError, response, clearStatus } = useEmailServices(apiBaseUrl);

  // Rate limiting
  const { canSubmit, remainingAttempts, formattedTimeUntilReset, checkRateLimit, recordAttempt } = useLocalRateLimiting(
    rateLimitIdentifier,
    maxAttempts
  );

  /**
   * Handle form submission with all checks
   */
  const handleSubmit = useCallback(
    async (formData, onSuccess) => {
      // Clear previous errors
      setSubmissionError(null);
      clearStatus();

      // Auth check
      if (requireAuth && !isAuthenticated) {
        setSubmissionError("You must be logged in to submit this form.");
        return { success: false, error: "Authentication required" };
      }

      // Rate limit check
      const rateLimitCheck = checkRateLimit();
      if (!rateLimitCheck.allowed) {
        const errorMsg = `You've reached the submission limit. Please try again in ${formattedTimeUntilReset}.`;
        setSubmissionError(errorMsg);
        return { success: false, error: "Rate limit exceeded" };
      }

      try {
        // Send email
        const result = await sendEmail(formData);

        // Record attempt for rate limiting
        recordAttempt();

        // Show success message
        setShowSuccessMessage(true);

        // Hide success message after duration
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, successDisplayDuration);

        // Call success callback if provided
        if (onSuccess && typeof onSuccess === "function") {
          onSuccess(result);
        }

        return { success: true, data: result };
      } catch (error) {
        // Record failed attempt for rate limiting
        recordAttempt();

        const errorMsg = error.message || "Failed to submit form. Please try again.";
        setSubmissionError(errorMsg);

        return { success: false, error: errorMsg };
      }
    },
    [requireAuth, isAuthenticated, checkRateLimit, formattedTimeUntilReset, sendEmail, recordAttempt, clearStatus, successDisplayDuration]
  );

  /**
   * Clear all status messages
   */
  const clearAllStatus = useCallback(() => {
    setSubmissionError(null);
    setShowSuccessMessage(false);
    clearStatus();
  }, [clearStatus]);

  // Combine all errors
  const allErrors = submissionError || authError || emailError?.message;

  // Combine all loading states
  const isLoading = authLoading || emailLoading;

  // Determine if form can be submitted
  const canSubmitForm = !isLoading && canSubmit && (!requireAuth || isAuthenticated);

  return {
    // Submission
    handleSubmit,
    canSubmitForm,
    isLoading,

    // Status
    error: allErrors,
    response,
    showSuccessMessage,
    clearAllStatus,

    // Auth
    user,
    isAuthenticated,
    authLoading,

    // Rate limiting
    remainingAttempts,
    formattedTimeUntilReset,
  };
};

export default useFormSubmission;
