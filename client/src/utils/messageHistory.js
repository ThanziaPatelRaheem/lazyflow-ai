const STORAGE_KEY = "lazyflow-message-history";

export const normalizeMessage = (message) => {
  return message.trim().replace(/\s+/g, " ").toLowerCase();
};


const getMessageHistory = () => {
  try {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    const history = savedHistory ? JSON.parse(savedHistory) : [];

    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
};

export const isDuplicateMessage = (message) => {
  const normalizedMessage = normalizeMessage(message);

  return getMessageHistory().includes(normalizedMessage);
};

export const rememberMessage = (message) => {
  const normalizedMessage = normalizeMessage(message);

  if (!normalizedMessage) return;

  const history = getMessageHistory();

  if (!history.includes(normalizedMessage)) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...history, normalizedMessage]),
    );
  }
};
