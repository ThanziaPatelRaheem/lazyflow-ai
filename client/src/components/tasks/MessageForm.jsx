import { useState } from "react";

const MessageForm = ({ onGenerateTasks, isLoading }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim() || isLoading) return;

    onGenerateTasks(message.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <label
        htmlFor="message"
        className="mb-3 block text-sm font-semibold text-slate-800"
      >
        Paste your message
      </label>

      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste an email, school announcement, meeting notes, or instructions..."
        rows={6}
        className="w-full resize-y rounded-lg border border-slate-300 p-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isLoading ? "Generating Tasks..." : "Generate Tasks"}
      </button>
    </form>
  );
};

export default MessageForm;
