"use client";

import { App } from "@/components/customers";
import useAdminContext from "@/context/FirebaseContext";

export default function Page() {
  const { customers } = useAdminContext();

  return <App items={customers} />;
}
