import { Card } from '../components/ui/Card.jsx';

export default function Profile() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-fg">My Profile</h1>

      <Card>
        <h2 className="text-xl font-semibold text-fg">
          Welcome!
        </h2>

        <p className="mt-2 text-muted">
          Welcome to your profile page!
        </p>
      </Card>
    </section>
  );
}