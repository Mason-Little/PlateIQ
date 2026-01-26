import { fetchUser, updateUserSplit } from "@/api/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserData = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const updateSplitMutation = useMutation({
    mutationFn: (selectedSplitId?: string) => updateUserSplit(selectedSplitId),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
  });

  return {
    user: data,
    isLoading,
    error,
    updateUserSplit: updateSplitMutation.mutateAsync,
    isUpdatingSplit: updateSplitMutation.isPending,
  };
};
