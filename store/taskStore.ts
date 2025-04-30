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

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filteredStatus: 'All',
  searchQuery: '',

  setTasks: (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    set({ tasks });
  },

  addTask: (task) => {
    const updatedTasks = [...get().tasks, task];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    set({ tasks: updatedTasks });
  },

  deleteTask: (id) => {
    const updatedTasks = get().tasks.filter((t) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    set({ tasks: updatedTasks });
  },

  setFilteredStatus: (status) => set({ filteredStatus: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

