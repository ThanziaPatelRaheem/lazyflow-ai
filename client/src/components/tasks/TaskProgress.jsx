const TaskProgress = ({ tasks }) => {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const percentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (totalTasks === 0) return null;

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-semibold text-slate-900">Task Progress</h2>

        <span className="text-sm font-medium text-slate-600">
          {completedTasks} of {totalTasks} completed
        </span>
      </div>

      <div
        role="progressbar"
        aria-label="Task completion progress"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2.5 overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-slate-500">{percentage}% complete</p>
    </section>
  );
};

export default TaskProgress;
