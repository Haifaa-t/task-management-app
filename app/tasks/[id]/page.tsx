'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/taskStore';
import React from 'react';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';

const TaskDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const taskId = Number(id);
  const { tasks, deleteTask } = useTaskStore();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return <div className="p-6 text-center">Task not found</div>;

  const handleDelete = () => {
    deleteTask(task.id);
    router.push('/tasks');
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <PageTitle>{task.title}</PageTitle>

      <p className="mb-2 text-gray-700">{task.description}</p>
      <div className="text-sm text-gray-600 mb-4">
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
        <p>Due Date: {task.dueDate}</p>
      </div>

      <div className="flex justify-end gap-4">
        <Button onClick={() => router.push(`/tasks/${task.id}/edit`)}>
          Edit
        </Button>
        <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
          Delete
        </Button>
      </div>

      <Button
        onClick={() => router.push('/tasks')}
        className="mt-6 bg-[#F2F2F2] text-[#555] hover:bg-[#e0e0e0]"
      >
        ← Back to Tasks
      </Button>
    </div>
  );
};

export default TaskDetailPage;



