import {
  ensureDefaultUser,
  getCurrentUserId,
  getUsers,
  setUsers,
} from "@/lib/storage";
import type { User } from "@/types";

export const fetchUser = async (): Promise<User> => {
  const currentUserId = getCurrentUserId();
  const users = getUsers();
  return users[currentUserId] ?? ensureDefaultUser();
};

export const updateUserSplit = async (
  selectedSplitId?: string,
): Promise<User> => {
  const currentUserId = getCurrentUserId();
  const users = getUsers();
  const existing = users[currentUserId] ?? ensureDefaultUser();
  const updated: User = {
    ...existing,
    selectedSplitId,
  };
  setUsers({
    ...users,
    [currentUserId]: updated,
  });
  return updated;
};
