const TaskCard = ({ task, onToggleTask }) => {
  return (
    <article className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
        aria-label={`Mark ${task.title} as completed`}
        className="mt-1 h-4 w-4 cursor-pointer accent-blue-600"
      />

      <div className="flex-1">
        <h3
          className={`font-medium ${
            task.completed ? "text-slate-400 line-through" : "text-slate-900"
          }`}
        >
          {task.title}
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          Deadline: {task.deadline ?? "Not specified"}
        </p>

        <p className="mt-1 text-sm text-slate-600">Priority: {task.priority}</p>
      </div>
    </article>
  );
};

export default TaskCard;
