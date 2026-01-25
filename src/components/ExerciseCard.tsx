import type { Exercise } from "@/types"

interface Props {
    exercise: Exercise
}

export const ExerciseCard: React.FC<Props> = ({
  exercise,
}) => {
    return (
        <div>
            <h1>Exercise Card</h1>  
            <p>{exercise.name}</p>
        </div>
    )
}