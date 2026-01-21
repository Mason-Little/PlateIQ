import { create } from 'zustand';
import type { Session, DateKey, ExerciseTracking, ExerciseSet } from '@/types';
import { dateToKey } from '@/utils/day';

interface HistoryState {
  // Normalized Data
  sessions: Record<string, Session>;
  trackings: Record<string, ExerciseTracking>;

  currentDate: DateKey;

  // Session Actions
  ensureSession: (date: DateKey) => void;
  createSession: (date: DateKey) => void;
  deleteSession: (sessionId: string) => void;

  // Tracking Actions
  createTracking: (sessionId: string, exerciseSlug: string) => void;
  deleteTracking: (trackingId: string) => void;
  listTrackings: (sessionId: string) => ExerciseTracking[];

  // Set Actions
  addSet: (trackingId: string, set: ExerciseSet) => void;
  removeSet: (trackingId: string, setIndex: number) => void;

  // Getters
  getSessionsByDate: (date: DateKey) => Session[];
}

export const useSessionStore = create<HistoryState>((set, get) => ({
  sessions: {},
  trackings: {},
  currentDate: dateToKey(new Date()),

  ensureSession: (date) => {
    const state = get();
    // Check if session exists for this date
    const existingSession = Object.values(state.sessions).find(
      (s) => s.date === date
    );

    if (existingSession) {
      return;
    }

    const newSession: Session = {
      id: crypto.randomUUID(),
      date,
      sessionOfDay: 1,
      exerciseTrackingIds: [],
    };

    set((state) => ({
      sessions: { ...state.sessions, [newSession.id]: newSession },
    }));
  },

  createSession: (date) => {
    const state = get();
    const sessionsForDate = Object.values(state.sessions).filter(
      (s) => s.date === date
    );
    const sessionOfDay = sessionsForDate.length + 1;
    const newSession: Session = {
      id: crypto.randomUUID(),
      date,
      sessionOfDay,
      exerciseTrackingIds: [],
    };
    set((state) => ({
      sessions: { ...state.sessions, [newSession.id]: newSession },
    }));
  },

  deleteSession: (id) => {
    set((state) => {
      const session = state.sessions[id];
      if (!session) return state;

      const newTrackings = { ...state.trackings };
      // Cascade delete trackings
      session.exerciseTrackingIds.forEach((tId) => {
        delete newTrackings[tId];
      });

      const newSessions = { ...state.sessions };
      delete newSessions[id];

      return {
        sessions: newSessions,
        trackings: newTrackings,
      };
    });
  },

  createTracking: (sessionId, exerciseSlug) => {
    const newTracking: ExerciseTracking = {
      sessionId,
      id: crypto.randomUUID(),
      exerciseSlug,
      sets: [],
    };

    set((state) => {
      const session = state.sessions[sessionId];
      if (!session) return state;

      return {
        trackings: { ...state.trackings, [newTracking.id]: newTracking },
        sessions: {
          ...state.sessions,
          [sessionId]: {
            ...session,
            exerciseTrackingIds: [
              ...session.exerciseTrackingIds,
              newTracking.id,
            ],
          },
        },
      };
    });
  },

  deleteTracking: (trackingId) => {
    set((state) => {
      // Find which session owns this tracking to remove the ID reference
      // This is O(N) unless we store parentId in tracking, but fine for now
      const sessionEntry = Object.entries(state.sessions).find(([_, s]) =>
        s.exerciseTrackingIds.includes(trackingId)
      );

      const newSessions = { ...state.sessions };
      if (sessionEntry) {
        const [sessionId, session] = sessionEntry;
        newSessions[sessionId] = {
          ...session,
          exerciseTrackingIds: session.exerciseTrackingIds.filter(
            (id) => id !== trackingId
          ),
        };
      }

      const newTrackings = { ...state.trackings };
      delete newTrackings[trackingId];

      return {
        sessions: newSessions,
        trackings: newTrackings,
      };
    });
  },

  listTrackings: (sessionId) => {
    const session = get().sessions[sessionId];
    if (!session) return [];
    return session.exerciseTrackingIds.map((id) => get().trackings[id]);
  },

  addSet: (trackingId, newSet) => {
    set((state) => {
      const tracking = state.trackings[trackingId];
      if (!tracking) return state;

      return {
        trackings: {
          ...state.trackings,
          [trackingId]: {
            ...tracking,
            sets: [...tracking.sets, newSet],
          },
        },
      };
    });
  },

  removeSet: (trackingId, setIndex) => {
    set((state) => {
      const tracking = state.trackings[trackingId];
      if (!tracking) return state;

      return {
        trackings: {
          ...state.trackings,
          [trackingId]: {
            ...tracking,
            sets: tracking.sets.filter((_, index) => index !== setIndex),
          },
        },
      };
    });
  },

  getSessionsByDate: (date) => {
    return Object.values(get().sessions).filter((s) => s.date === date);
  },
}));
