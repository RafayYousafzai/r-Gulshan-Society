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
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { deleteDocument } from "@/api/functions/post";

export default function TableWrapper({ items }) {
  const deleteRow = (id) => {
    deleteDocument("customers", id);
  };

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Time</TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>CNIC</TableColumn>
        <TableColumn>Phone</TableColumn>
        {/* <TableColumn>Address</TableColumn> */}
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {items &&
          items.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item?.date}</TableCell>
              <TableCell>{item?.time}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.cnic}</TableCell>
              <TableCell>{item?.phone}</TableCell>
              {/* <TableCell>{item?.address}</TableCell> */}
              <TableCell>
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
