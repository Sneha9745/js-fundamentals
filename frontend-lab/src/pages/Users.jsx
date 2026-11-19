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
    <section>
      <h1>Users</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}