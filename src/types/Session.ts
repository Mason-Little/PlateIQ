import { z } from "zod";

const Session = z.object({
	id: z.string(),
	userId: z.string(),
	name: z.string(),
	sessionDate: z.string(),
	createdAt: z.string(),
});

export type Session = z.infer<typeof Session>;
