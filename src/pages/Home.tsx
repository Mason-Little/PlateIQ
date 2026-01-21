import { useHistoryStore } from '@/store/historyStore';
import { useState, useEffect } from 'react';
import { dateToKey, nextDay, prevDay } from '@/utils/day';
import { PlateButton } from '@/components/ui/PlateButton';
import { SelectExercises } from '@/components/SelectExercises';
import { ExerciseTile } from '@/components/ExercisesTile';

export function Home() {
  const { ensureSession, getSessionsByDate, listTrackings, createTracking } =
    useHistoryStore();

  const [showSelectExercises, setShowSelectExercises] = useState(false);

  const [currentDate, setCurrentDate] = useState(dateToKey(new Date()));
  const sessions = getSessionsByDate(currentDate);

  useEffect(() => {
    ensureSession(currentDate);
  }, [currentDate, ensureSession]);

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="rounded-3xl bg-[rgb(var(--surface))] px-6 py-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-[rgb(var(--text-muted))]">
            Training Log
          </p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
            {currentDate}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[rgb(var(--text-muted))]">
            Keep a clean record of today&apos;s lifting sessions and build
            momentum over time.
          </p>
        </header>

        <section className="flex flex-wrap gap-3">
          <PlateButton
            text="Previous Day"
            variant="ghost"
            onClick={() => setCurrentDate(prevDay(currentDate))}
          />
          <PlateButton
            text="Next Day"
            variant="ghost"
            onClick={() => setCurrentDate(nextDay(currentDate))}
          />
          <PlateButton
            text="Add Exercise"
            variant="primary"
            onClick={() => setShowSelectExercises(true)}
          />
        </section>

        <section className="grid gap-6">
          {sessions.map((session) => (
            <div key={session.sessionOfDay} className="grid gap-4">
              {listTrackings(session.id).length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--surface-muted))] px-6 py-10 text-sm text-[rgb(var(--text-muted))]">
                  No exercises yet. Add your first movement to start tracking.
                </div>
              ) : (
                listTrackings(session.id).map((tracking) => (
                  <ExerciseTile key={tracking.id} exerciseTracking={tracking} />
                ))
              )}
            </div>
          ))}
        </section>
      </div>

      {showSelectExercises && (
        <SelectExercises
          onSelectExercise={(exerciseSlug) => {
            createTracking(sessions[0].id, exerciseSlug);
            setShowSelectExercises(false);
          }}
        />
      )}
    </main>
  );
}
