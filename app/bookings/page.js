"use client";

import React, { useEffect, useState } from "react";
import { App } from "@/components/bookings";
import { Layout } from "@/components/layout/layout";
import { getCollections } from "@/api/functions/get";

export default function Page() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCollections("bookings");
        setCollection(res);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <App items={collection} />
    </Layout>
  );
}
