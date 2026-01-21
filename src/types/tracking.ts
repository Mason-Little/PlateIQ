export type ExerciseTracking = {
  sessionId: string;
  id: string;
  exerciseSlug: string;
  sets: ExerciseSet[];
};

export type TimestampMs = number;

export type ExerciseSet = {
  weight: number;
  reps: number;
  addedAt: TimestampMs;
};
