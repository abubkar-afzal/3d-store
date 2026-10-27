import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-600">
            🎨 3D Store
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-brand-600">My Configs</Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="hover:text-brand-600">Admin</Link>
                )}
                <span className="text-gray-500">{user.name}</span>
                <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hover:text-brand-600">Login</Link>
                <Link href="/auth/register" className="bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700">
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-white border-t text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} 3D Store. Built with Babylon.js.
      </footer>
    </div>
  );
}