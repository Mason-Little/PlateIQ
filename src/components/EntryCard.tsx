import { useExerciseData } from "@/hooks/useExercises";
import { useTrackingSetData } from "@/hooks/useTrackingSets";
import type { ExerciseEntry } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { AddTrackingSet } from "./AddTrackingSet";
import { TrackingPill } from "./TrackingPill";

interface Props {
  entry: ExerciseEntry;
}

export const WorkoutCard: React.FC<Props> = ({ entry }) => {
  const [open, setOpen] = useState(false);

  const { sets = [] } = useTrackingSetData(entry.id);
  const { exercises } = useExerciseData();
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
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Set
        </Button>
      </Box>
      <AddTrackingSet entryId={entry.id} open={open} setOpen={setOpen} />
    </Box>
  );
};
