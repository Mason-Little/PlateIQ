import { create } from 'zustand';

type WorkoutStore = {
  builderplate: string;
};

export const useWorkoutStore = create<WorkoutStore>(() => ({
  builderplate: '',
}));
 