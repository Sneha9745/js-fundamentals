
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import UserCard from '../components/UserCard.jsx';

const users = [
  { id: 1, name: 'Sneha Pandey', email: 'sneha@example.com' },
  { id: 2, name: 'Ram Sharma', email: 'ram@example.com' },
  { id: 3, name: 'Sita Thapa', email: 'sita@example.com' },
];

export default function Users() {
  const [search, setSearch] = useLocalStorage('userSearch', '');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-fg">Users</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md rounded-card border border-line bg-surface px-4 py-3 text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
