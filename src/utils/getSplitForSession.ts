import { Splits } from "@/data/Splits";
import type { Session } from "@/types";

export const getSplitForSession = (session: Session) => {
  return Splits.find((split) => split.id === session.splitDayId);
};
