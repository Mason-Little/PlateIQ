import {
  deleteSession,
  fetchSessionByDate,
  fetchSessions,
  updateSession,
} from "@/api/sessions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSessionData = (sessionDate: string) => {
  const queryClient = useQueryClient();

  const {
    data: sessions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  const {
    data: sessionByDate,
    isLoading: isSessionByDateLoading,
    isError: isSessionByDateError,
  } = useQuery({
    queryKey: ["sessions", sessionDate],
    queryFn: () => fetchSessionByDate(sessionDate),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      sessionId,
      updates,
    }: { sessionId: string; updates: { name: string } }) =>
      updateSession(sessionId, updates),
    onSuccess: (session) => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      queryClient.setQueryData(["sessions", session.sessionDate], session);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  return {
    sessions,
    sessionByDate,
    isLoading: isLoading || isSessionByDateLoading,
    isError: isError || isSessionByDateError,
    updateSession: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteSession: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
