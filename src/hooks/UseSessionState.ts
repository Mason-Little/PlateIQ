import { format } from "date-fns";
import { usePlateIqStore } from "@/store/PlateIqStore";
import type { Session } from "@/types";

export const useSessionDay = () => {
  const getSessionForDay = (day: Date) => {
    const sessionDate = format(day, "yyyy-MM-dd");
    const session = usePlateIqStore.getState().getSessionByDate(sessionDate);
    if (session) {
      return session;
    }
    return createSession(sessionDate, day);
  };

  const createSession = (sessionDate: string, day: Date) => {
    const session: Session = {
      id: crypto.randomUUID(),
      name: format(day, "yyyy-MM-dd"),
      sessionDate,
      exerciseEntryIds: [],
    };
    usePlateIqStore.getState().addSession(session);
    return session;
  };
  return {
    getSessionForDay,
  };
};
