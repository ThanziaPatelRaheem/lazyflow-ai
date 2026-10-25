export const normalizeMessage = (message) => {
  return message.trim().replace(/\s+/g, " ").toLowerCase();
};

export const isDuplicateMessage = (message, tasks) => {
  const normalizedMessage = normalizeMessage(message);

  return tasks.some((task) => task.sourceMessage === normalizedMessage);
};
