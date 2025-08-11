// src/lib/services/rater-profile.ts
import { watchProfile, saveProfile, uploadAvatar, type Profile } from "./profile-core";

export type RaterProfile = Profile & { specialty?: string; role?: "rater" };

// Re-exported helpers with rater role
export const watchRaterProfile = (uid: string, cb: (p: RaterProfile | null) => void) =>
  watchProfile(uid, cb as any);

export const saveRaterProfile = (uid: string, data: Partial<RaterProfile>) =>
  saveProfile(uid, { ...data, role: "rater" });

export const uploadRaterAvatar = (uid: string, file: File) =>
  uploadAvatar(uid, file, "raters");
