import { Splits } from "@/data/Splits";
import { useUserData } from "@/hooks/useUsers";
import { getSplitDayForDate } from "@/utils/getSplitDayForDate";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { addDays } from "date-fns";
import { useMemo, useState } from "react";

const DEFAULT_LABEL = "Select split";

type SplitStatusProps = {
  selectedDate: Date;
};

export const SplitStatus = ({ selectedDate }: SplitStatusProps) => {
  const { user, updateUserSplit, isUpdatingSplit } = useUserData();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingSplitId, setPendingSplitId] = useState(
    user?.selectedSplitId ?? "",
  );

  const todaySplitDay = useMemo(
    () => getSplitDayForDate(selectedDate, user?.selectedSplitId),
    [selectedDate, user?.selectedSplitId],
  );

  const tomorrowSplitDay = useMemo(() => {
    const tomorrow = addDays(selectedDate, 1);
    return getSplitDayForDate(tomorrow, user?.selectedSplitId);
  }, [selectedDate, user?.selectedSplitId]);

  const handleOpen = () => {
    setPendingSplitId(user?.selectedSplitId ?? "");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    await updateUserSplit(pendingSplitId || undefined);
    setIsOpen(false);
  };

  const handleSplitChange = (value: string) => {
    setPendingSplitId(value);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          borderRadius: "999px",
          paddingX: "16px",
          paddingY: "6px",
          textTransform: "none",
        }}
        variant="text"
      >
        <Typography sx={{ fontWeight: 600 }} variant="body2">
          {todaySplitDay?.day.name ?? DEFAULT_LABEL}
        </Typography>
      </Button>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle>Split overview</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "8px",
              minWidth: "320px",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                borderRadius: "16px",
                padding: "16px",
              }}
            >
              <Typography color="text.secondary" variant="overline">
                Tomorrow
              </Typography>
              <Typography variant="h5">
                {tomorrowSplitDay?.day.name ?? DEFAULT_LABEL}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {tomorrowSplitDay?.split.name ?? "No split selected"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Typography color="text.secondary" variant="overline">
                Change split
              </Typography>
              <Select
                displayEmpty
                fullWidth
                onChange={(event) => handleSplitChange(event.target.value)}
                value={pendingSplitId}
              >
                <MenuItem value="">
                  <em>{DEFAULT_LABEL}</em>
                </MenuItem>
                {Splits.map((split) => (
                  <MenuItem key={split.id} value={split.id}>
                    {split.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingX: "24px", paddingBottom: "16px" }}>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button
            disabled={isUpdatingSplit}
            onClick={handleSave}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
