
import React, { useState, useEffect } from 'react';

type TaskModalProps = {
  isOpen: boolean;
  taskData?: any;
  onClose: () => void;
  onSave: (title: string, description: string, status: string, priority: string, dueDate: string, taskId?: number) => void;
};

const TaskModal = ({ isOpen, taskData, onClose, onSave }: TaskModalProps) => {
  const [title, setTitle] = useState(taskData ? taskData.title : '');
  const [description, setDescription] = useState(taskData ? taskData.description : '');
  const [status, setStatus] = useState(taskData ? taskData.status : 'Pending');
  const [priority, setPriority] = useState(taskData ? taskData.priority : 'Low');
  const [dueDate, setDueDate] = useState(taskData ? taskData.dueDate : '');

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title);
      setDescription(taskData.description);
      setStatus(taskData.status);
      setPriority(taskData.priority);
      setDueDate(taskData.dueDate);
    }
  }, [taskData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, description, status, priority, dueDate, taskData?.id);
    onClose(); 
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity ${!isOpen && 'hidden'}`}
    >
      <div className="bg-white p-6 rounded-md w-80">
        <h2 className="text-xl font-semibold">{taskData ? 'Edit Task' : 'Add New Task'}</h2>
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
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded"
            >
              {taskData ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
