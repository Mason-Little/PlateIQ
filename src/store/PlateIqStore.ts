import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExerciseEntry, Session, User } from "@/types";

interface PlateIqStore {
    user: User;
    sessionsById: Record<string, Session>;
    exerciseEntriesById: Record<string, ExerciseEntry>;
    getSessionByDate: (sessionDate: string) => Session | null;
    addSession: (session: Session) => void;
    createExerciseEntryForSession: (sessionId: string, exerciseSlug: string) => string | null;
}

const defaultUser: User = {
    id: "1",
    sessionByDate: {},
};

export const usePlateIqStore = create<PlateIqStore>()(
    persist(
        (set, get) => ({
            user: defaultUser,
            sessionsById: {},
            exerciseEntriesById: {},
            getSessionByDate: (sessionDate: string) => {
                const sessionId = get().user.sessionByDate[sessionDate];
                return sessionId ? get().sessionsById[sessionId] ?? null : null;
            },
            addSession: (session: Session) =>
                set((state) => ({
                    sessionsById: {
                        ...state.sessionsById,
                        [session.id]: session,
                    },
                    user: {
                        ...state.user,
                        sessionByDate: {
                            ...state.user.sessionByDate,
                            [session.sessionDate]: session.id,
                        },
                    },
                })),
            createExerciseEntryForSession: (sessionId: string, exerciseSlug: string) => {
                const entryId = crypto.randomUUID();
                const entry: ExerciseEntry = {
                    id: entryId,
                    exerciseSlug,
                    setIds: [],
                };
                let created = false;
                set((state) => {
                    const session = state.sessionsById[sessionId];
                    if (!session) {
                        return state;
                    }
                    created = true;
                    return {
                        sessionsById: {
                            ...state.sessionsById,
                            [sessionId]: {
                                ...session,
                                exerciseEntryIds: [...session.exerciseEntryIds, entryId],
                            },
                        },
                        exerciseEntriesById: {
                            ...state.exerciseEntriesById,
                            [entryId]: entry,
                        },
                    };
                });
                return created ? entryId : null;
            },
        }),
        {
            name: "plateiq-store",
            partialize: (state) => ({
                user: state.user,
                sessionsById: state.sessionsById,
                exerciseEntriesById: state.exerciseEntriesById,
            }),
        }
    )
);
