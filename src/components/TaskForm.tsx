
'use client';

import React, { useState, useEffect } from 'react';

type TaskFormProps = {
  onAddTask: (title: string, description: string, status: string, priority: string, dueDate: string, taskId?: number) => void;
  initialData?: any;
  isEditMode?: boolean;  
  isModalOpen: boolean; 
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; 
};

const TaskForm = ({ onAddTask, initialData, isEditMode, isModalOpen, setIsModalOpen }: TaskFormProps) => {
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [status, setStatus] = useState(initialData ? initialData.status : 'Pending');
  const [priority, setPriority] = useState(initialData ? initialData.priority : 'Low');
  const [dueDate, setDueDate] = useState(initialData ? initialData.dueDate : '');

  useEffect(() => {
    if (isEditMode && initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setPriority(initialData.priority);
      setDueDate(initialData.dueDate);
    }
  }, [isEditMode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      onAddTask(title, description, status, priority, dueDate, initialData?.id);
      setTitle('');
      setDescription('');
      setDueDate('');
      setIsModalOpen(false);
    }
  };

  if (!isModalOpen) return null; 

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity"
    >
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded-md"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded-md"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded-md"
          />
         <button
  type="submit"
  className="text-black rounded-md px-6 py-3 font-semibold transition hover:brightness-90"
  style={{ backgroundColor: '#FFC72C' }}
>
  {isEditMode ? 'Save Changes' : 'Add Task'}
</button>

        </form>
      </div>
    </div>
  );
};

export default TaskForm;
