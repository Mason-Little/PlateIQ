import { addDays, format, subDays } from "date-fns";
import { useState } from "react";
import { Typography } from "@mui/material";
import { Button, ButtonGroup, Box } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { ExerciseSelector } from "./ExerciseSelector";
import { WorkoutCard } from "./WorkoutCard";
import { useSessionByDate } from "@/hooks/useSessions";
import { useCreateExerciseEntry, useExerciseEntriesForSession } from "@/hooks/useExerciseEntries";

export const NoteBook = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const sessionDate = format(selectedDay, "yyyy-MM-dd");

  const { data: session, isLoading } = useSessionByDate(sessionDate) ;
  const { data: entries = [] } = useExerciseEntriesForSession(session?.id ?? "");
  const createExerciseEntry = useCreateExerciseEntry();

  const handleAddEntry = async (exerciseSlug: string) => {
    if (!session) {
      return;
    }
    await createExerciseEntry.mutateAsync({
      sessionId: session.id,
      exerciseSlug,
    });
  };

  return (
    <Box>
      <Typography variant="h2">PlateIQ</Typography>
      <Typography variant="body1">{format(selectedDay, "EEE, MMM d")}</Typography>
      <ButtonGroup>
        <Button onClick={() => setSelectedDay(subDays(selectedDay, 1))}>
          <ArrowLeftIcon />
        </Button>
        <Button onClick={() => setSelectedDay(new Date())}>Today</Button>
        <Button onClick={() => setSelectedDay(addDays(selectedDay, 1))}>
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>

      {isLoading ? (
        <Typography variant="body1">Loading session...</Typography>
      ) : (
        entries.map((entry) => (
          <WorkoutCard key={entry.id} entry={entry} />
        ))
      )}

      <ExerciseSelector onSelect={handleAddEntry} />
    </Box>
  );
};
