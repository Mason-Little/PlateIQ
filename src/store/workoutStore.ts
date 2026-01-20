import { create } from 'zustand';
import type { Workout } from '@/types/exercise';

type WorkoutState = {
  workouts: Workout[];
};

export const useWorkoutStore = create<WorkoutState>(() => ({
  workouts: [],
}));
