
import { Link, useLoaderData } from 'react-router-dom';

const users = [
  { id: 1, name: 'Sneha Pandey', email: 'sneha@example.com' },
  { id: 2, name: 'Ram Sharma', email: 'ram@example.com' },
  { id: 3, name: 'Sita Thapa', email: 'sita@example.com' },
];

export function userDetailLoader({ params }) {
  const user = users.find((u) => u.id === Number(params.id));
  return user || null;
}

export default function UserDetail() {
  const user = useLoaderData();

  if (!user) {
    return <h2>User not found</h2>;
  }

  return (
    <section>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <Link to="/users">Back to Users</Link>
    </section>
  );
}
