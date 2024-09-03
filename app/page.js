"use client";

import { useState } from "react";
import useAdminContext from "@/context/FirebaseContext";
import TotalBookingsCard from "@/components/dashboard/TotalBookingsCard";
import TotalCustomersCard from "@/components/dashboard/TotalCustomersCard";
import AvailablePlotsCard from "@/components/dashboard/AvailablePlotsCard";
import BookingsChart from "@/components/dashboard/BookingsChart";
import CustomersChart from "@/components/dashboard/CustomersChart";
import PlotTypesChart from "@/components/dashboard/PlotTypesChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import SearchPlots from "@/components/dashboard/SearchPlots";

export default function Page() {
  const { bookings, customers, plots } = useAdminContext();
  const [searchTerm, setSearchTerm] = useState("");

  // Map bookings data for charts
  const bookingsData = bookings.map((booking) => ({
    totalPrice: booking.totalPrice,
    date: booking.date,
    installmentAmount: parseFloat(booking.installmentAmount),
  }));

  // Map customers data for charts
  const customersData = customers.reduce((acc, customer) => {
    const date = customer.date;
    const existingEntry = acc.find((entry) => entry.date === date);

    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }

    return acc;
  }, []);

  // Map plots data for PieChart
  const plotTypesData = plots.map((plot) => ({
    name: `Plot ${plot.id}`,
    value: parseFloat(plot.size),
  }));

  // Filtered search results
  const filteredPlots = plots.filter(
    (plot) =>
      plot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.id.includes(searchTerm)
  );

  // Recent activity logic
  const recentActivity = [
    ...bookings.map((booking) => ({
      id: booking.id,
      action: "New booking",
      customer: booking.selectedCustomer,
      plot: booking.selectedPlot,
      date: booking.date,
    })),
    ...customers.map((customer) => ({
      id: customer.id,
      action: "Customer registration",
      customer: customer.name,
      date: customer.date,
    })),
    ...plots.map((plot) => ({
      id: plot.id,
      action: "New plot added",
      plot: plot.name,
      date: plot.date,
    })),
  ];

  return (
    <div className="p-8 bg-background w-full">
      <h1 className="text-4xl font-bold mb-8">Real Estate Dashboard</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        <TotalBookingsCard bookings={bookings} />
        <TotalCustomersCard customers={customers} />
        <AvailablePlotsCard plots={plots} />
        <BookingsChart bookingsData={bookingsData} />
        <CustomersChart customersData={customersData} />
        <PlotTypesChart plotTypesData={plotTypesData} />
        <RecentActivity recentActivity={recentActivity} />
        {/* <SearchPlots
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredPlots={filteredPlots}
        /> */}
      </div>
    </div>
  );
}
