"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Autocomplete,
  Tooltip,
  AutocompleteItem,
} from "@nextui-org/react";
import { updateDoc } from "@/api/functions/post";
import getCurrentDateTime from "@/api/getCurrentDateTime";
import { BalanceIcon } from "@/components/icons/sidebar/balance-icon";

export default function NewEntry({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState(null);

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

  // Initialize quarters array with the expected format of { label: "", value: "" }
  const quarters = Array.from(
    { length: parseInt(item.installmentQuarters) },
    (_, index) => {
      const quarterLabel = `Quarter ${index + 1}`;
      const quarterDate = calculateQuarterDate(item.startDate, index + 1);
      return {
        label: `${quarterLabel} - ${quarterDate}`,
        value: String(index + 1), // Convert index to string as Autocomplete expects string values
        date: quarterDate,
      };
    }
  );

  const handleSubmit = async () => {
    try {
      // TODO: Validate input values

      const currentDate = getCurrentDateTime();
      const newEntry = {
        amount: parseFloat(amount),
        date: currentDate.date,
        time: currentDate.time,
        quarter: parseInt(selectedQuarter.value),
      };

      const dateTime = getCurrentDateTime();

      const updatedEntries = item.entries
        ? [
            ...item.entries,
            {
              ...newEntry,
            },
          ]
        : [
            {
              ...newEntry,
            },
          ];

      // Handle form submission here
      await updateDoc("bookings", item.id, {
        ...item,
        entries: updatedEntries,
      });

      console.log("bookings", item.id, {
        ...item,
        entries: updatedEntries,
      });

      // Close the modal after submission
      onClose();
    } catch (error) {
      console.error("Error adding installment/challan:", error);
    }
  };

  return (
    <>
      <Tooltip content="New Entry" color="danger">
        <button onClick={onOpen}>
          <BalanceIcon size={20} fill="#e12e32" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>New Entry</ModalHeader>
          <ModalBody>
            <Input
              label="Amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Autocomplete label="Select a Quarter" value={selectedQuarter}>
              {quarters &&
                quarters.map((quarter, index) => (
                  <AutocompleteItem
                    onClick={() => setSelectedQuarter(quarter)}
                    key={index}
                    value={quarter}
                  >
                    {quarter.label}
                  </AutocompleteItem>
                ))}
            </Autocomplete>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Close
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
