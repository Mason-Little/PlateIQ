import { useHistoryStore } from '@/store/historyStore';
import { useState, useEffect } from 'react';
import { dateToKey, nextDay, prevDay } from '@/utils/day';
import { PlateButton } from '@/components/ui/PlateButton';

export function Home() {
  const { ensureSession, getSessionsByDate, listTrackings, createTracking } = useHistoryStore();
  const today = dateToKey(new Date());
  const [currentDate, setCurrentDate] = useState(today);
  const sessions = getSessionsByDate(currentDate);

  useEffect(() => {
    ensureSession(currentDate);
  }, [currentDate, ensureSession]);

  return (
    <main>
      <h1>{currentDate}</h1>
      {sessions.map((session) => (
        <div key={session.sessionOfDay}>{listTrackings(session.id).map((tracking) => (
          <div key={tracking.id}>{tracking.exerciseSlug}</div>
        ))}</div>
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
          onClick={() => createTracking(sessions[0].id, 'smith-incline-bench-press')}
        />
      </div>
    </main>
  );
}
