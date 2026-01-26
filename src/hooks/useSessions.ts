import {
  deleteSession,
  fetchSessionByDate,
  fetchSessions,
  updateSession,
} from "@/api/sessions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSessions = () =>
  useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

export const useSessionByDate = (sessionDate: string) =>
  useQuery({
    queryKey: ["sessions", sessionDate],
    queryFn: () => fetchSessionByDate(sessionDate),
  });

export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
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
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });
};
