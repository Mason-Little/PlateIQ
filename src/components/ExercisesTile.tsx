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
    <div>
      <h1>{exerciseTracking.exerciseSlug}</h1>
      {exerciseTracking.sets.map((set, index) => (
        <SetPill key={index} reps={set.reps} weight={set.weight} />
      ))}
      <PlateButton onClick={() => setShowAddSet(true)} text="Add Set" />
      <PlateModal
        isOpen={showAddSet}
        onClose={() => setShowAddSet(false)}
      >
        <AddSetForm onSubmit={(set) => {
          addSet(exerciseTracking.id, set);
          setShowAddSet(false);
        }} />
      </PlateModal>
    </div>
  );
}
