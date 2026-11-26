import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useToggleFavourite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, favourite }) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ favourite }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update favourite');
      }

      return response.json();
    },

    onMutate: async ({ id, favourite }) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });

      const previousUsers = queryClient.getQueryData(['users']);
      const previousUser = queryClient.getQueryData(['users', id]);

      queryClient.setQueryData(['users'], (oldUsers) =>
        oldUsers?.map((user) =>
          user.id === id ? { ...user, favourite } : user
        )
      );

      queryClient.setQueryData(['users', id], (oldUser) =>
        oldUser ? { ...oldUser, favourite } : oldUser
      );

      return { previousUsers, previousUser, id };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }

      if (context?.previousUser) {
        queryClient.setQueryData(
          ['users', context.id],
          context.previousUser
        );
      }
    },
  });
}
