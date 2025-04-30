
'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-xl space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Welcome to Task Manager
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl">
          Organize your work and get things done.
        </p>
        <div className="flex justify-center gap-4">
        <Link href="/tasks">
  <button
    className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition"
    style={{ backgroundColor: '#FFC72C', color: '#000' }} 
  >
    View Tasks
  </button>
</Link>

        
        </div>
      </div>
    </main>
  );
}
