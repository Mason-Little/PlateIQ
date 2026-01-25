import { useCallback } from "react";
import { usePlateIqStore } from "@/store/PlateIqStore";
import type { ExerciseEntry } from "@/types";

const useExerciseState = () => {
  const sessionsById = usePlateIqStore((state) => state.sessionsById);
  const exerciseEntriesById = usePlateIqStore((state) => state.exerciseEntriesById);
  const createExerciseEntryForSession = usePlateIqStore(
    (state) => state.createExerciseEntryForSession
  );

  const getExerciseEntriesForSession = useCallback(
    (sessionId: string) => {
      const session = sessionsById[sessionId];
      if (!session) {
        return [];
      }
      return session.exerciseEntryIds
        .map((entryId) => exerciseEntriesById[entryId])
        .filter((entry): entry is ExerciseEntry => Boolean(entry));
    },
    [sessionsById, exerciseEntriesById]
  );

  return {
    getExerciseEntriesForSession,
    createExerciseEntryForSession,
  };
};

export default useExerciseState;
