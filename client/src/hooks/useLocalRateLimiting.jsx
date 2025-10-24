import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook for client-side rate limiting
 * @param {string} identifier - Unique identifier (email, userId, etc.)
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} windowMs - Time window in milliseconds (default: 1 hour)
 * @returns {object} - { canSubmit, remainingAttempts, timeUntilReset, checkRateLimit, recordAttempt }
 */
const useLocalRateLimiting = (identifier, maxAttempts = 3, windowMs = 60 * 60 * 1000) => {
  const [canSubmit, setCanSubmit] = useState(true);
  const [remainingAttempts, setRemainingAttempts] = useState(maxAttempts);
  const [timeUntilReset, setTimeUntilReset] = useState(null);

  const STORAGE_KEY = "form_rate_limit";

  /**
   * Get rate limit data from localStorage
   */
  const getRateLimitData = useCallback(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error reading rate limit data:", error);
      return {};
    }
  }, []);

  /**
   * Save rate limit data to localStorage
   */
  const saveRateLimitData = useCallback((data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving rate limit data:", error);
    }
  }, []);

  /**
   * Check if user is within rate limits
   */
  const checkRateLimit = useCallback(() => {
    if (!identifier) {
      setCanSubmit(true);
      setRemainingAttempts(maxAttempts);
      return { allowed: true, remaining: maxAttempts };
    }

    const allData = getRateLimitData();
    const userData = allData[identifier];
    const now = Date.now();

    // No previous attempts
    if (!userData) {
      setCanSubmit(true);
      setRemainingAttempts(maxAttempts);
      return { allowed: true, remaining: maxAttempts };
    }

    // Filter out old attempts outside the time window
    const validAttempts = userData.attempts.filter((timestamp) => now - timestamp < windowMs);

    // Update with valid attempts only
    if (validAttempts.length !== userData.attempts.length) {
      allData[identifier] = { attempts: validAttempts };
      saveRateLimitData(allData);
    }

    const remaining = Math.max(0, maxAttempts - validAttempts.length);
    const allowed = validAttempts.length < maxAttempts;

    setCanSubmit(allowed);
    setRemainingAttempts(remaining);

    // Calculate time until reset if rate limited
    if (!allowed && validAttempts.length > 0) {
      const oldestAttempt = Math.min(...validAttempts);
      const resetTime = oldestAttempt + windowMs - now;
      setTimeUntilReset(resetTime);
    } else {
      setTimeUntilReset(null);
    }

    return { allowed, remaining, timeUntilReset: !allowed ? timeUntilReset : null };
  }, [identifier, maxAttempts, windowMs, getRateLimitData, saveRateLimitData]);

  /**
   * Record a new submission attempt
   */
  const recordAttempt = useCallback(() => {
    if (!identifier) return;

    const allData = getRateLimitData();
    const now = Date.now();

    if (!allData[identifier]) {
      allData[identifier] = { attempts: [] };
    }

    // Filter old attempts and add new one
    const validAttempts = allData[identifier].attempts.filter((timestamp) => now - timestamp < windowMs);

    validAttempts.push(now);
    allData[identifier] = { attempts: validAttempts };

    saveRateLimitData(allData);
    checkRateLimit();
  }, [identifier, windowMs, getRateLimitData, saveRateLimitData, checkRateLimit]);

  /**
   * Format time until reset in human-readable format
   */
  const formatTimeUntilReset = useCallback(() => {
    if (!timeUntilReset) return null;

    const minutes = Math.ceil(timeUntilReset / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  }, [timeUntilReset]);

  // Check rate limit on mount and when identifier changes
  useEffect(() => {
    checkRateLimit();
  }, [checkRateLimit]);

  // Update countdown timer every minute
  useEffect(() => {
    if (!canSubmit && timeUntilReset) {
      const interval = setInterval(() => {
        checkRateLimit();
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [canSubmit, timeUntilReset, checkRateLimit]);

  return {
    canSubmit,
    remainingAttempts,
    timeUntilReset,
    formattedTimeUntilReset: formatTimeUntilReset(),
    checkRateLimit,
    recordAttempt,
  };
};

export default useLocalRateLimiting;
