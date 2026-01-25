import type { ExerciseEntry } from "@/types";
import { Typography, Box } from "@mui/material";
import { AddTrackingSet } from "./AddTrackingSet";
import { useTrackingSetsForEntry } from "@/hooks/useTrackingSets";
import { useExercises } from "@/hooks/useExercises";

interface Props {
  entry: ExerciseEntry;
}

export const WorkoutCard: React.FC<Props> = ({ entry }) => {
  const { data: sets = [] } = useTrackingSetsForEntry(entry.id);
  const { exercises } = useExercises();
  const exercise = exercises.find((item) => item.slug === entry.exerciseSlug);

  return (
    <Box>
      <Typography variant="h3">{exercise?.name ?? entry.exerciseSlug}</Typography>
      {sets.map((set, index) => (
        <Typography key={set.id} variant="body2">
          Set {index + 1}: {set.reps} reps @ {set.weight}
        </Typography>
      ))}
      <AddTrackingSet entryId={entry.id} />
    </Box>
  );
};
