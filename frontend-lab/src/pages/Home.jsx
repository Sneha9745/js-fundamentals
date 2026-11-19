
import { useEffect, useState } from 'react';

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
    <section>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <p>Window width: {width}px</p>
    </section>
  );
}
