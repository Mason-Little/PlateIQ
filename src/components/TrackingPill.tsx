import { Box, Typography } from "@mui/material";
import type React from "react";
import type { TrackingSet } from "@/types";

interface TrackingPillProps {
  set: TrackingSet;
}

export const TrackingPill: React.FC<TrackingPillProps> = ({ set }) => {
  return (
    <Box sx={{ border: "1px solid #e71a1aff", padding: "8px", borderRadius: "10px" }}>
      <Typography variant="h6">Reps: {set.reps}</Typography>
      <Typography variant="h6">Weight: {set.weight}</Typography>
    </Box>
  );
};
