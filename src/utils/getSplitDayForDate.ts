import { Splits } from "@/data/Splits";
import type { Split, SplitDay } from "@/types";

export const getSplitDayForDate = (
  date: Date,
  splitId?: string,
): { split: Split; day: SplitDay } | null => {
  if (!splitId) {
    return null;
  }
  const split = Splits.find((entry) => entry.id === splitId);
  if (!split) {
    return null;
  }
  const orderedDays = [...split.days].sort((a, b) => a.order - b.order);
  if (orderedDays.length === 0) {
    return null;
  }
  const dayIndex = date.getDay() % orderedDays.length;
  const day = orderedDays[dayIndex];
  if (!day) {
    return null;
  }
  return { split, day };
};
