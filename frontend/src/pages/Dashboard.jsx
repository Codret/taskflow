import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/tasks/gp", {
        withCredentials: true,
      });
      setTasks(res.data.tasks || []);
    } catch {
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(
          `http://localhost:4000/api/tasks/${editingTask._id}/gp`,
          form,
          { withCredentials: true }
        );
        toast.success("Task updated!");
        setEditingTask(null);
      } else {
        await axios.post("http://localhost:4000/api/tasks/gp", form, {
          withCredentials: true,
        });
        toast.success("Task created!");
      }

      setForm({ title: "", description: "", priority: "Low", dueDate: "" });
      fetchTasks();
    } catch {
      toast.error("Failed to save task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setForm({ title: "", description: "", priority: "Low", dueDate: "" });
  };

  const handleToggleComplete = async (task) => {
    try {
      await axios.put(
        `http://localhost:4000/api/tasks/${task._id}/gp`,
        { completed: !task.completed },
        { withCredentials: true }
      );
      toast.success(task.completed ? "Marked incomplete" : "Marked completed");
      fetchTasks();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}/gp`, {
        withCredentials: true,
      });
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {editingTask ? "Edit Task" : "Add New Task"}
        </h2>

        {/* Create / Edit Form */}
        <form
          onSubmit={handleCreate}
          className="flex flex-col md:flex-row gap-3 mb-6"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="flex-1 border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="flex-1 border p-2 rounded"
          />
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingTask ? "Update" : "Add"}
            </button>
            {editingTask && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Tasks List */}
        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
