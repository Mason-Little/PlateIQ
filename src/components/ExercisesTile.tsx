import type { ExerciseTracking } from '@/types';
import { SetPill } from './SetPill';
import { PlateButton } from './ui/PlateButton';
import { useHistoryStore } from '@/store/historyStore';
import { useState } from 'react';
import { PlateModal } from '@/components/ui/PlateModal';
import { AddSetForm } from '@/components/AddSetForm';

interface ExerciseTileProps {
  exerciseTracking: ExerciseTracking;
}

export function ExerciseTile({ exerciseTracking }: ExerciseTileProps) {
  const { addSet } = useHistoryStore();
  const [showAddSet, setShowAddSet] = useState(false);

  return (
    <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
            Exercise
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            {exerciseTracking.exerciseSlug}
          </h2>
        </div>
        <PlateButton
          onClick={() => setShowAddSet(true)}
          text="Add Set"
          variant="primary"
        />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {exerciseTracking.sets.length === 0 ? (
          <p className="text-sm text-[rgb(var(--text-muted))]">
            No sets yet. Add one to get started.
          </p>
        ) : (
          exerciseTracking.sets.map((set, index) => (
            <SetPill key={index} reps={set.reps} weight={set.weight} />
          ))
        )}
      </div>
      <PlateModal isOpen={showAddSet} onClose={() => setShowAddSet(false)}>
        <AddSetForm
          onSubmit={(set) => {
            addSet(exerciseTracking.id, set);
            setShowAddSet(false);
          }}
        />
      </PlateModal>
    </div>
  );
}
