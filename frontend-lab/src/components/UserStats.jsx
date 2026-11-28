export default function UserStats({ users }) {
  const totalUsers = users.length;
  const favouriteUsers = users.filter(
    (user) => user.favourite
  ).length;

  return (
    <div className="rounded-card border border-line bg-surface p-5">
      <h2 className="text-xl font-semibold text-fg">
        User Statistics
      </h2>

      <p className="mt-3 text-muted">
        Total Users: {totalUsers}
      </p>

      <p className="mt-2 text-muted">
        Favourite Users: {favouriteUsers}
      </p>
    </div>
  );
}
