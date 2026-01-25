import type { Workout } from "@/types"
import { Typography, Box } from "@mui/material"

interface Props {
    workout: Workout
}

export const WorkoutCard: React.FC<Props> = ({
  workout,
}) => {
    return (
        <Box>
            <Typography variant="h3">{workout.exerciseSlug}</Typography>
        </Box>
    )
}