import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from './ui/Button.jsx';

export default function Layout() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();

  return (
    <>
      <header className="border-b border-line bg-surface">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 p-4">
          <NavLink
            to="/"
            className="mr-auto text-lg font-semibold text-fg"
          >
            frontend-lab
          </NavLink>

          <NavLink
            to="/users"
            className="text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-primary"
          >
            Users
          </NavLink>

          {user ? (
            <Button variant="ghost" onClick={logout}>
              Logout ({user.name})
            </Button>
          ) : (
            <NavLink
              to="/login"
              className="text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-primary"
            >
              Login
            </NavLink>
          )}

          <Button variant="ghost" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl p-4 md:p-8">
        <Outlet />
      </main>
    </>
  );
}