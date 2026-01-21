import { ExerciseSet } from '@/types';
import { useState } from 'react';

export function AddSetForm({
  onSubmit,
}: {
  onSubmit: (set: ExerciseSet) => void;
}) {
  const [form, setForm] = useState({ weight: '', reps: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      weight: Number(form.weight) || 0,
      reps: Number(form.reps) || 0,
      addedAt: Date.now(),
    });
    setForm({ weight: '', reps: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <h1 className="text-xl font-semibold">Add Set</h1>
        <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">
          Log weight and reps for this exercise.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[rgb(var(--text))]">
          Weight
          <input
            name="weight"
            type="number"
            placeholder="135"
            value={form.weight}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-4 py-2 text-sm text-[rgb(var(--text))] outline-none transition focus:border-[rgb(var(--accent))]"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[rgb(var(--text))]">
          Reps
          <input
            name="reps"
            type="number"
            placeholder="8"
            value={form.reps}
            onChange={handleChange}
            className="w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-4 py-2 text-sm text-[rgb(var(--text))] outline-none transition focus:border-[rgb(var(--accent))]"
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-2xl bg-[rgb(var(--accent))] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[rgb(var(--accent-strong))]"
      >
        Add Set
      </button>
    </form>
  );
}
