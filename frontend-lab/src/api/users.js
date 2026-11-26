
const BASE =
  import.meta.env.VITE_API_URL ??
  'https://jsonplaceholder.typicode.com';

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function fetchUsers() {
  return request('/users');
}

export function fetchUser(id) {
  return request(`/users/${id}`);
}

export function createUser(user) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}
