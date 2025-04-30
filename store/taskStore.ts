import { create } from 'zustand';

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

type TaskStore = {
  tasks: Task[];
  filteredStatus: string;
  searchQuery: string;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  setFilteredStatus: (status: string) => void;
  setSearchQuery: (query: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  filteredStatus: 'All',
  searchQuery: '',
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  setFilteredStatus: (status) => set({ filteredStatus: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
