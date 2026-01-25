import { getCurrentUserId, getSessions, setSessions } from "@/lib/storage";
import type { Session } from "@/types";

const ensureSession = (session: Session) => session;

export const fetchSessions = async (): Promise<Session[]> => {
	const sessions = getSessions();
	return Object.values(sessions);
};

export const fetchSessionByDate = async (
	sessionDate: string,
): Promise<Session | null> => {
	const sessions = getSessions();
	const match = Object.values(sessions).find(
		(session) => session.sessionDate === sessionDate,
	);
	if (!match) {
		return createSession(sessionDate);
	}
	return match;
};

const createSession = async (sessionDate: string): Promise<Session> => {
	const userId = getCurrentUserId();
	const now = new Date().toISOString();
	const session: Session = ensureSession({
		id: crypto.randomUUID(),
		userId,
		sessionDate,
		name: sessionDate,
		createdAt: now,
	});
	const sessions = getSessions();
	setSessions({
		...sessions,
		[session.id]: session,
	});
	return session;
};

export const updateSession = async (
	sessionId: string,
	updates: Partial<Pick<Session, "name">>,
): Promise<Session> => {
	const sessions = getSessions();
	const existing = sessions[sessionId];
	if (!existing) {
		throw new Error("Session not found");
	}
	const updated: Session = {
		...existing,
		...updates,
	};
	setSessions({
		...sessions,
		[sessionId]: updated,
	});
	return updated;
};

export const deleteSession = async (sessionId: string): Promise<void> => {
	const sessions = getSessions();
	if (!sessions[sessionId]) {
		return;
	}
	const nextSessions = { ...sessions };
	delete nextSessions[sessionId];
	setSessions(nextSessions);
};
