import { z } from "zod"

const Session = z.object({
    id: z.string(),
    name: z.string(),
    sessionDate: z.string(),
    workoutIds: z.array(z.string()),
})

export type Session = z.infer<typeof Session>
