export const capitalizeFirstLetter = (value) => {
  // Return an empty string for invalid inputs.
  if (typeof value !== "string") return "";

  // Remove extra whitespace at the beginning and end.
  const text = value.trim();
  if (!text) return "";

  // Capitalize only the first character.
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatDeadline = (deadline) => {
  // Keep missing deadlines as null.
  if (deadline === null || deadline === undefined) {
    return null;
  }

  // Protect against unexpected non-string values.
  if (typeof deadline !== "string") {
    return null;
  }

  // Capitalize the first letter using our existing helper.
  const formattedDeadline = capitalizeFirstLetter(deadline);

  return formattedDeadline || null;
};
