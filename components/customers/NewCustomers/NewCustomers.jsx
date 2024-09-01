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
} from "@nextui-org/react";
import { postDoc } from "@/api/functions/post";

export default function NewCustomers() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [cnic, setCNIC] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
    postDoc({ name, cnic, phone, address }, "customers");
    // Reset form fields
    setName("");
    setCNIC("");
    setPhone("");
    setAddress("");
    onClose(); // Close the modal after submission
  };

  return (
    <>
      <Button variant="shadow" color="success" onClick={onOpen}>
        New Plot
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>New Plot</ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="CNIC"
              value={cnic}
              onChange={(e) => setCNIC(e.target.value)}
            />
            <Input
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
