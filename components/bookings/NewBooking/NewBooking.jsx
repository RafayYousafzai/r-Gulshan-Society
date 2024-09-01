"use client";

import React, { useEffect, useState } from "react";
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
import { getCollections } from "@/api/functions/get";
import { postDoc } from "@/api/functions/post";

export default function NewCustomers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plots, setPlots] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plots = await getCollections("plots");
        setPlots(plots);
        const customers = await getCollections("customers");
        setCustomers(customers);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchData();
  }, []);

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
    // Handle form submission here
    const installmentAmount = calculateInstallment();
    const bookingData = {
      ...formData,
      installmentAmount: installmentAmount,
    };
    postDoc(bookingData, "bookings");
    // Reset form fields
    setFormData({
      selectedPlot: null,
      selectedCustomer: null,
      totalPrice: "",
      installmentQuarters: 0,
      startDate: "",
    });
    onClose(); // Close the modal after submission
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
            <Autocomplete label="Select a Plot" value={formData.selectedPlot}>
              {plots &&
                plots.map((plot) => (
                  <AutocompleteItem
                    onClick={() => handleChange("selectedPlot", plot)}
                    key={plot.id}
                    value={plot}
                  >
                    {plot.size}
                  </AutocompleteItem>
                ))}
            </Autocomplete>
            <Autocomplete
              label="Select a Customer"
              value={formData.selectedCustomer}
            >
              {customers &&
                customers.map((customer) => (
                  <AutocompleteItem
                    onClick={() => handleChange("selectedCustomer", customer)}
                    key={customer.id}
                    value={customer}
                  >
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
