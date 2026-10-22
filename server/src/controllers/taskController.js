import { extractTasks } from "../services/ollamaServices.js";

export const generateTasks = async (req, res) => {
  try {
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid message.",
      });
    }

    const result = await extractTasks(message.trim());

    if (
      !result ||
      !Array.isArray(result.tasks) ||
      !result.tasks.every(
        (task) =>
          task &&
          typeof task.title === "string" &&
          task.title.trim() &&
          (task.deadline === null || typeof task.deadline === "string") &&
          ["high", "medium", "low"].includes(task.priority),
      )
    ) {
      return res.status(502).json({
        success: false,
        message: "AI returned an unexpected task format.",
      });
    }

    return res.status(200).json({
      success: true,
      tasks: result.tasks,
    });
  } catch (error) {
    console.error("Task extraction error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to generate tasks. Please try again.",
    });
  }
};
