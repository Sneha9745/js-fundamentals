import { Link } from 'react-router-dom';
import { Card } from './ui/Card.jsx';
import { Button } from './ui/Button.jsx';
import { useToggleFavourite } from '../hooks/useToggleFavourite.js';

export default function UserCard({ user }) {
  const toggleFavourite = useToggleFavourite();
  const isFavourite = user.favourite ?? false;

  function handleFavourite() {
    toggleFavourite.mutate({
      id: user.id,
      favourite: !isFavourite,
    });
  }

  return (
    <Card className="transition hover:shadow-md">
      <h3 className="text-lg font-semibold text-fg">
        {user.name}
      </h3>

      <p className="mt-2 text-sm text-muted">
        {user.email}
      </p>

      <button
        type="button"
        onClick={handleFavourite}
        disabled={toggleFavourite.isPending}
        className="mt-3 rounded-card border border-line px-3 py-2 text-sm text-fg disabled:opacity-50"
      >
        {isFavourite ? '♥ Favourite' : '♡ Add to Favourite'}
      </button>

      <Link to={`/users/${user.id}`} className="mt-4 inline-block">
        <Button variant="ghost" type="button">
          View Details
        </Button>
      </Link>
    </Card>
  );
}