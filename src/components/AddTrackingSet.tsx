import { Box, Button, Dialog, Input, Typography } from "@mui/material";
import { useState } from "react";
import { useCreateTrackingSet } from "@/hooks/useTrackingSets";

interface AddTrackingSetProps {
  entryId: string;
}

export const AddTrackingSet: React.FC<AddTrackingSetProps> = ({ entryId }) => {
  const [open, setOpen] = useState(false);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const createTrackingSet = useCreateTrackingSet();

  const handleAddSet = () => {
    createTrackingSet.mutate({
      exerciseEntryId: entryId,
      reps,
      weight,
    });
    setReps(0);
    setWeight(0);
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Set
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box>
          <Typography>Add Set</Typography>
          <Input
            placeholder="Reps"
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
          />
          <Input
            placeholder="Weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <Button variant="contained" onClick={handleAddSet}>
            Add Set
          </Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};
