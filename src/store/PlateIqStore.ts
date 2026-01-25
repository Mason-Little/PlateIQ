import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, TrackingSet, User, Workout } from "@/types";

interface PlateIqStore {
    user: User;
    sessionsById: Record<string, Session>;
    workoutsById: Record<string, Workout>;
    setsById: Record<string, TrackingSet>;
    getSessionByDate: (sessionDate: string) => Session | null;
    addSession: (session: Session) => void;
    addWorkoutToSession: (sessionId: string, workout: Workout) => void;
    createWorkoutForSession: (sessionId: string, exerciseId: string) => string | null;
    removeWorkoutFromSession: (sessionId: string, workoutId: string) => void;
    addSetToWorkout: (workoutId: string, set: TrackingSet) => void;
    removeSetFromWorkout: (workoutId: string, setId: string) => void;
    deleteWorkout: (workoutId: string) => void;
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
            workoutsById: {},
            setsById: {},
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
            addWorkoutToSession: (sessionId: string, workout: Workout) =>
                set((state) => {
                    const session = state.sessionsById[sessionId];
                    if (!session) {
                        return state;
                    }
                    return {
                        sessionsById: {
                            ...state.sessionsById,
                            [sessionId]: {
                                ...session,
                                workoutIds: [...session.workoutIds, workout.id],
                            },
                        },
                        workoutsById: {
                            ...state.workoutsById,
                            [workout.id]: workout,
                        },
                    };
                }),
            createWorkoutForSession: (sessionId: string, exerciseSlug: string) => {
                const workoutId = crypto.randomUUID();
                const workout: Workout = {
                    id: workoutId,
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
                                workoutIds: [...session.workoutIds, workoutId],
                            },
                        },
                        workoutsById: {
                            ...state.workoutsById,
                            [workoutId]: workout,
                        },
                    };
                });
                return created ? workoutId : null;
            },
            removeWorkoutFromSession: (sessionId: string, workoutId: string) =>
                set((state) => {
                    const session = state.sessionsById[sessionId];
                    if (!session) {
                        return state;
                    }
                    return {
                        sessionsById: {
                            ...state.sessionsById,
                            [sessionId]: {
                                ...session,
                                workoutIds: session.workoutIds.filter((id) => id !== workoutId),
                            },
                        },
                    };
                }),
            addSetToWorkout: (workoutId: string, setToAdd: TrackingSet) =>
                set((state) => {
                    const workout = state.workoutsById[workoutId];
                    if (!workout) {
                        return state;
                    }
                    return {
                        workoutsById: {
                            ...state.workoutsById,
                            [workoutId]: {
                                ...workout,
                                setIds: [...workout.setIds, setToAdd.id],
                            },
                        },
                        setsById: {
                            ...state.setsById,
                            [setToAdd.id]: setToAdd,
                        },
                    };
                }),
            removeSetFromWorkout: (workoutId: string, setId: string) =>
                set((state) => {
                    const workout = state.workoutsById[workoutId];
                    if (!workout) {
                        return state;
                    }
                    const { [setId]: _removed, ...remainingSets } = state.setsById;
                    return {
                        workoutsById: {
                            ...state.workoutsById,
                            [workoutId]: {
                                ...workout,
                                setIds: workout.setIds.filter((id) => id !== setId),
                            },
                        },
                        setsById: remainingSets,
                    };
                }),
            deleteWorkout: (workoutId: string) =>
                set((state) => {
                    const { [workoutId]: workout, ...remainingWorkouts } = state.workoutsById;
                    if (!workout) {
                        return state;
                    }
                    const remainingSets = { ...state.setsById };
                    workout.setIds.forEach((setId) => {
                        delete remainingSets[setId];
                    });
                    return {
                        workoutsById: remainingWorkouts,
                        setsById: remainingSets,
                    };
                }),
        }),
        {
            name: "plateiq-store",
            partialize: (state) => ({
                user: state.user,
                sessionsById: state.sessionsById,
                workoutsById: state.workoutsById,
                setsById: state.setsById,
            }),
        }
    )
);
