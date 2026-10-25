export const capitalizeFirstLetter = (value) => {
  if (typeof value !== "string") return "";

  const text = value.trim();
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatDeadline = (deadline) => {
  if (deadline === null || deadline === undefined) {
    return null;
  }

  if (typeof deadline !== "string") {
    return null;
  }

  const formattedDeadline = capitalizeFirstLetter(deadline);

  return formattedDeadline || null;
};
