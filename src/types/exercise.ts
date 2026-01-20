export type ExerciseDefinition = {
  id: string;
  name: string;
  primary_muscle: string;
  secondary_muscles: string[];
  length_bias?: string;
  tension_curve?: string;
  joint_action?: string;
  regional_emphasis?: string[];
  stability_requirement?: string;
  stimulus_profile?: string[];
  resistance_type?: string;
}

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type Workout = {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
};
