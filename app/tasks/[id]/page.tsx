'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/taskStore';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';

const TaskDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const taskId = Number(id);
  const { tasks, deleteTask } = useTaskStore();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <div className="p-6 text-center text-gray-600">
        Task not found
      </div>
    );
  }

  const handleDelete = () => {
    deleteTask(task.id);
    router.push('/tasks');
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <PageTitle>{task.title}</PageTitle>

      <p className="mb-4 text-gray-700">{task.description}</p>

      <div className="text-sm text-gray-600 mb-6 space-y-1">
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Due Date:</strong> {task.dueDate}</p>
      </div>

      <div className="flex justify-end gap-4 flex-wrap">
        <Button
          onClick={() => router.push(`/tasks/${task.id}/edit`)}
          className="bg-yellow-400 hover:bg-yellow-300 text-black"
        >
          Edit
        </Button>
        <Button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Delete
        </Button>
      </div>

      <div className="mt-6">
        <Button
          onClick={() => router.push('/tasks')}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          ← Back to Tasks
        </Button>
      </div>
    </div>
  );
};

export default TaskDetailPage;

