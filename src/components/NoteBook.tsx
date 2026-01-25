import { addDays, format, isSameDay, subDays } from "date-fns"
import { useState } from "react"
import { Button, ButtonGroup, Box } from "@mui/material"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSessionDay } from "../hooks/UseSessionState";
import { ExerciseSelector } from "./ExerciseSelector";
import useExerciseState from "@/hooks/useExerciseState";
import { WorkoutCard } from "./WorkoutCard";

export const NoteBook = () => {
    const [selectedDay, setSelectedDay] = useState(new Date())
    const formattedDay = format(selectedDay, "EEE, MMM d")
    const isSelectedDayToday = isSameDay(selectedDay, new Date())
    const [open, setOpen] = useState(false)

    const { getSessionForDay, getWorkoutsForSession } = useSessionDay()

    const { createWorkoutForSession } = useExerciseState()
    
    const session = getSessionForDay(selectedDay)

    const workoutIDs = session ? getWorkoutsForSession(session) : []

    const handleAddWorkout = (exerciseSlug: string) => {
        createWorkoutForSession(session.id, exerciseSlug)
        setOpen(false)
        console.log(open)
    }
    
    return (
        <Box>
            <h1>Notes</h1>
            <p>{formattedDay}</p>
            {isSelectedDayToday ? <p>Today</p> : null}
            <ButtonGroup>
                <Button onClick={() => setSelectedDay(new Date())}>Today</Button>
                <Button onClick={() => setSelectedDay(subDays(selectedDay, 1))}><ArrowLeftIcon /></Button>
                <Button onClick={() => setSelectedDay(addDays(selectedDay, 1))}><ArrowRightIcon /></Button>
            </ButtonGroup>
            {session ? <p>{session.name}</p> : <p>No session found for {formattedDay}</p>}

            {workoutIDs.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}

            <Button onClick={() => {setOpen(true)}}>
                Add Session
            </Button>
            <ExerciseSelector onSelect={handleAddWorkout} open={open} setOpen={setOpen} />
        </Box>
    )
}
