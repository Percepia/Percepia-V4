// src/lib/services/user-profile.ts
import { watchProfile, saveProfile, uploadAvatar, type Profile } from "./profile-core";

export type UserProfile = Profile & { role?: "user" };

export const watchUserProfile = watchProfile;
export const saveUserProfile = (uid: string, data: Partial<UserProfile>) =>
  saveProfile(uid, { ...data, role: "user" });

export const uploadUserAvatar = (uid: string, file: File) =>
  uploadAvatar(uid, file, "users");
