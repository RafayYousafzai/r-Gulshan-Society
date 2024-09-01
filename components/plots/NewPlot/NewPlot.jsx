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

export default function NewPlot() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [size, setSize] = useState(0);

  const handleSubmit = () => {
    postDoc({ size: size }, "plots");
  };

  return (
    <>
      <Button variant="shadow" color="success" onPress={onOpen}>
        New Plot
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Plot
              </ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  label="Plot Size in Marla"
                  placeholder="0.00"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
