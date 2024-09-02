"use client";

import { App } from "@/components/bookings";
import useAdminContext from "@/context/FirebaseContext";

export default function Page() {
  const { bookings } = useAdminContext();

  return <App items={bookings} />;
}
