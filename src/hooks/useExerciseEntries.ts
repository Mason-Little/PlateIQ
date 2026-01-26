import {
  createExerciseEntry,
  deleteExerciseEntry,
  fetchExerciseEntriesForSession,
} from "@/api/exerciseEntries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useExerciseEntryData = (sessionId: string) => {
  const queryClient = useQueryClient();

  const {
    data: entries,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["exerciseEntries", sessionId],
    queryFn: () => fetchExerciseEntriesForSession(sessionId),
    enabled: Boolean(sessionId),
  });

  const createMutation = useMutation({
    mutationFn: ({
      sessionId: createSessionId,
      exerciseSlug,
    }: { sessionId: string; exerciseSlug: string }) =>
      createExerciseEntry(createSessionId, exerciseSlug),
    onSuccess: (entry) => {
      queryClient.invalidateQueries({
        queryKey: ["exerciseEntries", entry.sessionId],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({
      entryId,
      sessionId: _sessionId,
    }: { entryId: string; sessionId: string }) => deleteExerciseEntry(entryId),
    onSuccess: (_value, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["exerciseEntries", variables.sessionId],
      });
    },
  });

  return {
    entries,
    isLoading,
    isError,
    createEntry: createMutation.mutate,
    createEntryAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteEntry: deleteMutation.mutate,
    deleteEntryAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
