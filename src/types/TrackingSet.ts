import { z } from "zod"

export const TrackingSet = z.object({
    id: z.string(),
    workoutId: z.string(),
    reps: z.number(),
    weight: z.number(),
    time: z.number().optional(),
})

export type TrackingSet = z.infer<typeof TrackingSet>
