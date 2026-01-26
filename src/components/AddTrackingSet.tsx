import { useTrackingSetData } from "@/hooks/useTrackingSets";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface AddTrackingSetProps {
  entryId: string;
  trackingSetId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddTrackingSet: React.FC<AddTrackingSetProps> = ({
  entryId,
  trackingSetId,
  open,
  setOpen,
}) => {
  const { createSet, updateSet, getTrackingSet, deleteSet } =
    useTrackingSetData(entryId);
  const set = trackingSetId ? getTrackingSet(trackingSetId) : null;

  const [reps, setReps] = useState<number | null>(set?.reps ?? null);
  const [weight, setWeight] = useState<number | null>(set?.weight ?? null);

  useEffect(() => {
    if (open) {
      setReps(set?.reps ?? null);
      setWeight(set?.weight ?? null);
    }
  }, [open, set?.reps, set?.weight]);

  const handleAddSet = () => {
    if (reps === null || weight === null) {
      return;
    }

    if (trackingSetId) {
      updateSet({
        setId: trackingSetId,
        exerciseEntryId: entryId,
        updates: {
          reps,
          weight,
        },
      });
    } else {
      createSet({
        exerciseEntryId: entryId,
        reps,
        weight,
      });
    }
    setReps(null);
    setWeight(null);
    setOpen(false);
  };

  const onClose = () => {
    if (trackingSetId) {
      setReps(set?.reps ?? null);
      setWeight(set?.weight ?? null);
    } else {
      setReps(null);
      setWeight(null);
    }
    setOpen(false);
  };

  const handleDeleteSet = () => {
    if (!trackingSetId) {
      return;
    }
    deleteSet({
      setId: trackingSetId,
      exerciseEntryId: entryId,
    });
    setOpen(false);
  };

  return (
    <Box>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{trackingSetId ? "Update Set" : "Add Set"}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 320,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: 2,
            }}
          >
            <TextField
              autoFocus
              fullWidth
              label="Reps"
              type="number"
              value={reps ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const nextValue = e.target.value;
                setReps(nextValue === "" ? null : Number(nextValue));
              }}
            />
            <TextField
              fullWidth
              label="Weight"
              type="number"
              value={weight ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const nextValue = e.target.value;
                setWeight(nextValue === "" ? null : Number(nextValue));
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddSet}>
            Add Set
          </Button>
          {trackingSetId && (
            <Button variant="contained" onClick={handleDeleteSet}>
              Delete Set
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};
