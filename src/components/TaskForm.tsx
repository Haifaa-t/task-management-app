'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';

type TaskFormProps = {
  onAddTask: (
    title: string,
    description: string,
    status: string,
    priority: string,
    dueDate: string,
    taskId?: number
  ) => void;
  initialData?: any;
  isEditMode?: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  initialData,
  isEditMode,
  isModalOpen,
  setIsModalOpen,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setPriority(initialData.priority);
      setDueDate(initialData.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setPriority('Low');
      setDueDate('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(title, description, status, priority, dueDate, initialData?.id);
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <Dialog.Title className="text-xl font-semibold mb-4">
                {isEditMode ? 'Edit Task' : 'Add New Task'}
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 rounded-md"
                  required
                />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 rounded-md"
                  required
                />

                <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded-md">
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded-md">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border p-2 rounded-md"
                  required
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded text-white"
                    style={{ backgroundColor: '#FFC72C' }}
                  >
                    {isEditMode ? 'Save Changes' : 'Add Task'}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskForm;



