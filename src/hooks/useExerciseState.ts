import { usePlateIqStore } from "@/store/PlateIqStore";
import type { ExerciseEntry } from "@/types";

const useExerciseState = () => {
  const getExerciseEntriesForSession = (sessionId: string) => {
    const { sessionsById, exerciseEntriesById } = usePlateIqStore.getState();
    const session = sessionsById[sessionId];
    if (!session) {
      return [];
    }
    return session.exerciseEntryIds
      .map((entryId) => exerciseEntriesById[entryId])
      .filter((entry): entry is ExerciseEntry => Boolean(entry));
  };

  const createExerciseEntryForSession = (sessionId: string, exerciseSlug: string) => {
    return usePlateIqStore.getState().createExerciseEntryForSession(sessionId, exerciseSlug);
  };

  return {
    getExerciseEntriesForSession,
    createExerciseEntryForSession,
  };
};

export default useExerciseState;
