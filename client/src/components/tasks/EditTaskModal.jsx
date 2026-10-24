import { useState } from "react";
import { Pencil, X } from "lucide-react";

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [deadline, setDeadline] = useState(task.deadline ?? "");
  const [priority, setPriority] = useState(task.priority);
  const [needsClarification, setNeedsClarification] = useState(
    task.needsClarification ?? false,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSave(task.id, {
      title: title.trim(),
      deadline: deadline.trim() || null,
      priority,
      needsClarification,
    });

    onClose();
  };

  const inputStyles =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
        className="my-auto w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Pencil size={20} />
            </div>

            <div>
              <h2
                id="edit-task-title"
                className="text-lg font-bold text-slate-900"
              >
                Edit Task
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Update your task details.
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
              htmlFor="edit-title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Task title
            </label>

            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
              className={inputStyles}
            />
          </div>

          <div>
            <label
              htmlFor="edit-deadline"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Deadline (optional)
            </label>

            <input
              id="edit-deadline"
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="e.g. Friday evening"
              className={inputStyles}
            />
          </div>

          <div>
            <label
              htmlFor="edit-priority"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Priority
            </label>

            <select
              id="edit-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={inputStyles}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {task.needsClarification && (
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
              <input
                type="checkbox"
                checked={!needsClarification}
                onChange={(e) => setNeedsClarification(!e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-green-600"
              />

              <span className="text-sm leading-5 text-slate-700">
                I've reviewed and confirmed this task's details.
              </span>
            </label>
          )}

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
