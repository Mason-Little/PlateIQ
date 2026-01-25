import { addDays, format, subDays } from "date-fns"
import { useState } from "react"
import { Typography } from "@mui/material"
import { Button, ButtonGroup, Box } from "@mui/material"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSessionDay } from "../hooks/UseSessionState";
import { ExerciseSelector } from "./ExerciseSelector";
import useExerciseState from "@/hooks/useExerciseState";
import { WorkoutCard } from "./WorkoutCard";

export const NoteBook = () => {
    const { getSessionForDay } = useSessionDay()
    const { createExerciseEntryForSession, getExerciseEntriesForSession } = useExerciseState()

    const [selectedDay, setSelectedDay] = useState(new Date())
    const [open, setOpen] = useState(false)
    
    const session = getSessionForDay(selectedDay)
    const entries = session ? getExerciseEntriesForSession(session.id) : []

    const handleAddEntry = (exerciseSlug: string) => {
        createExerciseEntryForSession(session.id, exerciseSlug)
        setOpen(false)
    }
    
    return (
        <Box>
            <Typography variant="h2">PlateIQ</Typography>
            <Typography variant="body1">{format(selectedDay, "EEE, MMM d")}</Typography>
            <ButtonGroup>
                <Button onClick={() => setSelectedDay(subDays(selectedDay, 1))}><ArrowLeftIcon /></Button>
                <Button onClick={() => setSelectedDay(new Date())}>Today</Button>
                <Button onClick={() => setSelectedDay(addDays(selectedDay, 1))}><ArrowRightIcon /></Button>
            </ButtonGroup>

            {entries.map((entry) => (
                <WorkoutCard key={entry.id} entry={entry} />
            ))}

            <Button onClick={() => {setOpen(true)}}>
                Add Session
            </Button>

            <ExerciseSelector onSelect={handleAddEntry} open={open} setOpen={setOpen} />
        </Box>
    )
}
