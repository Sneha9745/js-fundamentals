import { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';

export default function Home() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="space-y-10">
      {/* Hero section using Flexbox */}
      <Card className="flex flex-col items-center gap-8 p-6 md:flex-row md:p-10">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-fg">
            Welcome to frontend-lab
          </h1>

          <p className="text-muted">
            Learn modern frontend development with React, Tailwind CSS,
            responsive layouts and reusable components.
          </p>

          <p className="text-sm text-muted">
            Window width: {width}px
          </p>

          <Button type="button">
            Get Started
          </Button>
        </div>

        <div className="flex-1 rounded-card bg-bg p-8 text-center">
          <p className="text-5xl">🎨</p>
          <h2 className="mt-4 text-2xl font-semibold text-fg">
            Build Beautiful Interfaces
          </h2>
          <p className="mt-2 text-muted">
            Responsive. Reusable. Accessible.
          </p>
        </div>
      </Card>

      {/* Three feature cards using CSS Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-fg">⚡ React</h3>
          <p className="mt-2 text-muted">
            Build interactive user interfaces with reusable components.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-fg">🎨 Tailwind CSS</h3>
          <p className="mt-2 text-muted">
            Style applications quickly with utility-first CSS classes.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-fg">📱 Responsive</h3>
          <p className="mt-2 text-muted">
            Create layouts that work on mobile, tablet and desktop.
          </p>
        </Card>
      </div>
    </section>
  );
}