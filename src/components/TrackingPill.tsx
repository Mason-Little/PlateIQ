import { AddTrackingSet } from "@/components/AddTrackingSet";
import type { TrackingSet } from "@/types";
import { Box, Typography } from "@mui/material";
import type React from "react";
import { useState } from "react";

interface TrackingPillProps {
  set: TrackingSet;
}

export const TrackingPill: React.FC<TrackingPillProps> = ({ set }) => {
  const [open, setOpen] = useState(false);

  const updateSet = () => {
    setOpen(true);
  };
  return (
    <>
      <Box
        onClick={updateSet}
        sx={{
          border: "1px solid #e71a1aff",
          padding: "8px",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6">Reps: {set.reps}</Typography>
        <Typography variant="h6">Weight: {set.weight}</Typography>
      </Box>

      <AddTrackingSet
        entryId={set.exerciseEntryId}
        trackingSetId={set.id}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
