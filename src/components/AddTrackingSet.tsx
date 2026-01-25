import { Box, Button, Dialog, Input, Typography } from "@mui/material"
import { useState } from "react"

export const AddTrackingSet = () => {
    
    const [open, setOpen] = useState(false)
    const [reps, setReps] = useState(0)
    const [weight, setWeight] = useState(0)

    
    return (
        <Box>
            <Button variant="contained" onClick={() => setOpen(true)}>Add Set</Button>

            <Dialog open={open}>
                <Typography>Add Set</Typography>
                <Input placeholder="Reps" type="number" value={reps} onChange={(e) => setReps(Number(e.target.value))} />
                <Input placeholder="Weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
                <Button variant="contained" onClick={() => {setOpen(false);}}>Add Set</Button>
                <Button variant="contained" onClick={() => setOpen(false)}>Cancel</Button>
            </Dialog>
        </Box>
    )
}