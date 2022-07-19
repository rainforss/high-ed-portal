import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
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
  Text,
  List,
  ListItem,
  ListIcon,
  VStack,
  StackDivider,
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import * as React from "react";
import { Program } from "../types/dynamicsEntities";

interface IProgramModalProps {
  program: Program;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ProgramModal: React.FunctionComponent<IProgramModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  program,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Program Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              <Flex justify="space-between" align="center">
                <Text
                  as="h2"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  color="#0a2351"
                >
                  {program.mshied_name}
                </Text>
                <Text as="small" whiteSpace="nowrap">
                  {program.mshied_code}
                </Text>
              </Flex>
              <Box>
                <Text fontWeight="bold" mb={4}>
                  Program Description
                </Text>
                <Text as="p">{program.bsi_description || "None"}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" mb={4}>
                  Program Requirements
                </Text>
                {program.mshied_ProgramRequirement_Programid_mshie.length ===
                0 ? (
                  <Text>None</Text>
                ) : (
                  <List spacing={2}>
                    {program.mshied_ProgramRequirement_Programid_mshie.map(
                      (pr) => (
                        <ListItem key={pr.mshied_programrequirementid}>
                          <ListIcon
                            as={pr.mshied_isrequired ? LockIcon : UnlockIcon}
                            color={pr.mshied_isrequired ? "red" : "green"}
                          />{" "}
                          {pr.mshied_name}
                        </ListItem>
                      )
                    )}
                  </List>
                )}
              </Box>
              <Box>
                <Text fontWeight="bold" mb={4}>
                  Document Requirements
                </Text>
                {program.bsi_SupportingDocument_mshied_program_msh.length ===
                0 ? (
                  <Text>None</Text>
                ) : (
                  <List spacing={2}>
                    {program.bsi_SupportingDocument_mshied_program_msh.map(
                      (pr) => (
                        <ListItem key={pr.bsi_supportingdocumentid}>
                          <ListIcon
                            as={pr.bsi_isrequired ? LockIcon : UnlockIcon}
                            color={pr.bsi_isrequired ? "red" : "green"}
                          />{" "}
                          {pr.bsi_name}
                        </ListItem>
                      )
                    )}
                  </List>
                )}
              </Box>
              <Box>
                <Text fontWeight="bold" mb={4}>
                  Fees and Payment
                </Text>
                <Flex>
                  <Stat>
                    <StatLabel>Application Fee</StatLabel>
                    <StatNumber>
                      {program.bsi_applicationfee
                        ? `$ ${program.bsi_applicationfee}`
                        : "None"}
                    </StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Commitment Fee</StatLabel>
                    <StatNumber>
                      {program.bsi_commitmentfee
                        ? `$ ${program.bsi_commitmentfee}`
                        : "None"}
                    </StatNumber>
                  </Stat>
                </Flex>
              </Box>
              <Box>
                <Text
                  fontWeight="bold"
                  mb={4}
                  color={program.bsi_interviewrequired ? "orange" : "inherit"}
                >
                  {program.bsi_interviewrequired
                    ? "Interview Required"
                    : "Interview Not Required"}
                </Text>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor="#b6922e"
              color="white"
              mr={3}
              as="a"
              href={`/applications/new?programId=${program.mshied_programid}`}
            >
              Apply
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProgramModal;
