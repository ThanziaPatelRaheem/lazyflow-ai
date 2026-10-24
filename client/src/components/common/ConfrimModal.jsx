import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onClose,
  confirmText = "Confirm",
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-description"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <AlertTriangle size={22} />
            </div>

            <h2 id="confirm-title" className="text-lg font-bold text-slate-900">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close confirmation"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <p
          id="confirm-description"
          className="mt-4 text-sm leading-6 text-slate-600"
        >
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
