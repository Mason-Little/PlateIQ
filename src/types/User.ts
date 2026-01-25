import { z } from "zod"

const User = z.object({
    id: z.string(),
    sessionByDate: z.record(z.string(), z.string()),
})

export type User = z.infer<typeof User>
