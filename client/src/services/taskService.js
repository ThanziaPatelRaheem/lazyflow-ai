export const generateTasks = async (message) => {
  let response;

  try {
    response = await fetch("http://localhost:3000/api/tasks/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
  } catch {
    throw new Error("Something went wrong. Please try again in a moment.");
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "We had trouble processing your message. Please try again.",
    );
  }

  if (!response.ok || !data.success) {
    throw new Error(
      response.status >= 500
        ? "We couldn't generate your tasks right now. Please try again shortly."
        : "We couldn't process your message. Please check it and try again.",
    );
  }

  if (!Array.isArray(data.tasks)) {
    throw new Error(
      "We had trouble processing your message. Please try again.",
    );
  }

  const groupTitle =
    typeof data.groupTitle === "string" && data.groupTitle.trim()
      ? data.groupTitle.trim()
      : "Generated Tasks";

  return {
    groupTitle,
    tasks: data.tasks,
  };
};
