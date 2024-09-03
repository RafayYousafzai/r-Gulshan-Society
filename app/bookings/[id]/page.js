"use client";

import BookingInformation from "@/components/bookingInformation";
import useAdminContext from "@/context/FirebaseContext";
import { Spinner } from "@nextui-org/react";

export default function Page(slug) {
  const { bookings } = useAdminContext();

  const id = slug?.searchParams?.id;
  const booking = bookings.find((booking) => booking.id === id);

  console.log(booking);

  if (!booking) {
    return <Spinner />;
  }

  return <BookingInformation item={booking} />;
}
