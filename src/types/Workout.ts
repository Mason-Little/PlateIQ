import { z } from "zod"

const Workout = z.object({
    id: z.string(),
    exerciseSlug: z.string(),
    setIds: z.array(z.string()),
})

export type Workout = z.infer<typeof Workout>
