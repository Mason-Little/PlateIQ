import { ExerciseSet } from '@/types';
import { useState } from 'react';


export function AddSetForm({ onSubmit }: { onSubmit: (set: ExerciseSet) => void }) {
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
    <form onSubmit={handleSubmit}>
      <h1>Add Set Form</h1>
      <input
        name="weight"
        type="number"
        placeholder="Weight"
        value={form.weight}
        onChange={handleChange}
      />
      <input
        name="reps"
        type="number"
        placeholder="Reps"
        value={form.reps}
        onChange={handleChange}
      />

      <button type="submit">Add Set</button>
    </form>
  );
}