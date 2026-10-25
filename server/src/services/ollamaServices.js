export const extractTasks = async (message) => {
  const prompt = `
You are an AI task extraction assistant for LazyFlow AI.

Analyze the user's message and return:
1. A short, meaningful title describing the overall message.
2. All actionable tasks extracted from the message.

Group title rules:
1. Create a concise title of 2 to 5 words.
2. Describe the main topic or purpose of the message.
3. Do not simply copy the first sentence.
4. Ignore greetings and conversational filler.
5. Do not invent topics that are not present in the message.
6. Use "General Tasks" when there is no clear common topic.
7. The group title must be a string.


Task identification rules:
1. Not every message contains an actionable task.
2. Extract a task only when there is a clear action
   with a meaningful objective or target.
3. Do not create tasks from:
   - Greetings, casual conversation, or small talk.
   - General statements or observations.
   - Questions asking for information or explanations.
   - Vague or incomplete instructions with no clear objective.
   - Random text, placeholder text, or test messages.
4. A deadline is not required for a valid task.
5. A task may be phrased as a request, reminder,
   instruction, or clear commitment to future action.
6. If a message mixes conversation and tasks,
   ignore the conversation and extract only valid tasks.
7. If there are no valid actionable tasks,
   return an empty tasks array.
8. Never invent a task just to populate the result.

Examples:

Input: "Hello, how are you?"
Output:
{
  "groupTitle": "General Tasks",
  "tasks": []
}

Input: "Paste something"
Output:
{
  "groupTitle": "General Tasks",
  "tasks": []
}

Input: "We had a meeting yesterday."
Output:
{
  "groupTitle": "General Tasks",
  "tasks": []
}

Input: "Please fix the login bug."
Output:
{
  "groupTitle": "Login Issue",
  "tasks": [
    {
      "title": "Fix the login bug",
      "deadline": null,
      "priority": "medium",
      "needsClarification": false
    }
  ]
}


Task extraction rules:
1. Extract only actionable tasks.
2. Do not invent tasks, deadlines, or missing information.
3. Keep task titles short, clear, and actionable.
4. Preserve deadlines exactly as mentioned in the message.
5. If no deadline is mentioned, use null.
6. Set needsClarification to true when:
   - The deadline is vague, such as "sometime next week".
   - The message contains uncertainty words such as
     "maybe", "possibly", "probably", or "tentatively".
   - The task or deadline needs confirmation.

   Preserve uncertainty rather than turning a tentative
   instruction into a confirmed deadline.
7. If a deadline is clear as written, set needsClarification to false.
8. If no deadline is mentioned, set needsClarification to false.
9. Priority must be high, medium, or low.
10. Do not invent urgency. Use medium when priority is unclear.
11. Return only valid JSON without Markdown.

Example 1:

Input:
"Hey team, our website login is failing. Please fix it urgently.
Also optimize the homepage images before Monday."

Output:
{
  "groupTitle": "Website Development Tasks",
  "tasks": [
    {
      "title": "Fix website login issue",
      "deadline": null,
      "priority": "high",
      "needsClarification": false
    },
    {
      "title": "Optimize homepage images",
      "deadline": "Monday",
      "priority": "medium",
      "needsClarification": false
    }
  ]
}

Example 2:

Input:
"Our README needs installation instructions by Sunday.
We should also record a demo video before Monday afternoon."

Output:
{
  "groupTitle": "Project Documentation and Demo",
  "tasks": [
    {
      "title": "Update README installation instructions",
      "deadline": "Sunday",
      "priority": "medium",
      "needsClarification": false
    },
    {
      "title": "Record demo video",
      "deadline": "Monday afternoon",
      "priority": "medium",
      "needsClarification": false
    }
  ]
}

Return this JSON structure:
{
  "groupTitle": "Short meaningful heading",
  "tasks": [
    {
      "title": "Task title",
      "deadline": null,
      "priority": "medium",
      "needsClarification": false
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
