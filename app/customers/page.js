"use client";

import { App } from "@/components/customers";
import { Layout } from "@/components/layout/layout";
import { getCollections } from "@/api/functions/get";
import { useEffect, useState } from "react";

export default function Page() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCollections("customers");
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
