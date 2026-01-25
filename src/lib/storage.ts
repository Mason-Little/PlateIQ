import type { ExerciseEntry, Session, TrackingSet, User } from "@/types";

const STORAGE_PREFIX = "plateiq";

const storageKey = (key: string) => `${STORAGE_PREFIX}:${key}`;

const USERS_KEY = storageKey("users");
const SESSIONS_KEY = storageKey("sessions");
const EXERCISE_ENTRIES_KEY = storageKey("exercise_entries");
const TRACKING_SETS_KEY = storageKey("tracking_sets");

const CURRENT_USER_ID = "user_1";

const defaultUser: User = {
	id: CURRENT_USER_ID,
	name: "Guest",
	createdAt: new Date().toISOString(),
};

const readTable = <T>(key: string): Record<string, T> => {
	const stored = localStorage.getItem(key);
	if (!stored) {
		return {};
	}
	try {
		return JSON.parse(stored) as Record<string, T>;
	} catch {
		return {};
	}
};

const writeTable = <T>(key: string, table: Record<string, T>) => {
	localStorage.setItem(key, JSON.stringify(table));
};

export const ensureDefaultUser = (): User => {
	const users = readTable<User>(USERS_KEY);
	if (!users[CURRENT_USER_ID]) {
		const nextUsers = {
			...users,
			[CURRENT_USER_ID]: defaultUser,
		};
		writeTable(USERS_KEY, nextUsers);
		return defaultUser;
	}
	return users[CURRENT_USER_ID];
};

export const getCurrentUserId = () => {
	ensureDefaultUser();
	return CURRENT_USER_ID;
};

export const getUsers = () => readTable<User>(USERS_KEY);
export const setUsers = (users: Record<string, User>) =>
	writeTable(USERS_KEY, users);

export const getSessions = () => readTable<Session>(SESSIONS_KEY);
export const setSessions = (sessions: Record<string, Session>) =>
	writeTable(SESSIONS_KEY, sessions);

export const getExerciseEntries = () =>
	readTable<ExerciseEntry>(EXERCISE_ENTRIES_KEY);
export const setExerciseEntries = (entries: Record<string, ExerciseEntry>) =>
	writeTable(EXERCISE_ENTRIES_KEY, entries);

export const getTrackingSets = () => readTable<TrackingSet>(TRACKING_SETS_KEY);
export const setTrackingSets = (sets: Record<string, TrackingSet>) =>
	writeTable(TRACKING_SETS_KEY, sets);
