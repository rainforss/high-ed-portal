import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { FcViewDetails } from "react-icons/fc";
import { usePrograms } from "../hooks/usePrograms";
import ApplicationModal from "./ApplicationModal";

interface IProgramsListProps {}

const ProgramsList: React.FunctionComponent<IProgramsListProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { programs, isError, isLoading } = usePrograms();
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="linkedin">
          <TableCaption>Active Applications</TableCaption>
          <Thead>
            <Tr>
              <Th>Program</Th>
              <Th>Program Code</Th>
              <Th>Interview Required</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!isLoading &&
              programs.length > 0 &&
              programs.map((a: any) => (
                <Tr key={a.mshied_programid}>
                  <Td
                    display="flex"
                    justifyContent="start"
                    alignItems="center"
                    style={{ gap: "1rem" }}
                  >
                    <IconButton
                      aria-label="Details"
                      icon={<Icon as={FcViewDetails} />}
                      fontSize="2xl"
                      onClick={onOpen}
                    />{" "}
                    {a.mshied_name}
                  </Td>
                  <Td>{a.mshied_code}</Td>
                  <Td>{a.bsi_interviewrequired ? "Yes" : "No"}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ApplicationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default ProgramsList;
