/**
 * Convert JSON config rules to React Hook Form rules
 * Converts pattern strings to RegExp objects
 */
export const processFormRules = (rules) => {
  if (!rules) return rules;

  const processedRules = { ...rules };

  // Convert pattern string to RegExp object
  if (processedRules.pattern?.value && typeof processedRules.pattern.value === "string") {
    processedRules.pattern = {
      value: new RegExp(processedRules.pattern.value),
      message: processedRules.pattern.message,
    };
  }

  return processedRules;
};
