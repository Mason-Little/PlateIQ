import { PlateButton } from "@/components/ui/PlateButton";

export function SetPill({reps, weight}: {reps: number, weight: number}) {
  return (
    <div>
      <PlateButton text={`${reps} reps x ${weight} lbs`} />
    </div>
  );
}