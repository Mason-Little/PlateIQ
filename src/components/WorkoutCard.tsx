import type { ExerciseEntry } from "@/types"
import { Typography, Box } from "@mui/material"
import { AddTrackingSet } from "./AddTrackingSet"

interface Props {
    entry: ExerciseEntry
}

export const WorkoutCard: React.FC<Props> = ({
  entry,
}) => {
    return (
        <Box>
            <Typography variant="h3">{entry.exerciseSlug}</Typography>
            <AddTrackingSet />
        </Box>
    )
}
