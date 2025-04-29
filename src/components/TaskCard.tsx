
'use client';

import React from 'react';
import Link from 'next/link';

type TaskCardProps = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  status,
  priority,
  dueDate,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <p className="text-sm text-gray-500">Status: {status}</p>
      <p className="text-sm text-gray-500">Priority: {priority}</p>
      <p className="text-sm text-gray-500">Due Date: {dueDate}</p>

      
      <div className="flex gap-4">
        <Link href={`/tasks/${id}`}>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
