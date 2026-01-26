import { z } from "zod";

const SplitDay = z.object({
  id: z.string(),
  name: z.string(),
  order: z.number(),
  focus: z.string(),
  muscleGroups: z.array(z.string()),
});

const Split = z.object({
  id: z.string(),
  name: z.string(),
  days: z.array(SplitDay),
});

export type SplitDay = z.infer<typeof SplitDay>;
export type Split = z.infer<typeof Split>;
