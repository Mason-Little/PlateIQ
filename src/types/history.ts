export type DateKey = `${number}-${number}-${number}`;

export type Session = {
  id: string,
  date: DateKey,
  sessionOfDay: number // what session of the day this is
  exerciseTrackingIds: string[],
}

export type ExerciseTracking = {
  sessionId: string,
  id: string,
  exerciseSlug: string,
  sets: ExerciseSet[],
}

export type TimestampMs = number;

export type ExerciseSet = {
  weight: number,
  reps: number,
  addedAt: TimestampMs,
}

export type Exercise = {
  slug: string,
  name: string,
  primaryMuscle: string,
  secondaryMuscles: string[],
  unilateral: boolean,
  lengthBias: string,
  regionalEmphasis: string[],
  stabilityRequirement: string,
  repRange: { min: number, max: number },
}