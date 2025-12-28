import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import TaskItem from "../components/TaskItem";

const Completed = () => {
  const { tasks, refreshTasks } = useOutletContext();
  const [sortBy, setSortBy] = useState("newest");

  const sortedCompletedTasks = useMemo(() => {
    const completed = (tasks || []).filter(
      (t) => t.completed === true || t.completed?.toLowerCase() === "yes"
    );

    return completed.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);

      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority?.toLowerCase()] || 0) - (priorityOrder[a.priority?.toLowerCase()] || 0);
    });
  }, [tasks, sortBy]);

  return (
    <div className="completed-page">
      <div className="header flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Completed Tasks</h1>
      </div>

      <div className="task-list space-y-4">
        {sortedCompletedTasks.length === 0 ? (
          <div className="empty-state text-center py-6">
            <CheckCircle className="w-8 h-8 text-purple-500 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 mt-2">No Completed Tasks</h3>
            <p className="text-sm text-gray-500 mt-1">Complete some tasks to see here</p>
          </div>
        ) : (
          sortedCompletedTasks.map((task) => (
            <TaskItem
              key={task.id || task._id}
              task={task}
              onEdit={() => {}}
              onDelete={() => {}}
              onToggleComplete={() => {}}
              className="opacity-90 hover:opacity-100 transition-opacity text-sm md:text-base"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Completed;
