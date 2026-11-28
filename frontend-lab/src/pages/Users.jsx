
import { useState, lazy, Suspense } from 'react';
import { useUsers } from '../hooks/useUsers.js';
import { useCreateUser } from '../hooks/useCreateUser.js';
import { useUIStore } from '../store/ui.js';
import UserCard from '../components/UserCard.jsx';

const UserStats = lazy(() => import('../components/UserStats.jsx'));

export default function Users() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showStats, setShowStats] = useState(false);

  const search = useUIStore((state) => state.search);
  const setSearch = useUIStore((state) => state.setSearch);
  const view = useUIStore((state) => state.view);
  const setView = useUIStore((state) => state.setView);

  const { data: users, isLoading, isError, error } = useUsers();
  const createUserMutation = useCreateUser();

  const filteredUsers = (users ?? []).filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();

    createUserMutation.mutate(
      { name, email },
      {
        onSuccess: () => {
          setName('');
          setEmail('');
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div
        className="min-h-64 space-y-4"
        role="status"
        aria-live="polite"
      >
        <p className="text-muted">Loading users...</p>
        <div className="h-20 animate-pulse rounded-card bg-surface" />
        <div className="h-20 animate-pulse rounded-card bg-surface" />
        <div className="h-20 animate-pulse rounded-card bg-surface" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Error loading users: {error.message}
      </p>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-fg">Users</h1>

      <button
        type="button"
        onClick={() => setShowStats((show) => !show)}
        className="rounded-card bg-primary px-5 py-3 text-white"
      >
        {showStats ? 'Hide Statistics' : 'Show Statistics'}
      </button>

      {showStats && (
        <Suspense fallback={<p role="status">Loading statistics...</p>}>
          <UserStats users={users ?? []} />
        </Suspense>
      )}

      <form onSubmit={handleSubmit} className="max-w-md space-y-3">
        <h2 className="text-xl font-semibold text-fg">Add New User</h2>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-card border border-line bg-surface px-4 py-3 text-fg"
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-card border border-line bg-surface px-4 py-3 text-fg"
        />

        <button
          type="submit"
          disabled={createUserMutation.isPending}
          className="rounded-card bg-primary px-5 py-3 text-white disabled:opacity-50"
        >
          {createUserMutation.isPending ? 'Adding...' : 'Add User'}
        </button>

        {createUserMutation.isError && (
          <p className="text-red-500">
            Error adding user: {createUserMutation.error.message}
          </p>
        )}
      </form>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-card border border-line bg-surface px-4 py-3 text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />

        <button
          type="button"
          onClick={() => setView('grid')}
          className={`rounded-card border px-4 py-2 ${
            view === 'grid'
              ? 'bg-primary text-white'
              : 'border-line text-fg'
          }`}
        >
          Grid
        </button>

        <button
          type="button"
          onClick={() => setView('list')}
          className={`rounded-card border px-4 py-2 ${
            view === 'list'
              ? 'bg-primary text-white'
              : 'border-line text-fg'
          }`}
        >
          List
        </button>
      </div>

      <ul
        className={
          view === 'grid'
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex flex-col gap-4'
        }
      >
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>

      {filteredUsers.length === 0 && (
        <p className="text-muted">No users found.</p>
      )}
    </section>
  );
}
