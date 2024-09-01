import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import Link from "next/link";
import { InfoIcon } from "@/components/icons/accounts/info-icon";

const calculateQuarterDate = (startDate, quarterNumber) => {
  // Convert start date to date object
  const startDateObj = new Date(startDate);
  // Calculate the number of months to add based on the quarter number
  const monthsToAdd = (quarterNumber - 1) * 3;
  // Add months to the start date
  startDateObj.setMonth(startDateObj.getMonth() + monthsToAdd);
  // Format the date as desired
  const formattedDate = startDateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formattedDate;
};

export default function TableWrapper({ item, noChallan }) {
  const { entries, installmentQuarters } = item;

  // Calculate the total price and number of installments
  const totalInstallments = installmentQuarters;

  return (
    <Table aria-label="Installment Tracking Table">
      <TableHeader>
        <TableColumn>Sr No.</TableColumn>
        <TableColumn>Description</TableColumn>
        <TableColumn>Due Date</TableColumn>
        <TableColumn>Due Amount</TableColumn>
        <TableColumn>Received Date & Time</TableColumn>
        <TableColumn>Received Amount</TableColumn>
        <TableColumn>Outstanding Balance</TableColumn>
        {noChallan ? (
          <TableColumn></TableColumn>
        ) : (
          <TableColumn>Action</TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {Array.from({ length: totalInstallments }, (_, index) => {
          const installmentIndex = index + 1;
          const installment = entries && entries[index] ? entries[index] : {}; // Get installment if exists

          const received = installment?.amount ? installment.amount : 0;

          const outstandingBalance =
            parseFloat(item?.installmentAmount) - received;

          const quarterDate = calculateQuarterDate(
            item?.startDate,
            installmentIndex
          );

          console.log(quarterDate, 5 + 4);
          return (
            <TableRow key={index}>
              <TableCell className="text-gray-800">
                {installmentIndex}
              </TableCell>
              <TableCell className="text-gray-800">{`Installment ${installmentIndex}`}</TableCell>
              <TableCell className="text-gray-800">{quarterDate}</TableCell>
              <TableCell className="text-gray-800">
                {item?.installmentAmount}
              </TableCell>
              <TableCell className="text-gray-800">
                {installment?.date || "-"} {installment?.time || "-"}
              </TableCell>
              <TableCell className="text-gray-800">
                {installment?.amount || "-"}
              </TableCell>
              <TableCell className="text-gray-800">
                {outstandingBalance}
              </TableCell>
              {noChallan ? (
                <TableCell></TableCell>
              ) : (
                <TableCell className="text-gray-800">
                  <Tooltip content="View" color="success">
                    <Link
                      href={{
                        pathname: `/bookings/${item.id}/challan`,
                        query: {
                          id: item.id,
                          installmentIndex: installmentIndex,
                        },
                      }}
                    >
                      <InfoIcon size={20} fill="#5a258f" />
                    </Link>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
