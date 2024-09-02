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
  AutocompleteItem,
} from "@nextui-org/react";
import { postDoc } from "@/api/functions/post";
import useAdminContext from "@/context/FirebaseContext";

export default function NewCustomers() {
  const { plots, customers } = useAdminContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    selectedPlot: null,
    selectedCustomer: null,
    totalPrice: "",
    installmentQuarters: 0,
    startDate: "",
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateInstallment = () => {
    const totalPrice = parseFloat(formData.totalPrice);
    const quarters = parseInt(formData.installmentQuarters);
    if (totalPrice && quarters) {
      const installmentAmount = totalPrice / quarters;
      return installmentAmount.toFixed(2);
    }
    return "";
  };

  const handleSubmit = () => {
    const installmentAmount = calculateInstallment();
    const bookingData = {
      ...formData,
      installmentAmount: installmentAmount,
    };
    postDoc(bookingData, "bookings");

    // Reset form fields after submission
    setFormData({
      selectedPlot: null,
      selectedCustomer: null,
      totalPrice: "",
      installmentQuarters: 0,
      startDate: "",
    });
    onClose();
  };

  return (
    <>
      <Button variant="shadow" color="success" onClick={onOpen}>
        New Booking
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>New Booking</ModalHeader>
          <ModalBody>
            <Autocomplete
              label="Select a Plot"
              value={formData.selectedPlot || ""}
              onSelectionChange={(id) => handleChange("selectedPlot", id)}
            >
              {plots &&
                plots.map((plot) => (
                  <AutocompleteItem key={plot.id} value={plot.id}>
                    {plot.size}
                  </AutocompleteItem>
                ))}
            </Autocomplete>

            <Autocomplete
              label="Select a Customer"
              value={formData.selectedCustomer || ""}
              onSelectionChange={(id) => handleChange("selectedCustomer", id)}
            >
              {customers &&
                customers.map((customer) => (
                  <AutocompleteItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </AutocompleteItem>
                ))}
            </Autocomplete>

            <Input
              label="Total Price"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={(e) => handleChange("totalPrice", e.target.value)}
            />
            <Input
              label="Installment Quarters"
              name="installmentQuarters"
              type="number"
              value={formData.installmentQuarters}
              onChange={(e) =>
                handleChange("installmentQuarters", e.target.value)
              }
            />
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
            <Input
              label="Installment Amount"
              value={calculateInstallment()}
              disabled
            />
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
