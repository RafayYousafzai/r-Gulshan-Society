"use client";

import React, { useState, useMemo } from "react";
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
import { ExportIcon } from "@/components/icons/accounts/export-icon";

export default function NewEntry({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [error, setError] = useState("");

  const calculateQuarterDate = (startDate, quarterNumber) => {
    const startDateObj = new Date(startDate);
    startDateObj.setMonth(startDateObj.getMonth() + (quarterNumber - 1) * 3);

    return startDateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Memoize quarters to avoid recalculation on every render
  const quarters = useMemo(() => {
    return Array.from(
      { length: parseInt(item.installmentQuarters) },
      (_, index) => {
        const quarterNumber = index + 1;
        return {
          label: `Quarter ${quarterNumber} - ${calculateQuarterDate(
            item.startDate,
            quarterNumber
          )}`,
          value: String(quarterNumber),
        };
      }
    );
  }, [item.installmentQuarters, item.startDate]);

  const handleSubmit = async () => {
    if (!selectedQuarter) {
      setError("Please select a quarter."); // Set error if no quarter is selected
      return;
    }

    try {
      const { date, time } = getCurrentDateTime();
      const newEntry = {
        amount: parseFloat(amount),
        date,
        time,
        quarter: parseInt(selectedQuarter.value),
      };

      const updatedEntries = item.entries
        ? [...item.entries, newEntry]
        : [newEntry];

      // Update the booking entry in Firestore
      await updateDoc("bookings", item.id, {
        ...item,
        entries: updatedEntries,
      });

      // Reset error, form fields, and close modal
      setError("");
      setAmount("");
      setSelectedQuarter(null);
      onClose();
    } catch (error) {
      console.error("Error adding installment/challan:", error);
    }
  };

  const handleQuartersSelect = (index) => {
    const quarter = quarters[index];

    setSelectedQuarter(quarter);
    setError("");
  };

  return (
    <>
      <Tooltip content="New Entry" color="danger">
        <button onClick={onOpen}>
          <ExportIcon size={20} fill="#e12e32" />
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
            <Autocomplete
              label="Select a Quarter"
              value={selectedQuarter?.label || ""}
              onSelectionChange={handleQuartersSelect}
            >
              {quarters.map((quarter, index) => (
                <AutocompleteItem key={index} value={quarter.value}>
                  {quarter.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* Display error if any */}
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
