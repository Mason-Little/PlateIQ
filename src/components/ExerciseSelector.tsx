import { Exercises } from "@/data/Exercises"
import { useState } from "react"
import { ButtonGroup, Button, Dialog, Box } from "@mui/material"

interface ExerciseSelectorProps {
    onSelect: (exercise: string) => void
    open: boolean
    setOpen: (open: boolean) => void
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({onSelect, open, setOpen}) => {
  const [filter, setFilter] = useState("")
  const filteredExercises = Exercises.filter((exercise) => exercise.primaryMuscle.includes(filter))
  
  const muscleGroups = Exercises.reduce((acc, exercise) => {
    if (!acc.includes(exercise.primaryMuscle)) {
      acc.push(exercise.primaryMuscle)
    }
    return acc
  }, [] as string[])
  
    return (
      <Dialog open={open} onClose={() => {setOpen(false)}}>
        <Box>
            <h2>Exercise Selector</h2>
            {filter ? 
            <ButtonGroup>
              {filteredExercises.map((exercise) => (
                <Button onClick={() => {onSelect(exercise.slug); setOpen(false)}} key={exercise.slug}>{exercise.name}</Button>
              ))}
            </ButtonGroup> 
            :
            <ButtonGroup variant="outlined">
                {muscleGroups.map((muscleGroup) => (
                    <Button onClick={() => setFilter(muscleGroup)} key={muscleGroup}>{muscleGroup}</Button>
                ))}
            </ButtonGroup>
            }
        </Box>
      </Dialog>
    )
}