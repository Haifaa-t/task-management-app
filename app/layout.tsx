// app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Task Management App',
  description: 'Built with Next.js, Zustand, and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 relative overflow-x-hidden">
    
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/tamkeen-logo.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "80px",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity: 0.05,
          }}
        />

    
        <nav className="p-4 text-white relative z-10" style={{ backgroundColor: '#C8102E' }}>
          <ul className="flex gap-4">
            <li>
              <Link href="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link href="/tasks" className="hover:text-gray-300">Tasks</Link>
            </li>
          </ul>
        </nav>


        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}

