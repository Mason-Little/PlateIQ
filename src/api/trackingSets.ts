import {
	getCurrentUserId,
	getTrackingSets,
	setTrackingSets,
} from "@/lib/storage";
import type { TrackingSet } from "@/types";

const ensureSet = (set: TrackingSet) => set;

export const fetchTrackingSetsForEntry = async (
	exerciseEntryId: string,
): Promise<TrackingSet[]> => {
	const sets = getTrackingSets();
	return Object.values(sets).filter(
		(set) => set.exerciseEntryId === exerciseEntryId,
	);
};

export const createTrackingSet = async (
	exerciseEntryId: string,
	reps: number,
	weight: number,
	time?: number,
): Promise<TrackingSet> => {
	const userId = getCurrentUserId();
	const now = new Date().toISOString();
	const trackingSet: TrackingSet = ensureSet({
		id: crypto.randomUUID(),
		userId,
		exerciseEntryId,
		reps,
		weight,
		time,
		createdAt: now,
	});
	const sets = getTrackingSets();
	setTrackingSets({
		...sets,
		[trackingSet.id]: trackingSet,
	});
	return trackingSet;
};

export const updateTrackingSet = async (
	setId: string,
	updates: Partial<Pick<TrackingSet, "reps" | "weight" | "time">>,
): Promise<TrackingSet> => {
	const sets = getTrackingSets();
	const existing = sets[setId];
	if (!existing) {
		throw new Error("Tracking set not found");
	}
	const updated: TrackingSet = {
		...existing,
		...updates,
	};
	setTrackingSets({
		...sets,
		[setId]: updated,
	});
	return updated;
};

export const deleteTrackingSet = async (setId: string): Promise<void> => {
	const sets = getTrackingSets();
	if (!sets[setId]) {
		return;
	}
	const nextSets = { ...sets };
	delete nextSets[setId];
	setTrackingSets(nextSets);
};
