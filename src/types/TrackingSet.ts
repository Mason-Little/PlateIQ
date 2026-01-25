import { z } from "zod"

export const TrackingSet = z.object({
    id: z.string(),
    userId: z.string(),
    exerciseEntryId: z.string(),
    reps: z.number(),
    weight: z.number(),
    time: z.number().optional(),
    createdAt: z.string(),
})

export type TrackingSet = z.infer<typeof TrackingSet>
