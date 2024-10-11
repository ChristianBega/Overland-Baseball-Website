/**
 * Converts a string to title case, handling various input formats.
 * @param {string} text - The input string to convert.
 * @return {string} The converted string in title case.
 */
export const convertToTitleCase = (text) => {
  if (!text) return '';

  // Handle camelCase
  const fromCamelCase = text.replace(/([A-Z])/g, ' $1');
  
  // Handle snake_case and kebab-case
  const fromSnakeAndKebab = fromCamelCase.replace(/[_-]/g, ' ');
  
  // Split into words, capitalize first letter of each, and join
  return fromSnakeAndKebab
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
