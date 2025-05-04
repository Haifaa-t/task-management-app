import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  filteredStatus: string;
  setFilteredStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      setTasks: (tasks) => set({ tasks }),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      filteredStatus: 'All',
      setFilteredStatus: (status) => set({ filteredStatus: status }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'task-storage', 
    }
  )
);
