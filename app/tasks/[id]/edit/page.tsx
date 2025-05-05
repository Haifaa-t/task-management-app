'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/taskStore';
import React, { useState, useEffect } from 'react';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';

const EditTaskPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const taskId = Number(id);

  const { tasks, setTasks } = useTaskStore();
  const task = tasks.find((t) => t.id === taskId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleUpdate = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? { ...t, title, description, status, priority, dueDate }
        : t
    );
    setTasks(updatedTasks);
    router.push(`/tasks/${taskId}`);
  };

  if (!task) return <div className="p-6 text-center">Task not found</div>;

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded shadow">
      <PageTitle>Edit Task</PageTitle>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          className="p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
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
          className="p-2 border rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={() => router.push(`/tasks/${taskId}`)} className="bg-gray-300 text-black hover:bg-gray-400">
          Cancel
        </Button>
        <Button onClick={handleUpdate}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditTaskPage;






