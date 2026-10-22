import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onToggleTask }) => {
  if (tasks.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Your Tasks ({tasks.length})
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggleTask={onToggleTask} />
        ))}
      </div>
    </section>
  );
};

export default TaskList;
