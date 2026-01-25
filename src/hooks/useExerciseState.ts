import { usePlateIqStore } from "@/store/PlateIqStore";
import type { TrackingSet, Workout } from "@/types";

const useExerciseState = () => {
  const getWorkoutsForSession = (sessionId: string) => {
    const { sessionsById, workoutsById } = usePlateIqStore.getState();
    const session = sessionsById[sessionId];
    if (!session) {
      return [];
    }
    return session.workoutIds
      .map((workoutId) => workoutsById[workoutId])
      .filter((workout): workout is Workout => Boolean(workout));
  };

  const getSetsForWorkout = (workoutId: string) => {
    const { workoutsById, setsById } = usePlateIqStore.getState();
    const workout = workoutsById[workoutId];
    if (!workout) {
      return [];
    }
    return workout.setIds
      .map((setId) => setsById[setId])
      .filter((trackingSet): trackingSet is TrackingSet => Boolean(trackingSet));
  };

  const addWorkoutToSession = (sessionId: string, workout: Workout) => {
    usePlateIqStore.getState().addWorkoutToSession(sessionId, workout);
  };

  const createWorkoutForSession = (sessionId: string, exerciseId: string) => {
    return usePlateIqStore.getState().createWorkoutForSession(sessionId, exerciseId);
  };

  const removeWorkoutFromSession = (sessionId: string, workoutId: string) => {
    usePlateIqStore.getState().removeWorkoutFromSession(sessionId, workoutId);
  };

  const addSetToWorkout = (workoutId: string, trackingSet: TrackingSet) => {
    usePlateIqStore.getState().addSetToWorkout(workoutId, trackingSet);
  };

  const removeSetFromWorkout = (workoutId: string, setId: string) => {
    usePlateIqStore.getState().removeSetFromWorkout(workoutId, setId);
  };

  const deleteWorkout = (workoutId: string) => {
    usePlateIqStore.getState().deleteWorkout(workoutId);
  };

  return {
    getWorkoutsForSession,
    getSetsForWorkout,
    addWorkoutToSession,
    createWorkoutForSession,
    removeWorkoutFromSession,
    addSetToWorkout,
    removeSetFromWorkout,
    deleteWorkout,
  };
};

export default useExerciseState;
