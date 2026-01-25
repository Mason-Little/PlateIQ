import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createExerciseEntry,
  deleteExerciseEntry,
  fetchExerciseEntriesForSession,
} from "@/api/exerciseEntries";

export const useExerciseEntriesForSession = (sessionId: string) =>
  useQuery({
    queryKey: ["exerciseEntries", sessionId],
    queryFn: () => fetchExerciseEntriesForSession(sessionId),
    enabled: Boolean(sessionId),
  });

export const useCreateExerciseEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, exerciseSlug }: { sessionId: string; exerciseSlug: string }) =>
      createExerciseEntry(sessionId, exerciseSlug),
    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: ["exerciseEntries", entry.sessionId] });
    },
  });
};

export const useDeleteExerciseEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ entryId, sessionId: _sessionId }: { entryId: string; sessionId: string }) =>
      deleteExerciseEntry(entryId),
    onSuccess: (_value, variables) => {
      queryClient.invalidateQueries({ queryKey: ["exerciseEntries", variables.sessionId] });
    },
  });
};
