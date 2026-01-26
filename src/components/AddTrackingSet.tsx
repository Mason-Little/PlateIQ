import { useCreateTrackingSet } from "@/hooks/useTrackingSets";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface AddTrackingSetProps {
  entryId: string;
}

export const AddTrackingSet: React.FC<AddTrackingSetProps> = ({ entryId }) => {
  const [open, setOpen] = useState(false);
  const [reps, setReps] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const createTrackingSet = useCreateTrackingSet();

  const handleAddSet = () => {
    if (reps === null || weight === null) {
      return;
    }

    createTrackingSet.mutate({
      exerciseEntryId: entryId,
      reps,
      weight,
    });
    setReps(null);
    setWeight(null);
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
    setReps(null);
    setWeight(null);
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Set
      </Button>

      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Set</DialogTitle>
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
        </DialogActions>
      </Dialog>
    </Box>
  );
};
