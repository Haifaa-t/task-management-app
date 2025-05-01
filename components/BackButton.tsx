'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/tasks')}
      className="mt-6 px-4 py-2 rounded bg-[#F2F2F2] text-[#555] font-medium hover:bg-[#e0e0e0] transition"
    >
      ← Back to Tasks
    </button>
  );
};

export default BackButton;
