import { useExerciseEntryData } from "@/hooks/useExerciseEntries";
import { useSessionData } from "@/hooks/useSessions";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Typography } from "@mui/material";
import { Box, Button, ButtonGroup } from "@mui/material";
import { addDays, format, subDays } from "date-fns";
import { useState } from "react";
import { ExerciseSelector } from "./ExerciseSelector";
import { WorkoutCard } from "./WorkoutCard";

export const NoteBook = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const sessionDate = format(selectedDay, "yyyy-MM-dd");

  const { sessionByDate } = useSessionData(sessionDate);
  const { entries = [], createEntryAsync } = useExerciseEntryData(
    sessionByDate?.id ?? "",
  );

  const handleAddEntry = async (exerciseSlug: string) => {
    if (!sessionByDate) {
      return;
    }
    await createEntryAsync({
      sessionId: sessionByDate.id,
      exerciseSlug,
    });
  };

  return (
    <Box>
      <Typography variant="h2">PlateIQ</Typography>
      <Typography variant="body1">
        {format(selectedDay, "EEE, MMM d")}
      </Typography>
      <ButtonGroup
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}
      >
        <Button onClick={() => setSelectedDay(subDays(selectedDay, 1))}>
          <ArrowLeftIcon />
        </Button>
        <Button onClick={() => setSelectedDay(new Date())}>Today</Button>
        <Button onClick={() => setSelectedDay(addDays(selectedDay, 1))}>
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        {entries.map((entry) => (
          <WorkoutCard key={entry.id} entry={entry} />
        ))}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}
      >
        <ExerciseSelector onSelect={handleAddEntry} />
      </Box>
    </Box>
  );
};
