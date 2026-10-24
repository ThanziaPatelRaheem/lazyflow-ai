import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ListTodo, CalendarDays, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import TaskCard from "../components/tasks/TaskCard";
import TaskProgress from "../components/tasks/TaskProgress";
import { capitalizeFirstLetter, formatDeadline } from "../utils/formatText";

const SavedListDetails = () => {
  const { listId } = useParams();

  const [savedLists, setSavedLists] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lazyflow-saved-lists") || "[]");
    } catch {
      return [];
    }
  });

  const selectedList = savedLists.find((list) => list.id === listId);

  // Persist updates and synchronize the sidebar
  useEffect(() => {
    localStorage.setItem("lazyflow-saved-lists", JSON.stringify(savedLists));

    window.dispatchEvent(new Event("lazyflow-lists-updated"));
  }, [savedLists]);

  const handleToggleTask = (taskId) => {
    setSavedLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task,
              ),
            }
          : list,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    setSavedLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list,
      ),
    );
  };

  const handleEditTask = (taskId, updatedData) => {
    const formattedData = {
      ...updatedData,

      title: capitalizeFirstLetter(updatedData.title),

      deadline: formatDeadline(updatedData.deadline),
    };

    setSavedLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,

              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, ...formattedData } : task,
              ),
            }
          : list,
      ),
    );
  };

  if (!selectedList) {
    return (
      <div className="rounded-xl bg-slate-100 p-8 text-center">
        <FolderOpen size={36} className="mx-auto mb-4 text-slate-400" />

        <h2 className="text-xl font-semibold text-slate-900">List not found</h2>

        <p className="mt-2 text-sm text-slate-500">
          This collection may have been deleted.
        </p>

        <Link
          to="/saved-lists"
          className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Saved Lists
        </Link>
      </div>
    );
  }

  return (
    <section>
      <Link
        to="/saved-lists"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 md:mb-8"
      >
        <ArrowLeft size={18} />
        Back to Saved Lists
      </Link>

      <div className="mb-4 flex flex-wrap items-start justify-between gap-2 md:mb-7 md:gap-4">
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-3xl">
            {selectedList.name.charAt(0).toUpperCase() +
              selectedList.name.slice(1)}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <ListTodo size={17} />
              {selectedList.tasks.length}{" "}
              {selectedList.tasks.length === 1 ? "task" : "tasks"}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays size={17} />
              Saved {new Date(selectedList.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
          Saved Collection
        </span>
      </div>

      {selectedList.tasks.length > 0 ? (
        <>
          <div className="mb-5 md:mb-6">
            <TaskProgress tasks={selectedList.tasks} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedList.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl bg-slate-100 px-6 py-12 text-center">
          <ListTodo size={32} className="mx-auto mb-3 text-slate-400" />

          <h2 className="font-semibold text-slate-800">
            No tasks in this collection
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            This collection is empty.
          </p>
        </div>
      )}
    </section>
  );
};

export default SavedListDetails;
