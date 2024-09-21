"use client";

import { useState, useMemo } from "react";
import useAdminContext from "@/context/FirebaseContext";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { SearchIcon, CalendarIcon, UserIcon, HomeIcon } from "lucide-react";

// type Booking = {
//   id: string;
//   selectedCustomer: string;
//   selectedPlot: string;
//   totalPrice: string;
//   date: string;
// };

// type Customer = {
//   id: string;
//   name: string;
//   cnic: string;
//   address: string;
//   phone: string;
// };

// type Plot = {
//   id: string;
//   name: string;
//   size: string;
//   date: string;
// };

// type SearchResult = {
//   id: string;
//   type: "booking" | "customer" | "plot";
//   title: string;
//   subtitle: string;
//   icon: React.ReactNode;
// };

export default function Component() {
  const { bookings, customers, plots } = useAdminContext();
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = useMemo(() => {
    if (!searchTerm) return [];

    const lowerSearchTerm = searchTerm.toLowerCase();

    const bookingResults =
      bookings
        ?.filter(
          (booking) =>
            booking.selectedPlot.toLowerCase().includes(lowerSearchTerm) ||
            booking.selectedCustomer.toLowerCase().includes(lowerSearchTerm) ||
            booking.totalPrice.toLowerCase().includes(lowerSearchTerm)
        )
        .map((booking) => ({
          id: booking.id,
          type: "booking",
          title: `Booking: ${booking.selectedCustomer} - ${booking.selectedPlot}`,
          subtitle: `Total Price: ${booking.totalPrice} | Date: ${booking.date}`,
          icon: <CalendarIcon className="h-5 w-5" />,
        })) || [];

    const customerResults =
      customers
        ?.filter(
          (customer) =>
            customer.name.toLowerCase().includes(lowerSearchTerm) ||
            customer.cnic.toLowerCase().includes(lowerSearchTerm) ||
            customer.address.toLowerCase().includes(lowerSearchTerm) ||
            customer.phone.toLowerCase().includes(lowerSearchTerm)
        )
        .map((customer) => ({
          id: customer.id,
          type: "customer",
          title: `Customer: ${customer.name}`,
          subtitle: `CNIC: ${customer.cnic} | Phone: ${customer.phone}`,
          icon: <UserIcon className="h-5 w-5" />,
        })) || [];

    const plotResults =
      plots
        ?.filter(
          (plot) =>
            plot.name.toLowerCase().includes(lowerSearchTerm) ||
            plot.size.toLowerCase().includes(lowerSearchTerm) ||
            plot.id.toLowerCase().includes(lowerSearchTerm)
        )
        .map((plot) => ({
          id: plot.id,
          type: "plot",
          title: `Plot: ${plot.name}`,
          subtitle: `Size: ${plot.size} Marla | Date: ${plot.date}`,
          icon: <HomeIcon className="h-5 w-5" />,
        })) || [];

    return [...bookingResults, ...customerResults, ...plotResults];
  }, [searchTerm, bookings, customers, plots]);

  return (
    <Autocomplete
      label="Search"
      placeholder="Search bookings, customers, or plots..."
      className="max-w-xs"
      startContent={<SearchIcon className="text-default-400" />}
      isClearable
      onClear={() => setSearchTerm("")}
      onInputChange={(value) => setSearchTerm(value)}
    >
      {searchResults.map((result) => (
        <AutocompleteItem
          key={`${result.type}-${result.id}`}
          value={result.id}
          className="capitalize"
        >
          <div className="flex items-center gap-2">
            <Avatar
              alt={result.type}
              className="flex-shrink-0"
              size="sm"
              icon={result.icon}
            />
            <div className="flex flex-col">
              <span className="text-small">{result.title}</span>
              <span className="text-tiny text-default-400">
                {result.subtitle}
              </span>
            </div>
          </div>
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
