'use client';

import React, { useState, useEffect } from 'react';

type Task = {
  id?: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

type TaskFormProps = {
  onAddTask: (
    title: string,
    description: string,
    status: string,
    priority: string,
    dueDate: string,
    taskId?: number
  ) => void;
  initialData?: Task | null;
  isEditMode: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  initialData,
  isEditMode,
  setIsModalOpen,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setPriority(initialData.priority);
      setDueDate(initialData.dueDate);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(title, description, status, priority, dueDate, initialData?.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? 'Edit Task' : 'Add Task'}
      </h2>
     
  
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="p-2 border rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="p-2 border rounded"
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300"
            >
              {isEditMode ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;





