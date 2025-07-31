// src/components/AuthProvider.tsx
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

// 1) Define the context type and default values
export const AuthContext = createContext<{
  user: User | null;
  initialized: boolean;
}>({
  user: null,
  initialized: false,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  // 2) Track both the Firebase user and whether we've finished initializing
  const [user, setUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitialized(true);
    });
    return unsubscribe;
  }, []);

  // 3) Provide both values via context
  return (
    <AuthContext.Provider value={{ user, initialized }}>
      {children}
    </AuthContext.Provider>
  );
}

