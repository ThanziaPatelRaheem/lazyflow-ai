import { ChartNoAxesColumnIncreasing } from "lucide-react";

const TaskOverview = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      style: "bg-blue-50 text-blue-600",
    },
    {
      label: "Completed",
      value: completed,
      style: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending",
      value: pending,
      style: "bg-amber-50 text-amber-600",
    },
    {
      label: "Progress",
      value: `${percentage}%`,
      style: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <section className="h-full rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <ChartNoAxesColumnIncreasing size={20} className="text-blue-600" />
        <h2 className="font-semibold text-slate-900">Task Overview</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-lg p-3 ${stat.style}`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div
        role="progressbar"
        aria-label="Task completion progress"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {completed} of {total} tasks completed
      </p>
    </section>
  );
};

export default TaskOverview;
