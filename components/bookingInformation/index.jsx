import { Button, Divider, Image } from "@nextui-org/react";
import React, { useMemo } from "react";
import TableWrapper from "./Table/TableWrapper";
import Link from "next/link";

export default function BookingInformation({ item, noChallan }) {
  // Calculate the total amount received using memoization to avoid unnecessary recalculations
  const totalAmountReceived = useMemo(() => {
    return (
      item?.entries?.reduce((total, entry) => total + (entry.amount || 0), 0) ||
      0
    );
  }, [item]);

  // Calculate total due and outstanding amounts with fallbacks for missing data
  const totalDueAmount = useMemo(() => {
    const installmentAmount = parseFloat(item?.installmentAmount || 0);
    const installmentQuarters = parseInt(item?.installmentQuarters || 0);
    return installmentAmount * installmentQuarters;
  }, [item]);

  const installmentOutstanding = useMemo(() => {
    return totalDueAmount || 0 - totalAmountReceived || 0;
  }, [totalDueAmount, totalAmountReceived]);

  return (
    <div className="w-full py-8 bg-white">
      {/* Header with logo and customer/plot details */}
      <div className="flex justify-between items-center mx-8 w-full">
        <div className="w-1/4">
          <Image src="/logo.jpg" alt="logo" height={200} width={150} />
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <InfoItem
              label="Plot Size"
              value={`${item?.selectedPlot?.size || "N/A"} Marla`}
            />
            <InfoItem
              label="Customer"
              value={item?.selectedCustomer?.name || "N/A"}
            />
            <InfoItem
              label="CNIC"
              value={item?.selectedCustomer?.cnic || "N/A"}
            />
          </div>
          <div className="space-y-4">
            <InfoItem
              label="Price"
              value={`Rs. ${item?.totalPrice || "N/A"}`}
            />
            <InfoItem
              label="Address"
              value={item?.selectedCustomer?.address || "N/A"}
            />
          </div>
        </div>
      </div>

      <Divider className="my-6" />

      <TableWrapper item={item} noChallan={noChallan} />

      <Divider className="my-6" />

      {/* Footer with booking date and financial summary */}
      <div className="flex justify-between items-center mx-8">
        <InfoItem
          label="Booked At"
          value={`${item?.date || "N/A"} ${item?.time || ""}`}
        />
        <div />
        <div />
        <InfoItem
          label="Total Due Amount"
          value={`Rs. ${totalDueAmount.toFixed(2)}`}
        />
        <InfoItem
          label="Total Received"
          value={`Rs. ${(totalAmountReceived || 0)?.toFixed(2)}`}
        />
        <InfoItem
          label="Installment Outstanding"
          value={`Rs. ${installmentOutstanding.toFixed(2)}`}
        />
      </div>

      {/* PDF creation button */}
      {!noChallan && (
        <div className="flex justify-center mt-4">
          <Link
            href={{
              pathname: `/print/${item.id}`,
              query: { id: item.id },
            }}
          >
            <Button variant="shadow" color="warning">
              Create PDF
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// Reusable component to display information items with labels and values
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-md text-gray-800">{label}</p>
    <p className="text-sm text-gray-600 font-semibold">{value}</p>
  </div>
);
