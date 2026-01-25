import { Exercises } from "@/data/Exercises"
import { useState } from "react"
import { ButtonGroup, Button, Dialog, Box, Typography } from "@mui/material"

interface ExerciseSelectorProps {
    onSelect: (exercise: string) => void
}

export const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({onSelect}) => {
  const [filter, setFilter] = useState("")
  const [open, setOpen] = useState(false)
  const filteredExercises = Exercises.filter((exercise) => exercise.primaryMuscle.includes(filter))
  
  const muscleGroups = Exercises.reduce((acc, exercise) => {
    if (!acc.includes(exercise.primaryMuscle)) {
      acc.push(exercise.primaryMuscle)
    }
    return acc
  }, [] as string[])

  const handleClose = (exercise: string) => {
    onSelect(exercise)
    setOpen(false)
  }
  
    return (
      <>
      <Button onClick={() => {setOpen(true)}}>Add Exercise</Button>
      
      <Dialog open={open} onClose={() => {setOpen(false)}}>
        <Box>
            <Typography variant="h2">Exercise Selector</Typography>
            {filter ? 
            <ButtonGroup>
              {filteredExercises.map((exercise) => (
                <Button onClick={() => {handleClose(exercise.slug)}} key={exercise.slug}>{exercise.name}</Button>
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
      </>
    )
}