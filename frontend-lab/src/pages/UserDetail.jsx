
import { Link, useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useUser } from '../hooks/useUsers.js';

export default function UserDetail() {
  const { id } = useParams();
  const { data: user, isLoading, isError, error } = useUser(id);

  if (isLoading) {
    return <p className="text-muted">Loading user details...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Error loading user: {error.message}
      </p>
    );
  }

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
