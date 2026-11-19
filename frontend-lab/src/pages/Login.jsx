import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email);
    navigate('/profile');
  };

  return (
    <section className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-bold text-fg">Login</h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="block font-medium text-fg">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-card border border-line bg-bg px-4 py-3 text-fg outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />

          <Button type="submit" className="w-full justify-center">
            Login
          </Button>
        </form>
      </Card>
    </section>
  );
}