// src/lib/services/user-profile.ts
import { watchProfile, saveProfile, uploadAvatar, type Profile } from "./profile-core";

export type UserProfile = Profile & { role?: "user" };

// Re-exported helpers with user role
export const watchUserProfile = (uid: string, cb: (p: UserProfile | null) => void) =>
  watchProfile(uid, cb as any);

export const saveUserProfile = (uid: string, data: Partial<UserProfile>) =>
  saveProfile(uid, { ...data, role: "user" });

export const uploadUserAvatar = (uid: string, file: File) =>
  uploadAvatar(uid, file, "users");
