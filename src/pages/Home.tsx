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
    <main>
      <h1>{currentDate}</h1>
      {sessions.map((session) => (
        <div key={session.sessionOfDay}>
          {listTrackings(session.id).map((tracking) => (
            <ExerciseTile key={tracking.id} exerciseTracking={tracking} />
          ))}
        </div>
      ))}
      <div className="flex gap-4 mt-6">
        <PlateButton
          text="Previous Day"
          onClick={() => setCurrentDate(prevDay(currentDate))}
        />
        <PlateButton
          text="Next Day"
          onClick={() => setCurrentDate(nextDay(currentDate))}
        />

        <PlateButton
          text="Add Exercise"
          onClick={() => setShowSelectExercises(true)}
        />
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
