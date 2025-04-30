'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTaskStore } from '../../../store/taskStore';
import TaskForm from '../../../components/TaskForm';
import Link from 'next/link';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    tasks,
    deleteTask,
    setTasks,
    addTask,
  } = useTaskStore();

  const [task, setTask] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const taskId = Number(id);
    const found = tasks.find((t) => t.id === taskId);
    setTask(found);
  }, [id, tasks]);

  const handleDelete = () => {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      deleteTask(task.id);
      router.push('/tasks');
    }
  };

  const handleEdit = (
    title: string,
    description: string,
    status: string,
    priority: string,
    dueDate: string,
    taskId?: number
  ) => {
    const updated = tasks.map((t) =>
      t.id === taskId
        ? { ...t, title, description, status, priority, dueDate }
        : t
    );
    setTasks(updated);
    setIsModalOpen(false);
  };

  if (!task) {
    return <div className="p-8 text-center text-gray-600">Task not found</div>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-red-600 mb-2">{task.title}</h1>
      <p className="text-gray-700 mb-4">{task.description}</p>
      <div className="text-sm text-gray-500 space-y-1">
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
        <p>Due Date: {task.dueDate}</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        
        <Link href="/tasks">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium">
            ← Back to Tasks
          </button>
        </Link>

        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded bg-yellow-400 text-black hover:brightness-95"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      {isModalOpen && (
        <TaskForm
          onAddTask={handleEdit}
          initialData={task}
          isEditMode={true}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default TaskDetailsPage;
