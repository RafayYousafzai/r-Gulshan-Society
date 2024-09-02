"use client";

import { App } from "@/components/plots";
import useAdminContext from "@/context/FirebaseContext";

export default function Page() {
  const { plots } = useAdminContext();

  return <App items={plots} />;
}
