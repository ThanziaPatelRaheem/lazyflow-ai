import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const MessageForm = ({ onGenerateTasks, isLoading, onMessageChange }) => {
  const [message, setMessage] = useState(() => {
    return localStorage.getItem("lazyflow-message") || "";
  });

  useEffect(() => {
    localStorage.setItem("lazyflow-message", message);
  }, [message]);

  const handleMessageChange = (value) => {
    setMessage(value);

    onMessageChange?.();
  };

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
        className="mb-3 block text-base font-semibold tracking-tight text-slate-800"
      >
        Paste your message
      </label>

      <textarea
        id="message"
        value={message}
        onChange={(e) => handleMessageChange(e.target.value)}
        placeholder="Paste an email, school announcement, meeting notes, or instructions..."
        rows={6}
        className="block min-h-[180px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-[15px] leading-7 text-slate-800 placeholder:text-slate-400 outline-none transition-colors duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-blue-600 disabled:opacity-100 disabled:hover:shadow-sm md:px-6 md:py-3 md:text-base"
        >
          {isLoading ? (
            <>
              <LoaderCircle size={20} className="animate-spin" />
              Generating Tasks...
            </>
          ) : (
            "Generate Tasks"
          )}
        </button>

        {message.length > 0 && (
          <button
            type="button"
            onClick={() => handleMessageChange("")}
            disabled={isLoading}
            className="rounded-xl border border-red-600 bg-white px-4 py-2.5 md:px-5 md:py-3 font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 text-sm md:text-base"
          >
            Clear Message
          </button>
        )}
      </div>
    </form>
  );
};

export default MessageForm;
