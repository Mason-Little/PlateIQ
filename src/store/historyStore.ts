import { create } from 'zustand';
import type { Session, DateKey } from '@/types/history';
import { dateToKey } from '@/utils/day';

interface HistoryState {
  sessions: Session[];
  currentSessionId: string | null;
  currentDate: DateKey;

  // Actions
  ensureSession: (date: DateKey) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
  deleteSession: (id: string) => void;
  getSessionsByDate: (date: DateKey) => Session[];
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  sessions: [],
  currentSessionId: null,
  currentDate: dateToKey(new Date()),

  ensureSession: (date) => {
    const state = get();
    const existingSession = state.sessions.find((s) => s.date === date);

    if (existingSession) {
      console.log('Session already exists for date:', date);
      return;
    }

    const newSession: Session = {
      id: crypto.randomUUID(),
      date: date,
      sessionOfDay: 1,
      exerciseTrackingIds: [],
    };

    set((state) => ({
      sessions: [...state.sessions, newSession],
      currentSessionId: newSession.id,
    }));
  },

  updateSession: (id, updates) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),

  deleteSession: (id) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== id),
      currentSessionId:
        state.currentSessionId === id ? null : state.currentSessionId,
    })),

  getSessionsByDate: (date) => {
    return get().sessions.filter((s) => s.date === date);
  },
}));
