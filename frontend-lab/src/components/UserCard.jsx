import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <Link to={`/users/${user.id}`}>View Details</Link>
    </div>
  );
}