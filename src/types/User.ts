import { z } from "zod";

const User = z.object({
  id: z.string(),
  name: z.string(),
  selectedSplitId: z.string().optional(),
  createdAt: z.string(),
});

export type User = z.infer<typeof User>;
