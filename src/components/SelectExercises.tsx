import exercises from '@/data/seedExercises.json';
import type { Exercise } from '@/types';
import { useState } from 'react';

interface SelectExercisesProps {
  onSelectExercise: (exerciseSlug: string) => void;
}

export function SelectExercises({ onSelectExercise }: SelectExercisesProps) {
  const primaryMuscle = new Set(
    exercises.map((exercise: Exercise) => exercise.primaryMuscle)
  );
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const filteredExercises = exercises.filter(
    (exercise: Exercise) => exercise.primaryMuscle === selectedMuscle
  );

  return (
    <div>
      <h1>Select Exercises</h1>

      {selectedMuscle
        ? filteredExercises.map((exercise: Exercise) => (
            <button
              key={exercise.slug}
              onClick={() => onSelectExercise(exercise.slug)}
            >
              {exercise.name}
            </button>
          ))
        : Array.from(primaryMuscle).map((muscle: string) => (
            <button key={muscle} onClick={() => setSelectedMuscle(muscle)}>
              {muscle}
            </button>
          ))}
    </div>
  );
}
