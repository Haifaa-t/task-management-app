'use client';

import React from 'react';

type Props = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskCard: React.FC<Props> = ({
  title,
  description,
  status,
  priority,
  dueDate,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg border-t-4 border-red-600">
      <h2 className="text-xl font-bold text-red-600">{title}</h2>
      <p className="text-gray-600 mt-1">{description}</p>
      <div className="text-sm text-gray-500 mt-2">
        <p>Status: {status}</p>
        <p>Priority: {priority}</p>
        <p>Due: {dueDate}</p>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

