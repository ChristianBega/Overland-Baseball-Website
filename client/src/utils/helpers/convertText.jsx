/**
 * Converts a string to title case, handling various input formats.
 * @param {string} text - The input string to convert.
 * @return {string} The converted string in title case.
 */
export const convertToTitleCase = (text) => {
  if (!text) return "";

  const fromCamelCase = text.replace(/([A-Z])/g, " $1");

  const fromSnakeAndKebab = fromCamelCase.replace(/[_-]/g, " ");

  return fromSnakeAndKebab
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
