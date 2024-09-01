"use client";

import { getDocById } from "@/api/functions/get";
import Challan from "@/components/challan";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const installmentIndex = searchParams.get("installmentIndex") - 1;

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

  return (
    <div className="w-full h-full">
      <Challan
        item={item}
        selectedEntry={
          item?.entries ? item?.entries[installmentIndex] : {} || {}
        }
      />
    </div>
  );
}

// const InfoItem = ({ label, value }) => (
//   <div>
//     <p className="text-md text-gray-600">{label}</p>
//     <p className="text-sm font-semibold">{value}</p>
//   </div>
// );
