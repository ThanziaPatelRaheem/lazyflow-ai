import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  selectedTaskIds = [],
  onSelectTask,
  onSelectGroup,
}) => {
  if (tasks.length === 0) return null;

  // Organize tasks using their groupId.

  const groupedTasks = tasks.reduce((groups, task) => {
    const groupId = task.groupId || "older-tasks";

    // Create the group the first time its ID is encountered.
    if (!groups[groupId]) {
      groups[groupId] = {
        id: groupId,
        title: task.groupTitle || "Earlier Tasks",
        generatedAt: task.generatedAt || null,
        tasks: [],
      };
    }

    // Add the task to the matching group.
    groups[groupId].tasks.push(task);

    return groups;
  }, {});

  // Convert groups into an array so React can render them.
  const taskGroups = Object.values(groupedTasks);

  //   Convert the stored ISO timestamp into a readable date.
  const formatGeneratedAt = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-SG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="mt-4 space-y-6">
      {taskGroups.map((group) => (
        <div
          key={group.id}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
        >
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {group.title}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {group.id === "manual-tasks" ? "Created" : "Generated"} on{" "}
                {formatGeneratedAt(group.generatedAt)}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {group.tasks.length}{" "}
                {group.tasks.length === 1
                  ? "extracted task"
                  : "extracted tasks"}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-600">
                <input
                  type="checkbox"
                  checked={group.tasks.every((task) =>
                    selectedTaskIds.includes(task.id),
                  )}
                  onChange={() => onSelectGroup(group.tasks)}
                  aria-label={`Select all tasks in ${group.title}`}
                  className="h-4 w-4 cursor-pointer accent-blue-600"
                />
                Select All
              </label>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                {group.id === "older-tasks"
                  ? "Earlier Tasks"
                  : group.id === "manual-tasks"
                    ? "Manual"
                    : "AI Extracted"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                isSelected={selectedTaskIds.includes(task.id)}
                onSelectTask={onSelectTask}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default TaskList;
