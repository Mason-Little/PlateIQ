import {
	getCurrentUserId,
	getExerciseEntries,
	setExerciseEntries,
} from "@/lib/storage";
import type { ExerciseEntry } from "@/types";

const ensureEntry = (entry: ExerciseEntry) => entry;

export const fetchExerciseEntries = async (): Promise<ExerciseEntry[]> => {
	const entries = getExerciseEntries();
	return Object.values(entries);
};

export const fetchExerciseEntriesForSession = async (
	sessionId: string,
): Promise<ExerciseEntry[]> => {
	const entries = getExerciseEntries();
	return Object.values(entries).filter(
		(entry) => entry.sessionId === sessionId,
	);
};

export const createExerciseEntry = async (
	sessionId: string,
	exerciseSlug: string,
): Promise<ExerciseEntry> => {
	const userId = getCurrentUserId();
	const now = new Date().toISOString();
	const entry: ExerciseEntry = ensureEntry({
		id: crypto.randomUUID(),
		userId,
		sessionId,
		exerciseSlug,
		createdAt: now,
	});
	const entries = getExerciseEntries();
	setExerciseEntries({
		...entries,
		[entry.id]: entry,
	});
	return entry;
};

export const deleteExerciseEntry = async (entryId: string): Promise<void> => {
	const entries = getExerciseEntries();
	if (!entries[entryId]) {
		return;
	}
	const nextEntries = { ...entries };
	delete nextEntries[entryId];
	setExerciseEntries(nextEntries);
};
