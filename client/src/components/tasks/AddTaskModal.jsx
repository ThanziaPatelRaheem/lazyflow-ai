import { useState } from "react";
import { ListPlus, X } from "lucide-react";

const AddTaskModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSave({
      id: crypto.randomUUID(),
      title: title.trim(),
      deadline: deadline.trim() || null,
      priority,
      needsClarification: false,
      completed: false,
    });

    onClose();
  };

  const inputStyles =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <ListPlus size={20} />
            </div>

            <div>
              <h2
                id="add-task-title"
                className="text-lg font-bold text-slate-900"
              >
                Add New Task
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Create a task manually.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="add-task-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Task title
            </label>

            <input
              id="add-task-name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Submit project report"
              autoFocus
              required
              className={inputStyles}
            />
          </div>

          <div>
            <label
              htmlFor="add-task-deadline"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Deadline (optional)
            </label>

            <input
              id="add-task-deadline"
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g. Friday evening"
              className={inputStyles}
            />
          </div>

          <div>
            <label
              htmlFor="add-task-priority"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Priority
            </label>

            <select
              id="add-task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={inputStyles}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
