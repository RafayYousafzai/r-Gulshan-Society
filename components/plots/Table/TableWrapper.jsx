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
    deleteDocument("plots", id);
  };

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Time</TableColumn>
        <TableColumn>Plot Size</TableColumn>
        <TableColumn>Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {items &&
          items.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item?.date}</TableCell>
              <TableCell>{item?.time}</TableCell>
              <TableCell>Marla-{item?.size}</TableCell>
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
