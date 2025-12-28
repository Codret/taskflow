import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Calendar, Clock, Plus } from "lucide-react";

import TaskItem from "../components/TaskItem";
import TaskModel from "../components/TaskModal";

const Dashboard = () => {
  // Fallback if useOutletContext returns null
  const context = useOutletContext() || {};
  const { tasks: allTasks = [], refreshTasks = () => {} } = context;

  const [sortBy, setSortBy] = useState("newest");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModel, setShowModel] = useState(false);

  const sortedTasks = useMemo(() => {
    return [...allTasks].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (sortBy === "oldest") return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);

      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (priorityOrder[b.priority?.toLowerCase()] || 0) - (priorityOrder[a.priority?.toLowerCase()] || 0);
    });
  }, [allTasks, sortBy]);

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="header flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
          <Calendar className="w-6 h-6 text-purple-500" />
          Dashboard
        </h1>

        <div
          className="add-task flex items-center gap-3 cursor-pointer"
          onClick={() => setShowModel(true)}
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:shadow-md transition">
            <Plus className="text-purple-500" size={18} />
          </div>
          <span className="font-medium">Add New Task</span>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list space-y-4 mt-4">
        {sortedTasks.length === 0 ? (
          <div className="empty-state text-center py-6">
            <Clock className="w-8 h-8 text-purple-500 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-800 mt-2">All Caught Up!</h3>
            <p className="text-sm text-gray-500 mt-1">No pending tasks</p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <TaskItem
              key={task.id || task._id}
              task={task}
              onEdit={(t) => setSelectedTask(t)}
              onDelete={() => {}}
              onToggleComplete={() => {}}
              showCompleteCheckbox={true}
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          ))
        )}
      </div>

      {/* Task Modal */}
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

export default Dashboard;
