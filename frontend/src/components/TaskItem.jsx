import { isToday, format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import tiClasses from "../styles/taskItem.module.css";

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const dueDate = task?.dueDate ? new Date(task.dueDate) : null;
  const createdAt = task?.createdAt ? new Date(task.createdAt) : null;

  const isDueToday = dueDate ? isToday(dueDate) : false;

  return (
    <div className={tiClasses.taskCard}>
      {/* Optional: Task title and description */}
      <div className="flex flex-col mb-2">
        <h3 className="font-semibold">{task?.title || "Untitled Task"}</h3>
        {task?.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}
      </div>

      {/* Dates Row */}
      <div className="flex items-center gap-4 text-sm">
        {/* Due Date */}
        <div className={tiClasses.dateRow}>
          <Calendar className="w-3.5 h-3.5" />
          <span
            className={isDueToday ? "text-red-500 font-medium" : "text-gray-500"}
          >
            {dueDate ? format(dueDate, "dd MMM") : "No due date"}
          </span>
        </div>

        {/* Created Date */}
        <div className={tiClasses.createdRow}>
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-gray-400 text-xs">
            {createdAt ? format(createdAt, "dd MMM") : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
