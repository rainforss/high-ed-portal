import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import * as React from "react";
import { useDocuments } from "../hooks/useDocuments";
import { Application } from "../types/dynamicsEntities";

interface IApplicationModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  application: Application;
}

const ApplicationModal: React.FunctionComponent<IApplicationModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  application,
}) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  const { documents, isError, isLoading } = useDocuments(
    application.bsi_studentapplicationid
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApplicationModal;
