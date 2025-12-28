import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import TaskItem from "../components/TaskItem";
import TaskModel from "../components/TaskModel";
import { PlusIcon, ClockIcon } from "../components/icons"; // make sure to import these

const Pending = () => {
  const { tasks, refreshTasks } = useOutletContext();
  const [sortBy, setSortBy] = useState("newest");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModel, setShowModel] = useState(false);

  const sortedPendingTasks = useMemo(() => {
    const filtered = tasks.filter(
      (t) => !t.completed || t.completed.toLowerCase() === "no"
    );

    return filtered.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);

      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority?.toLowerCase()] || 0) - (priorityOrder[a.priority?.toLowerCase()] || 0);
    });
  }, [tasks, sortBy]);

  return (
    <div className="pending-page">
      <div className="header flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Pending Tasks</h1>
        <div
          className="add-task flex items-center gap-3 cursor-pointer"
          onClick={() => setShowModel(true)}
        >
          <PlusIcon className="text-purple-500 w-6 h-6" />
          <span className="font-medium">Add Task</span>
        </div>
      </div>

      <div className="task-list space-y-4">
        {sortedPendingTasks.length === 0 ? (
          <div className="empty-state text-center py-6">
            <ClockIcon className="w-8 h-8 text-purple-500 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 mt-2">All Pending Cleared!</h3>
            <p className="text-sm text-gray-500 mt-1">No pending tasks</p>
          </div>
        ) : (
          sortedPendingTasks.map((task) => (
            <TaskItem
              key={task.id || task._id}
              task={task}
              refreshTasks={refreshTasks}
              onEdit={() => {
                setSelectedTask(task);
                setShowModel(true);
              }}
              showCompleteCheckbox={true}
            />
          ))
        )}
      </div>

      <TaskModel
        isOpen={!!selectedTask || showModel}
        onClose={() => {
          setShowModel(false);
          setSelectedTask(null);
        }}
        taskToEdit={selectedTask}
        onSave={refreshTasks}
      />
    </div>
  );
};

export default Pending;
