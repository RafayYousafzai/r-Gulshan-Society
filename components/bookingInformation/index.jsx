import { Button, Divider, Image } from "@nextui-org/react";
import React from "react";
import TableWrapper from "./Table/TableWrapper";
import Link from "next/link";

export default function BookingInformation({ item, noChallan }) {
  function calculateTotalAmount() {
    return item?.entries?.reduce(
      (total, entry) => total + (entry.amount || 0),
      0
    );
  }
  // console.log(item);

  return (
    <div className="mx-auto py-8 bg-white">
      <div className="flex justify-between items-center mx-8">
        <div className="w-1/4">
          <Image src="/logo.jpg" alt="logo" height={200} width={150} />
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <InfoItem
              label="Plot Size"
              value={`${item?.selectedPlot?.size} Marla`}
            />
            <InfoItem label="Customer" value={item?.selectedCustomer?.name} />
            <InfoItem label="CNIC" value={item?.selectedCustomer?.cnic} />
          </div>
          <div className="space-y-4">
            <InfoItem label="Price" value={item?.totalPrice} />
            <InfoItem label="Address" value={item?.selectedCustomer?.address} />
          </div>
        </div>
      </div>
      <Divider className="my-6" />
      <TableWrapper item={item} noChallan={noChallan} />
      <Divider className="my-6" />

      {/* Display remaining amount */}

      <div className="flex justify-between items-center mx-8">
        <InfoItem label="Booked At" value={`${item?.date} ${item?.time}`} />
        <div />
        <div />
        <InfoItem
          label="Total Due Amount"
          value={`Rs. ${
            item?.installmentAmount * parseFloat(item?.installmentQuarters)
          }`}
        />
        {/* <InfoItem
          label="Total Recieved"
          value={`Rs. ${calculateTotalAmount()} `}
        /> */}
        <InfoItem
          label="Installment Outstanding"
          value={`Rs. ${
            item?.installmentAmount * parseFloat(item?.installmentQuarters)
          }`}
        />
        {/* <div className="flex gap-6">
        </div> */}
        {/* <InfoItem
          label="Surcharge Outstanding"
          value={`${totalSurchargeOutstanding} Rs`}
        /> */}
      </div>
      <div>
        {noChallan ? null : (
          <Link
            href={{
              pathname: `/print/${item.id}`,
              query: {
                id: item.id,
              },
            }}
          >
            <Button variant="shadow" color="warning">
              Create PDF
            </Button>{" "}
          </Link>
        )}
      </div>
    </div>
  );
}

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-md text-gray-800">{label}</p>
    <p className="text-sm text-gray-600 font-semibold">{value}</p>
  </div>
);
