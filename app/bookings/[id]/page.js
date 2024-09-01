"use client";

import { getDocById } from "@/api/functions/get";
import BookingInformation from "@/components/bookingInformation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({}); // Initialize item as an object

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDocById(id, "bookings");
        setItem(res);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <BookingInformation item={item} />; // Pass item as an object
}
