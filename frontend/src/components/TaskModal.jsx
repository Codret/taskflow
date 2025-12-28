import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { X, PlusCircle, Save } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

const defaultTask = {
  title: "",
  description: "",
  priority: "low",
  dueDate: "",
  completed: "no",
};

export default function TaskModal({ isOpen, taskToEdit, onClose, onSave }) {
  const [taskData, setTaskData] = useState(defaultTask);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset task data when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setTaskData(taskToEdit ? { ...taskToEdit } : defaultTask);
    setError(null);
  }, [isOpen, taskToEdit]);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Submit task (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const isEdit = Boolean(taskData._id);
      const url = isEdit
        ? `${API_BASE}/api/tasks/${taskData._id}`
        : `${API_BASE}/api/tasks`;

      const method = isEdit ? "put" : "post";

      // ✅ CORRECT: let browser send cookie automatically
      await axios[method](url, taskData, {
        withCredentials: true,
      });

      await onSave(); // refresh tasks
      onClose(); // close modal
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          {taskData._id ? <Save size={20} /> : <PlusCircle size={20} />}
          {taskData._id ? "Edit Task" : "Create Task"}
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-600 mb-3">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={taskData.title}
            onChange={handleChange}
            placeholder="Task title"
            required
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />

          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate ? taskData.dueDate.split("T")[0] : ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            {loading
              ? "Saving..."
              : taskData._id
              ? "Update Task"
              : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
