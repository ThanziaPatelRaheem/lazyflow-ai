import { useState } from "react";
import MessageForm from "../components/tasks/MessageForm";
import TaskList from "../components/tasks/TaskList";
import { generateTasks } from "../services/taskService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateTasks = async (message) => {
    try {
      setIsLoading(true);
      setError("");

      const generatedTasks = await generateTasks(message);

      const tasksWithIds = generatedTasks.map((task) => ({
        ...task,
        id: crypto.randomUUID(),
        completed: false,
      }));

      setTasks(tasksWithIds);
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

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold text-slate-900">LazyFlow AI</h1>

      <p className="mb-8 text-slate-600">
        Turn messy messages into actionable tasks.
      </p>

      <MessageForm
        onGenerateTasks={handleGenerateTasks}
        isLoading={isLoading}
      />

      {error && (
        <p role="alert" className="mt-4 text-red-600">
          {error}
        </p>
      )}

      <TaskList tasks={tasks} onToggleTask={handleToggleTask} />
    </>
  );
};

export default Dashboard;
