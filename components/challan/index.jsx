import React from "react";
import SingleChallan from "./SingleChallan";

export default function Challan({ item, selectedEntry }) {
  // Mock data
  const mockData = {
    logoSrc: "/logo.jpg",
    recipient: item?.selectedCustomer?.name,
    id: item?.id,
    challanNo: selectedEntry?.quarter,
    date: item?.startDate + " " + item?.time,
    plotSize: item?.selectedPlot?.size + " " + "Marla",
    paymentDetails: [
      { type: "Fee-Individual", amount: selectedEntry?.amount },
      // { type: "Miscellaneous Charges", amount: "27,160" },
    ],
    bankAccounts: [
      "Askari Bank",
      "Bank Alfalah",
      "Bank Al Habib",
      "Allied Bank",
      "Faysal Bank",
      "MCB Bank",
      "Meezan Bank",
      "United Bank Ltd",
    ],
    totalPayment: "Rs." + " " + selectedEntry?.amount,
  };

  return (
    <div className="flex h-screen items-center justify-center gap-8 bg-gray-600">
      <SingleChallan mockData={mockData} />
      <SingleChallan mockData={mockData} />
    </div>
  );
}
