import { extractTasks } from "../services/ollamaServices.js";

export const generateTasks = async (req, res) => {
  try {
    // Get the user's message from the request body.
    const { message } = req.body;

    // Reject empty messages or invalid input.
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid message.",
      });
    }

    // Ask Gemma to extract actionable tasks and a group heading.
    const result = await extractTasks(message.trim());

    // Validate the AI response before sending it to the frontend.
    if (
      !result ||
      typeof result.groupTitle !== "string" ||
      !Array.isArray(result.tasks) ||
      !result.tasks.every(
        (task) =>
          task &&
          typeof task.title === "string" &&
          task.title.trim() &&
          (task.deadline === null || typeof task.deadline === "string") &&
          ["high", "medium", "low"].includes(task.priority) &&
          typeof task.needsClarification === "boolean",
      )
    ) {
      // Return an error if Gemma produces an unexpected format.
      return res.status(502).json({
        success: false,
        message: "AI returned an unexpected task format.",
      });
    }

    // Return the AI-generated heading AND the tasks.
    // An empty tasks array is valid for messages without actions.
    return res.status(200).json({
      success: true,
      groupTitle: result.groupTitle.trim() || "General Tasks",
      tasks: result.tasks,
    });
  } catch (error) {
    // Log unexpected errors for debugging.
    console.error("Task extraction error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate tasks. Please try again.",
    });
  }
};
