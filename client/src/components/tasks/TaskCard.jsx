import { useState } from "react";
import { Trash2, Pencil, AlertTriangle, CalendarDays } from "lucide-react";
import EditTaskModal from "./EditTaskModal";
import ConfirmModal from "../common/ConfrimModal";

const priorityStyles = {
  high: "bg-rose-50 text-rose-500",
  medium: "bg-amber-100 text-amber-500",
  low: "bg-emerald-50 text-emerald-600",
};

const TaskCard = ({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  isSelected = false,
  onSelectTask,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isCompleted = Boolean(task.completed);

  const formatTaskTitle = (title) => {
    const text = title?.trim() || "";

    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <>
      <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md">
        <div className="mb-4 flex items-center justify-between gap-2">
          {onSelectTask && (
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-500">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelectTask(task.id)}
                aria-label={`Select ${task.title} for saving`}
                className="h-4 w-4 shrink-0 cursor-pointer accent-blue-600"
              />
              Select
            </label>
          )}

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
              priorityStyles[task.priority] ?? priorityStyles.medium
            }`}
          >
            {task.priority} priority
          </span>

          <div className="flex items-center gap-1">
            {onEditTask && (
              <button
                type="button"
                onClick={() => setIsEditOpen(true)}
                aria-label={`Edit ${task.title}`}
                title="Edit task"
                className="rounded-lg bg-blue-50 p-2 text-blue-600 transition-colors hover:bg-blue-100"
              >
                <Pencil size={16} />
              </button>
            )}

            {onDeleteTask && (
              <button
                type="button"
                onClick={() => setIsDeleteOpen(true)}
                aria-label={`Delete ${task.title}`}
                title="Delete task"
                className="rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleTask(task.id)}
            aria-label={`Mark ${task.title} as completed`}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-green-600"
          />

          <h3
            className={`min-w-0 text-sm font-semibold leading-6 break-words ${
              isCompleted ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {formatTaskTitle(task.title)}
          </h3>
        </div>

        <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">
          <CalendarDays size={16} className="mt-0.5 shrink-0" />

          <span className="break-words">{task.deadline ?? "No deadline"}</span>
        </div>

        {task.needsClarification && (
          <div
            role="status"
            className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 px-2.5 py-2 text-xs text-amber-800"
          >
            <AlertTriangle size={15} className="shrink-0" />
            <span>Needs clarification</span>
          </div>
        )}
      </article>

      {isEditOpen && onEditTask && (
        <EditTaskModal
          task={task}
          onSave={onEditTask}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {isDeleteOpen && onDeleteTask && (
        <ConfirmModal
          title="Delete task?"
          message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
          confirmText="Delete Task"
          onConfirm={() => {
            onDeleteTask(task.id);
            setIsDeleteOpen(false);
          }}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
