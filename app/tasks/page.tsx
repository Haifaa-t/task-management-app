'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
import { useTaskStore } from '@/store/taskStore';
import PageTitle from '@/components/PageTitle';
import Button from '@/components/Button';


const TasksPage = () => {
  const {
    tasks,
    addTask,
    filteredStatus,
    searchQuery,
    setFilteredStatus,
    setSearchQuery,
  } = useTaskStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filteredStatus === 'All' || task.status === filteredStatus;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddTask = (
    title: string,
    description: string,
    status: string,
    priority: string,
    dueDate: string,
    taskId?: number
  ) => {
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      title,
      description,
      status,
      priority,
      dueDate,
    };
    addTask(newTask);
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <PageTitle>Task List</PageTitle>

      
      <div className="my-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <label className="mr-2">Filter by Status:</label>
          <select
            value={filteredStatus}
            onChange={(e) => setFilteredStatus(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Search Tasks:</label>
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>
      </div>

      
      <div className="my-6 text-right">
        <Button onClick={() => setIsModalOpen(true)}>Add New Task</Button>
      </div>

     
      <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <Link key={task.id} href={`/tasks/${task.id}`} className="block">
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              priority={task.priority}
              dueDate={task.dueDate}
            />
          </Link>
        ))}
      </div>

      
      {isModalOpen && (
        <TaskForm
          onAddTask={handleAddTask}
          isEditMode={false}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default TasksPage;

