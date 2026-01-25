import { z } from "zod"

const ExerciseEntry = z.object({
    id: z.string(),
    exerciseSlug: z.string(),
    setIds: z.array(z.string()),
})

export type ExerciseEntry = z.infer<typeof ExerciseEntry>
