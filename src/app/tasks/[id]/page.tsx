'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import TaskForm from '@/components/TaskForm'; // Adjust path as needed

const TaskDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const found = tasks.find((t: any) => t.id === parseInt(id as string));
    setTask(found);
  }, [id]);

  const handleDelete = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updated = tasks.filter((t: any) => t.id !== parseInt(id as string));
    localStorage.setItem('tasks', JSON.stringify(updated));
    router.push('/tasks');
  };

  const handleEdit = (title: string, description: string, status: string, priority: string, dueDate: string) => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updated = tasks.map((t: any) =>
      t.id === parseInt(id as string)
        ? { ...t, title, description, status, priority, dueDate }
        : t
    );
    localStorage.setItem('tasks', JSON.stringify(updated));
    setTask({ id: parseInt(id as string), title, description, status, priority, dueDate });
    setIsModalOpen(false);
  };

  if (!task) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{task.title}</h1>
      <p className="mt-4">{task.description}</p>
      <p className="mt-2 text-sm text-gray-600">Status: {task.status}</p>
      <p className="mt-2 text-sm text-gray-600">Priority: {task.priority}</p>
      <p className="mt-2 text-sm text-gray-600">Due Date: {task.dueDate}</p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit Task
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete Task
        </button>
        <button
          onClick={() => router.push('/tasks')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Tasks
        </button>
      </div>

      {isModalOpen && (
        <TaskForm
          initialData={task}
          isEditMode={true}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onAddTask={(title, description, status, priority, dueDate) =>
            handleEdit(title, description, status, priority, dueDate)
          }
        />
      )}
    </div>
  );
};

export default TaskDetailsPage;


