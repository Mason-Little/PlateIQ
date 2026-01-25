import { z } from "zod"

const ExerciseEntry = z.object({
    id: z.string(),
    userId: z.string(),
    sessionId: z.string(),
    exerciseSlug: z.string(),
    createdAt: z.string(),
})

export type ExerciseEntry = z.infer<typeof ExerciseEntry>
