import { CheckCircle, Edit2, Trash2 } from "lucide-react";

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }) {
  const taskId = task._id || task.id; // support MongoDB _id or fallback id
  const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A";

  return (
    <div
      className={`p-4 rounded-lg shadow flex justify-between items-center ${
        task.completed ? "bg-green-50 border border-green-300" : "bg-white"
      }`}
    >
      {/* Task Details */}
      <div className="flex flex-col">
        <h3
          className={`font-semibold ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title || "Untitled Task"}
        </h3>
        <p className="text-sm text-gray-600">{task.description || "-"}</p>
        <p className="text-xs text-gray-500 mt-1">
          Priority: <b>{task.priority || "N/A"}</b> | Due: {dueDate}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onToggleComplete(task)}
          className={`p-2 rounded-full ${
            task.completed
              ? "bg-yellow-200 hover:bg-yellow-300"
              : "bg-green-200 hover:bg-green-300"
          }`}
          title={task.completed ? "Mark as Incomplete" : "Mark as Completed"}
        >
          <CheckCircle size={18} />
        </button>

        <button
          onClick={() => onEdit(task)}
          className="p-2 bg-blue-200 hover:bg-blue-300 rounded-full"
          title="Edit Task"
        >
          <Edit2 size={18} />
        </button>

        <button
          onClick={() => onDelete(taskId)}
          className="p-2 bg-red-200 hover:bg-red-300 rounded-full"
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
