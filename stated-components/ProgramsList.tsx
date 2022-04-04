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
  Skeleton,
  Spinner,
  Center,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import { FcViewDetails } from "react-icons/fc";
import { usePrograms } from "../hooks/usePrograms";
import { Program } from "../types/dynamicsEntities";
import ApplicationModal from "./ApplicationModal";
import ProgramModal from "./ProgramModal";

interface IProgramsListProps {}

const ProgramsList: React.FunctionComponent<IProgramsListProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { programs, isError, isLoading } = usePrograms();
  const [selectedProgram, setSelectedProgram] = React.useState<
    Program | undefined
  >();
  return (
    <>
      <TableContainer
        h="100%"
        overflowX="auto"
        overflowY="scroll"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        borderRadius="5px"
      >
        {isLoading && (
          <Flex flexDir="column" align="stretch" style={{ gap: "2px" }}>
            <Skeleton isLoaded={!isLoading} h="40.5px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
            <Skeleton isLoaded={!isLoading} h="73px"></Skeleton>
          </Flex>
        )}
        {!isLoading && (
          <Table variant="striped" colorScheme="linkedin">
            <Thead
              position="sticky"
              top="0"
              zIndex={3}
              bg="white"
              boxShadow="inset 0 2px 0 royalblue, inset 0 -2px 0 royalblue"
            >
              <Tr>
                <Th color="royalblue">Program</Th>
                <Th color="royalblue">Program Code</Th>
                <Th color="royalblue">Interview Required</Th>
              </Tr>
            </Thead>

            <Tbody>
              {programs.length > 0 &&
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
                        bgColor="white"
                        fontSize="2xl"
                        onClick={() => {
                          setSelectedProgram(a);
                          onOpen();
                        }}
                      />{" "}
                      {a.mshied_name}
                    </Td>
                    <Td>{a.mshied_code}</Td>
                    <Td>{a.bsi_interviewrequired ? "Yes" : "No"}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>

      {!!selectedProgram && (
        <ProgramModal
          program={selectedProgram}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default ProgramsList;
