import { useState } from "react";
import { Bookmark, X } from "lucide-react";

const SaveListModal = ({ isOpen, onClose, onSave }) => {
  const [listName, setListName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = listName.trim();

    if (!name) return;

    onSave(name);
    setListName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-list-title"
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Bookmark size={20} />
            </div>

            <div>
              <h2
                id="save-list-title"
                className="text-lg font-bold text-slate-900"
              >
                Save Task List
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Keep your tasks organized in a collection.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label
            htmlFor="listName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Collection name
          </label>

          <input
            id="listName"
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="e.g. School Tasks"
            maxLength={60}
            autoFocus
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!listName.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-600"
            >
              Save List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveListModal;
