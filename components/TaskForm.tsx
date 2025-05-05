'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PageTitle from './PageTitle';
import Button from './Button';
import Input from './Input';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.string(),
  priority: z.string(),
  dueDate: z.string().min(1, 'Due date is required'),
});

type FormData = z.infer<typeof schema>;

type Task = {
  id?: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

type Props = {
  onAddTask: (
    title: string,
    description: string,
    status: string,
    priority: string,
    dueDate: string,
    taskId?: number
  ) => void;
  initialData?: Task | null;
  isEditMode: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskForm({
  onAddTask,
  initialData,
  isEditMode,
  isModalOpen,
  setIsModalOpen,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'Pending',
      priority: 'Low',
      dueDate: '',
    },
  });

  const onSubmit = (data: FormData) => {
    onAddTask(
      data.title,
      data.description,
      data.status,
      data.priority,
      data.dueDate,
      initialData?.id
    );
    setIsModalOpen(false);
    reset();
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <PageTitle>{isEditMode ? 'Edit Task' : 'Add Task'}</PageTitle>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
                  <Input
                    {...register('title')}
                    placeholder="Task Title"
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                  <textarea
                    {...register('description')}
                    placeholder="Task Description"
                    className="p-2 border rounded"
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                  <select {...register('status')} className="p-2 border rounded">
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>

                  <select {...register('priority')} className="p-2 border rounded">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>

                  <Input
                    type="date"
                    {...register('dueDate')}
                  />
                  {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}

                  <div className="flex justify-end gap-4 mt-4">
                    <Button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                      Cancel
                    </Button>
                    <Button type="submit">
                      {isEditMode ? 'Save Changes' : 'Add Task'}
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

