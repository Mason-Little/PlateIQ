
export type history = {
  sessions: Session[],
}

export type DateKey = `${number}-${number}-${number}`;

export type Session = {
  id: string,
  date: DateKey,
  sessionOfDay: number // what session of the day this is
  exerciseTrackingIds: string[],
}

export type ExerciseTracking = {
  id: string,
  exerciseId: string,
  sets: Set[],
}

export type TimestampMs = number;

export type Set = {
  weight: number,
  reps: number,
  rpe: number,
  addedAt: TimestampMs,
}

export type Exercise = {
  id: string,
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