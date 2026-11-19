import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg space-y-6 text-center">
      <Card>
        <h1 className="text-3xl font-bold text-fg">
          404 - Page Not Found
        </h1>

        <p className="mt-3 text-muted">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link to="/" className="mt-5 inline-block">
          <Button>Go Home</Button>
        </Link>
      </Card>
    </section>
  );
}