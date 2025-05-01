'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTaskStore } from '@/store/taskStore';
import React from 'react';

const TaskDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const taskId = Number(id);
  const { tasks, deleteTask } = useTaskStore();
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return <div className="p-6 text-center">Task not found</div>;

  const handleDelete = () => {
    deleteTask(task.id);
    router.push('/tasks'); // رجوع للصفحة الرئيسية بعد الحذف
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-red-600">{task.title}</h1>
      <p className="mb-2 text-gray-700">{task.description}</p>
      <div className="text-sm text-gray-600 mb-4">
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
        <p>Due Date: {task.dueDate}</p>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push(`/tasks/${task.id}/edit`)}
          className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Delete
        </button>
      </div>
      <button
  onClick={() => router.push('/tasks')}
  className="mt-6 px-4 py-2 rounded bg-[#F2F2F2] text-[#555] font-medium hover:bg-[#e0e0e0] transition"
>
  ← Back to Tasks
</button>


    </div>
  );
};

export default TaskDetailPage;

export default TaskDetailsPage;
