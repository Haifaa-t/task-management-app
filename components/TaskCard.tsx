'use client';

import Link from 'next/link';
import React from 'react';

type Props = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

const TaskCard: React.FC<Props> = ({
  id,
  title,
  description,
  status,
  priority,
  dueDate,
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

     
      <div className="flex justify-end mt-4">
        <Link href={`/tasks/${id}`}>
          <button className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
            View Task
          </button>
        </Link>
      </div>
    </div>
  );
};

