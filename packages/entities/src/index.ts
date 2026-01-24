import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive(),
});

export type User = z.infer<typeof userSchema>;
