export type DateKey = `${number}-${number}-${number}`;

export type Session = {
  id: string;
  date: DateKey;
  sessionOfDay: number; // what session of the day this is
  exerciseTrackingIds: string[];
};
