import {
  createTrackingSet,
  deleteTrackingSet,
  fetchTrackingSetsForEntry,
  updateTrackingSet,
} from "@/api/trackingSets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTrackingSetData = (exerciseEntryId: string | null) => {
  const queryClient = useQueryClient();

  const {
    data: sets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trackingSets", exerciseEntryId],
    queryFn: () =>
      exerciseEntryId
        ? fetchTrackingSetsForEntry(exerciseEntryId)
        : Promise.resolve([]),
    enabled: Boolean(exerciseEntryId),
  });

  const createMutation = useMutation({
    mutationFn: ({
      exerciseEntryId: createEntryId,
      reps,
      weight,
      time,
    }: {
      exerciseEntryId: string;
      reps: number;
      weight: number;
      time?: number;
    }) => createTrackingSet(createEntryId, reps, weight, time),
    onSuccess: (set) => {
      queryClient.invalidateQueries({
        queryKey: ["trackingSets", set.exerciseEntryId],
      });
    },
  });

  const updateMutation = useMutation({
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

  const deleteMutation = useMutation({
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

  return {
    sets,
    isLoading,
    isError,
    createSet: createMutation.mutate,
    createSetAsync: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateSet: updateMutation.mutate,
    updateSetAsync: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteSet: deleteMutation.mutate,
    deleteSetAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
