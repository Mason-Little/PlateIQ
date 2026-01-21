import splits from '@/data/seedWorkoutSplits.json';
import { PlateButton } from './ui/PlateButton';

export function WorkOutSplit({ onSelectSplit }: { onSelectSplit: (split: string) => void }) {
  return (
    <div>
      {splits.map((split) => (
        <PlateButton key={split.slug} variant="primary" text={split.name} onClick={() => onSelectSplit(split.slug)} />
      ))}
    </div>
  );
}