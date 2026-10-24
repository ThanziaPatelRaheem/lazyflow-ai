import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MessageForm from "../components/tasks/MessageForm";
import TaskList from "../components/tasks/TaskList";
import { generateTasks } from "../services/taskService";
import SaveListModal from "../components/collections/SaveListModal";
import AddTaskModal from "../components/tasks/AddTaskModal";
import TaskOverview from "../components/tasks/TaskOverview";
import ConfirmModal from "../components/common/ConfrimModal";
import { capitalizeFirstLetter, formatDeadline } from "../utils/formatText";
import { isDuplicateMessage, rememberMessage } from "../utils/messageHistory";

const createGroupTitle = (message) => {
  // Remove common greetings from the beginning.
  const cleanedMessage = message
    .replace(/^(hey|hi|hello)\s+(team|everyone|all)?[,\s!]*/i, "")
    .trim();

  // Take the first sentence or line.
  const firstSentence = cleanedMessage.split(/[.!?\n]/)[0];

  // Limit the heading to six words.
  const shortTitle = firstSentence.split(/\s+/).slice(0, 6).join(" ");

  // Fall back to a default heading if needed.
  return shortTitle || "Generated Tasks";
};

const Dashboard = () => {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("lazyflow-tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [taskNotice, setTaskNotice] = useState("");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isClearAllOpen, setIsClearAllOpen] = useState(false);
  const [messageResetKey, setMessageResetKey] = useState(0);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [saveMode, setSaveMode] = useState("all");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openAddTaskModal) {
      setIsAddTaskModalOpen(true);

      navigate("/", {
        replace: true,
        state: null,
      });
    }
  }, [location.state, navigate]);

  // Automatically persist Dashboard tasks to localStorage.
  useEffect(() => {
    localStorage.setItem("lazyflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleGenerateTasks = async (message) => {
    try {
      setError("");
      setTaskNotice("");

      if (isDuplicateMessage(message)) {
        setTaskNotice(
          "This message has already been processed. No duplicate tasks were created.",
        );
        return;
      }
      setIsLoading(true);

      const { groupTitle, tasks: generatedTasks } =
        await generateTasks(message);

      if (generatedTasks.length === 0) {
        setTaskNotice(
          "No actionable tasks found. Try pasting a message with clear instructions, reminders, or action items.",
        );
        return;
      }

      // Create a unique group for this message.
      const groupId = crypto.randomUUID();

      const generatedAt = new Date().toISOString();

      const tasksWithIds = generatedTasks.map((task) => ({
        ...task,

        deadline: formatDeadline(task.deadline),

        id: crypto.randomUUID(),
        completed: false,
        groupId,
        groupTitle,
        generatedAt,
      }));

      setTasks((prevTasks) => [...prevTasks, ...tasksWithIds]);

      rememberMessage(message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Select or deselect an individual task for saving.
  const handleSelectTask = (taskId) => {
    setSelectedTaskIds((prevIds) =>
      prevIds.includes(taskId)
        ? prevIds.filter((id) => id !== taskId)
        : [...prevIds, taskId],
    );
  };

  const handleSelectGroup = (groupTasks) => {
    setSelectedTaskIds((prevIds) => {
      const groupTaskIds = groupTasks.map((task) => task.id);
      const allSelected = groupTaskIds.every((id) => prevIds.includes(id));

      if (allSelected) {
        return prevIds.filter((id) => !groupTaskIds.includes(id));
      }

      return [...new Set([...prevIds, ...groupTaskIds])];
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    setSelectedTaskIds((prevIds) => prevIds.filter((id) => id !== taskId));
  };

  const handleClearAllTasks = () => {
    if (tasks.length === 0) return;
    setIsClearAllOpen(true);
  };

  const confirmClearAllTasks = () => {
    setTasks([]);
    setSelectedTaskIds([]);
    setIsClearAllOpen(false);
  };

  const handleEditTask = (taskId, updatedData) => {
    const formattedData = {
      ...updatedData,
      title: capitalizeFirstLetter(updatedData.title),
      deadline: formatDeadline(updatedData.deadline),
    };

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...formattedData } : task,
      ),
    );
  };

  const handleSaveList = (listName) => {
    const tasksToSave =
      saveMode === "selected"
        ? tasks.filter((task) => selectedTaskIds.includes(task.id))
        : tasks;

    if (tasksToSave.length === 0) return;

    const savedLists = JSON.parse(
      localStorage.getItem("lazyflow-saved-lists") || "[]",
    );

    const newList = {
      id: crypto.randomUUID(),
      name: capitalizeFirstLetter(listName),

      tasks: tasksToSave,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "lazyflow-saved-lists",
      JSON.stringify([...savedLists, newList]),
    );

    window.dispatchEvent(new Event("lazyflow-lists-updated"));

    if (saveMode === "selected") {
      const savedIds = new Set(tasksToSave.map((task) => task.id));

      setTasks((prevTasks) =>
        prevTasks.filter((task) => !savedIds.has(task.id)),
      );
    } else {
      setTasks([]);
      localStorage.removeItem("lazyflow-message");
      setMessageResetKey((prev) => prev + 1);
    }

    setSelectedTaskIds([]);
    setSaveMode("all");
  };

  const handleAddTask = (newTask) => {
    const formattedTask = {
      ...newTask,
      title: capitalizeFirstLetter(newTask.title),
      deadline: formatDeadline(newTask.deadline),

      groupId: "manual-tasks",
      groupTitle: "Manually Added Tasks",

      generatedAt: newTask.generatedAt || new Date().toISOString(),
    };

    setTasks((prevTasks) => [...prevTasks, formattedTask]);
  };

  return (
    <>
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <MessageForm
            key={messageResetKey}
            onGenerateTasks={handleGenerateTasks}
            isLoading={isLoading}
            onMessageChange={() => {
              setTaskNotice("");
              setError("");
            }}
          />
        </div>

        <div className="min-w-0">
          <TaskOverview tasks={tasks} />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-red-600">
          {error}
        </p>
      )}

      {taskNotice && (
        <div
          role="status"
          className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700"
        >
          {taskNotice}
        </div>
      )}

      {tasks.length > 0 && (
        <div className="mt-8 mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Your Tasks</h2>

            <p className="mt-1 text-sm text-slate-500">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} ready to
              manage
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSaveMode("all");
                setIsSaveModalOpen(true);
              }}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Save All Tasks
            </button>

            <button
              type="button"
              onClick={() => {
                setSaveMode("selected");
                setIsSaveModalOpen(true);
              }}
              disabled={selectedTaskIds.length === 0}
              className="rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400 disabled:hover:bg-white"
            >
              Save Selected ({selectedTaskIds.length})
            </button>

            <button
              type="button"
              onClick={handleClearAllTasks}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
        selectedTaskIds={selectedTaskIds}
        onSelectTask={handleSelectTask}
        onSelectGroup={handleSelectGroup}
      />

      <SaveListModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={handleSaveList}
      />

      {isAddTaskModalOpen && (
        <AddTaskModal
          onSave={handleAddTask}
          onClose={() => setIsAddTaskModalOpen(false)}
        />
      )}

      {isClearAllOpen && (
        <ConfirmModal
          title="Clear all tasks?"
          message="Are you sure you want to clear all Dashboard tasks? This action cannot be undone."
          confirmText="Clear All"
          onConfirm={confirmClearAllTasks}
          onClose={() => setIsClearAllOpen(false)}
        />
      )}
    </>
  );
};

export default Dashboard;
