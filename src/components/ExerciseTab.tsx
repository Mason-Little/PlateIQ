import type { Exercise } from '@store/types';

type Props = {
  exercise: Exercise;
  onRemove: () => void;
};

export default function ExerciseTab({ exercise, onRemove }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3">
      <div>
        <p className="font-medium">{exercise.name}</p>
        <p className="text-sm text-slate-500">
          {exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} lbs
        </p>
      </div>
      <button
        onClick={onRemove}
        className="text-sm text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
}
