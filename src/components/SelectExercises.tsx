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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="w-full max-w-3xl rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
              Library
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Select Exercises</h1>
          </div>
          <button
            className="text-sm text-[rgb(var(--text-muted))] transition hover:text-[rgb(var(--accent))]"
            onClick={() => setSelectedMuscle(null)}
            type="button"
          >
            Reset
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {selectedMuscle ? (
            <div className="grid gap-3">
              <p className="text-sm text-[rgb(var(--text-muted))]">
                {selectedMuscle} exercises
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {filteredExercises.map((exercise: Exercise) => (
                  <button
                    key={exercise.slug}
                    onClick={() => onSelectExercise(exercise.slug)}
                    className="flex items-center justify-between rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-4 py-3 text-left text-sm font-medium transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
                  >
                    {exercise.name}
                    <span className="text-xs text-[rgb(var(--text-muted))]">
                      {exercise.primaryMuscle}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from(primaryMuscle).map((muscle: string) => (
                <button
                  key={muscle}
                  onClick={() => setSelectedMuscle(muscle)}
                  className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-4 py-3 text-sm font-medium text-[rgb(var(--text))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
                >
                  {muscle}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
