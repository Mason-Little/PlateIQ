export function SetPill({ reps, weight }: { reps: number; weight: number }) {
  return (
    <div className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-4 py-2 text-sm font-medium text-[rgb(var(--text))]">
      {reps} reps x {weight} lbs
    </div>
  );
}
