export type Exercise = {
  slug: string;
  name: string;
  primaryMuscle: string;
  secondaryMuscles: string[];
  unilateral: boolean;
  lengthBias: string;
  regionalEmphasis: string[];
  stabilityRequirement: string;
  repRange: { min: number; max: number };
};
