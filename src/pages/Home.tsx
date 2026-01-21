import { useHistoryStore } from '@/store/historyStore';
import { useState, useEffect } from 'react';
import { dateToKey, nextDay, prevDay } from '@/utils/day';
import { PlateButton } from '@/components/ui/PlateButton';

export function Home() {
  const { ensureSession, sessions } = useHistoryStore();
  const today = dateToKey(new Date());
  const [currentDate, setCurrentDate] = useState(today);

  useEffect(() => {
    ensureSession(currentDate);
  }, [currentDate, ensureSession]);

  const sessionsForCurrentDay = sessions.filter(
    (session) => session.date === currentDate
  );

  return (
    <main>
      <h1>{currentDate}</h1>
      {sessionsForCurrentDay.map((session) => (
        <div key={session.id}>
          <p>{session.date}</p>
          <p>{session.sessionOfDay}</p>
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
      </div>
    </main>
  );
}
