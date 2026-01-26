import { useExercises } from "@/hooks/useExercises";
import { useTrackingSetsForEntry } from "@/hooks/useTrackingSets";
import type { ExerciseEntry } from "@/types";
import { Box, Typography } from "@mui/material";
import { AddTrackingSet } from "./AddTrackingSet";
import { TrackingPill } from "./TrackingPill";

interface Props {
  entry: ExerciseEntry;
}

export const WorkoutCard: React.FC<Props> = ({ entry }) => {
  const { data: sets = [] } = useTrackingSetsForEntry(entry.id);
  const { exercises } = useExercises();
  const exercise = exercises.find((item) => item.slug === entry.exerciseSlug);

  return (
    <Box
      sx={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}
    >
      <Typography variant="h5">
        {exercise?.name ?? entry.exerciseSlug}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {sets.map((set) => (
          <TrackingPill key={set.id} set={set} />
        ))}
        <AddTrackingSet entryId={entry.id} />
      </Box>
    </Box>
  );
};
