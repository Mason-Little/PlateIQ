import { useState } from 'react';
import { useWorkoutStore } from '@store/workoutStore';
import ExerciseTab from '@components/ExerciseTab';

export default function Home() {
  const { workouts, addWorkout, deleteWorkout, addExercise, removeExercise } =
    useWorkoutStore();
  const [workoutName, setWorkoutName] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', sets: 3, reps: 10, weight: 0 });

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (workoutName.trim()) {
      addWorkout(workoutName.trim());
      setWorkoutName('');
    }
  };
  const handleAddExercise = (id: string) => {
    if (form.name.trim()) {
      addExercise(id, form);
      setForm({ name: '', sets: 3, reps: 10, weight: 0 });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-semibold">React Gym</h1>
        <form onSubmit={handleAddWorkout} className="mt-6 flex gap-2">
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="New workout..."
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Add
          </button>
        </form>
        <div className="mt-6 space-y-3">
          {workouts.length === 0 && (
            <p className="text-center text-slate-400">No workouts yet</p>
          )}
          {workouts.map((w) => (
            <div
              key={w.id}
              className="rounded-xl border border-slate-200 bg-white"
            >
              <div
                className="flex cursor-pointer items-center justify-between p-4"
                onClick={() => setExpandedId(expandedId === w.id ? null : w.id)}
              >
                <div>
                  <h2 className="font-semibold">{w.name}</h2>
                  <p className="text-sm text-slate-500">
                    {w.date} - {w.exercises.length} exercises
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteWorkout(w.id);
                  }}
                  className="text-sm text-red-500"
                >
                  Delete
                </button>
              </div>
              {expandedId === w.id && (
                <div className="border-t border-slate-200 p-4 space-y-2">
                  {w.exercises.map((ex) => (
                    <ExerciseTab
                      key={ex.id}
                      exercise={ex}
                      onRemove={() => removeExercise(w.id, ex.id)}
                    />
                  ))}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Exercise"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="flex-1 rounded border px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      value={form.sets}
                      onChange={(e) =>
                        setForm({ ...form, sets: +e.target.value })
                      }
                      className="w-12 rounded border px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      value={form.reps}
                      onChange={(e) =>
                        setForm({ ...form, reps: +e.target.value })
                      }
                      className="w-12 rounded border px-2 py-1 text-sm"
                    />
                    <input
                      type="number"
                      value={form.weight}
                      onChange={(e) =>
                        setForm({ ...form, weight: +e.target.value })
                      }
                      className="w-14 rounded border px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => handleAddExercise(w.id)}
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
