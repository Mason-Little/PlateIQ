import { DateKey } from "@/types/history";

export const dateToKey = (date: Date): DateKey => {
  return date.toISOString().split('T')[0] as DateKey;
};

export const nextDay = (date: DateKey): DateKey => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + 1);
  return dateToKey(dateObj);
};

export const prevDay = (date: DateKey): DateKey => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() - 1);
  return dateToKey(dateObj);
};