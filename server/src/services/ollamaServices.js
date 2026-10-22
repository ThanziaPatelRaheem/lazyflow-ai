export const extractTasks = async (message) => {
  const prompt = `
You are a task extraction assistant.

Extract all actionable tasks from the message.

Rules:
- Do not invent tasks or deadlines.
- Use null if no deadline is mentioned.
- Return only valid JSON.
- Priority must be high, medium, or low.

Return this JSON structure:
{
  "tasks": [
    {
      "title": "Task title",
      "deadline": null,
      "priority": "medium"
    }
  ]
}

Message:
${message}
`;

  const response = await fetch(`${process.env.OLLAMA_BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OLLAMA_MODEL,
      prompt,
      stream: false,
      format: "json",
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status}`);
  }

  const data = await response.json();

  return JSON.parse(data.response);
};
