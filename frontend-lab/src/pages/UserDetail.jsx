import { Link, useLoaderData } from 'react-router-dom';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

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
    return (
      <Card>
        <h2 className="text-xl font-semibold text-fg">User not found</h2>
        <Link to="/users" className="mt-4 inline-block">
          <Button variant="ghost">Back to Users</Button>
        </Link>
      </Card>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-fg">User Details</h1>

      <Card>
        <h2 className="text-xl font-semibold text-fg">{user.name}</h2>

        <p className="mt-2 text-muted">
          Email: {user.email}
        </p>

        <Link to="/users" className="mt-4 inline-block">
          <Button variant="ghost">Back to Users</Button>
        </Link>
      </Card>
    </section>
  );
}