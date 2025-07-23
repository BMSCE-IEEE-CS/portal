"use client";

import { client } from "@/lib/client";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
        {children}
      </ApolloProvider>
    </SessionProvider>
  );
}
