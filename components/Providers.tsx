"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      {children}
    </SessionProvider>
  );
}
