
import Link from 'next/link';
import '../styles/globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="relative min-h-screen text-gray-800 overflow-x-hidden">
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


       
        <div className="relative z-10 min-h-screen">
        
        <nav className="p-4 text-white bg-[#C8102E]">

            <ul className="flex gap-4">
              <li>
                <Link href="/" className="hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link href="/tasks" className="hover:text-gray-300">Tasks</Link>
              </li>
            </ul>
          </nav>

          
          <main className="p-8">{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;

