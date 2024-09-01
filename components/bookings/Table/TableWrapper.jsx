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
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { deleteDocument } from "@/api/functions/post";
import NewEntry from "../NewEntry/NewEntry";
import Link from "next/link";

export default function TableWrapper({ items }) {
  const deleteRow = (id) => {
    deleteDocument("bookings", id);
  };

  console.log(items);

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Time</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>CNIC</TableColumn>
        <TableColumn>Phone</TableColumn>
        <TableColumn>Plot Size</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Ref No.</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {items &&
          items.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item?.date}</TableCell>
              <TableCell>{item?.time}</TableCell>
              <TableCell>{item?.selectedCustomer?.name}</TableCell>
              <TableCell>{item?.selectedCustomer?.cnic}</TableCell>
              <TableCell>{item?.selectedCustomer?.phone}</TableCell>
              <TableCell>{item?.selectedPlot?.size}</TableCell>
              <TableCell>{item?.totalPrice}</TableCell>
              <TableCell>{item?.id}</TableCell>
              <TableCell>
                <NewEntry item={item} />
                <Tooltip content="View" color="success">
                  <Link
                    href={{
                      pathname: "/bookings/view",
                      query: { id: `${item?.id}` },
                    }}
                  >
                    <InfoIcon size={20} fill="#5a258f" />
                  </Link>
                </Tooltip>
                <Tooltip content="Delete" color="danger">
                  <button onClick={() => deleteRow(item?.id)}>
                    <TrashIcon size={20} fill="#e12e32" />
                  </button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
