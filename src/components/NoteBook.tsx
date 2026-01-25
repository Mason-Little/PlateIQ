import { addDays, format, isSameDay, subDays } from "date-fns"
import { useState } from "react"
import { Button } from "@mui/material"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useSessionDay } from "../hooks/UseSessionDay";

export const NoteBook = () => {
    const [selectedDay, setSelectedDay] = useState(new Date())
    const formattedDay = format(selectedDay, "EEE, MMM d")
    const isSelectedDayToday = isSameDay(selectedDay, new Date())

    const { getSessionForDay } = useSessionDay()
    
    const session = getSessionForDay(selectedDay)
    return (
        <div>
            <h1>Notes</h1>
            <p>{formattedDay}</p>
            {isSelectedDayToday ? <p>Today</p> : null}
            <div>
                <Button onClick={() => setSelectedDay(new Date())}>Today</Button>
                <Button onClick={() => setSelectedDay(subDays(selectedDay, 1))}><ArrowLeftIcon /></Button>
                <Button onClick={() => setSelectedDay(addDays(selectedDay, 1))}><ArrowRightIcon /></Button>
            </div>
            {session ? <p>{session.name}</p> : <p>No session found for {formattedDay}</p>}
        </div>
    )
}
