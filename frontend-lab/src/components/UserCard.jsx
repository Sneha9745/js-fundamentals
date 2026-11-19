import { Link } from 'react-router-dom';
import { Card } from './ui/Card.jsx';
import { Button } from './ui/Button.jsx';

export default function UserCard({ user }) {
  return (
    <Card className="transition hover:shadow-md">
      <h3 className="text-lg font-semibold text-fg">
        {user.name}
      </h3>

      <p className="mt-2 text-sm text-muted">
        {user.email}
      </p>

      <Link to={`/users/${user.id}`} className="mt-4 inline-block">
        <Button variant="ghost" type="button">
          View Details
        </Button>
      </Link>
    </Card>
  );
}