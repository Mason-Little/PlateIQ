import { z } from "zod";

const Exercise = z.object({
  slug: z.string(),
  name: z.string(),
  primaryMuscle: z.string(),
  secondaryMuscles: z.array(z.string()),
  unilateral: z.boolean(),
  lengthBias: z.enum(["lengthened", "mid_range", "shortened"]),
  regionalEmphasis: z.array(z.string()),
});

export type Exercise = z.infer<typeof Exercise>;
