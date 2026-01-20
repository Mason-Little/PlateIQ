import { create } from 'zustand';
import type { Exercise, Workout } from './types';

type WorkoutState = {
  workouts: Workout[];
  addWorkout: (name: string) => void;
  deleteWorkout: (id: string) => void;
  addExercise: (workoutId: string, exercise: Omit<Exercise, 'id'>) => void;
  removeExercise: (workoutId: string, exerciseId: string) => void;
};

export const useWorkoutStore = create<WorkoutState>((set) => ({
  workouts: [],
  addWorkout: (name) =>
    set((s) => ({
      workouts: [
        ...s.workouts,
        {
          id: crypto.randomUUID(),
          name,
          date: new Date().toLocaleDateString(),
          exercises: [],
        },
      ],
    })),
  deleteWorkout: (id) =>
    set((s) => ({ workouts: s.workouts.filter((w) => w.id !== id) })),
  addExercise: (workoutId, ex) =>
    set((s) => ({
      workouts: s.workouts.map((w) =>
        w.id === workoutId
          ? {
              ...w,
              exercises: [...w.exercises, { ...ex, id: crypto.randomUUID() }],
            }
          : w
      ),
    })),
  removeExercise: (workoutId, exId) =>
    set((s) => ({
      workouts: s.workouts.map((w) =>
        w.id === workoutId
          ? { ...w, exercises: w.exercises.filter((e) => e.id !== exId) }
          : w
      ),
    })),
}));
