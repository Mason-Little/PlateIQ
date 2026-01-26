import { z } from "zod";

const Session = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  sessionDate: z.string(),
  splitDayId: z.string().optional(),
  createdAt: z.string(),
});

export type Session = z.infer<typeof Session>;
