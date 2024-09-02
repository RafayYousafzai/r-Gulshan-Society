// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { AdminProvider } from "@/context/FirebaseContext";
import { Layout } from "@/components/layout/layout";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <AdminProvider>
        <Layout>{children}</Layout>
      </AdminProvider>
    </NextUIProvider>
  );
}
