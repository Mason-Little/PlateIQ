import {
  createTrackingSet,
  deleteTrackingSet,
  fetchTrackingSetsForEntry,
  updateTrackingSet,
} from "@/api/trackingSets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTrackingSetsForEntry = (exerciseEntryId: string | null) =>
  useQuery({
    queryKey: ["trackingSets", exerciseEntryId],
    queryFn: () =>
      exerciseEntryId
        ? fetchTrackingSetsForEntry(exerciseEntryId)
        : Promise.resolve([]),
    enabled: Boolean(exerciseEntryId),
  });

export const useCreateTrackingSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      exerciseEntryId,
      reps,
      weight,
      time,
    }: {
      exerciseEntryId: string;
      reps: number;
      weight: number;
      time?: number;
    }) => createTrackingSet(exerciseEntryId, reps, weight, time),
    onSuccess: (set) => {
      queryClient.invalidateQueries({
        queryKey: ["trackingSets", set.exerciseEntryId],
      });
    },
  });
};

export const useUpdateTrackingSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      setId,
      updates,
      exerciseEntryId: _exerciseEntryId,
    }: {
      setId: string;
      updates: { reps: number; weight: number; time?: number };
      exerciseEntryId: string;
    }) => updateTrackingSet(setId, updates),
    onSuccess: (_set, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["trackingSets", variables.exerciseEntryId],
      });
    },
  });
};

export const useDeleteTrackingSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      setId,
      exerciseEntryId: _exerciseEntryId,
    }: { setId: string; exerciseEntryId: string }) => deleteTrackingSet(setId),
    onSuccess: (_value, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["trackingSets", variables.exerciseEntryId],
      });
    },
  });
};
