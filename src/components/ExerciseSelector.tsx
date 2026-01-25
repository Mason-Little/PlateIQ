import { useState } from "react";
import { ButtonGroup, Button, Dialog, Box, Typography } from "@mui/material";
import { useExercises } from "@/hooks/useExercises";

interface ExerciseSelectorProps {
  onSelect: (exercise: string) => void;
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({ onSelect }) => {
  const { exercises } = useExercises();
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const filteredExercises = exercises.filter((exercise) =>
    exercise.primaryMuscle.includes(filter)
  );

  const muscleGroups = exercises.reduce((acc, exercise) => {
    if (!acc.includes(exercise.primaryMuscle)) {
      acc.push(exercise.primaryMuscle);
    }
    return acc;
  }, [] as string[]);

  const handleClose = (exercise: string) => {
    onSelect(exercise);
    setOpen(false);
    setFilter("");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Exercise</Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box>
          <Typography variant="h2">Exercise Selector</Typography>
          {filter ? (
            <ButtonGroup>
              {filteredExercises.map((exercise) => (
                <Button onClick={() => handleClose(exercise.slug)} key={exercise.slug}>
                  {exercise.name}
                </Button>
              ))}
            </ButtonGroup>
          ) : (
            <ButtonGroup variant="outlined">
              {muscleGroups.map((muscleGroup) => (
                <Button onClick={() => setFilter(muscleGroup)} key={muscleGroup}>
                  {muscleGroup}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </Box>
      </Dialog>
    </>
  );
};
