'use client';

import React from 'react';

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default TaskModal;



