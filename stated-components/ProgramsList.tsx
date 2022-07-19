import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Icon,
  useDisclosure,
  Skeleton,
  Flex,
} from "@chakra-ui/react";
import * as React from "react";
import { FcViewDetails } from "react-icons/fc";
import { RiFileList3Fill } from "react-icons/ri";
import { usePrograms } from "../hooks/usePrograms";
import { Program } from "../types/dynamicsEntities";

import ProgramModal from "./ProgramModal";

interface IProgramsListProps {}

const ProgramsList: React.FunctionComponent<IProgramsListProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { programs, isError, isLoading } = usePrograms(true);
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
        bg="whiteAlpha.900"
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
          <Table variant="striped" colorScheme="blue">
            <Thead
              position="sticky"
              top="0"
              zIndex={3}
              bg="white"
              boxShadow="inset 0 2px 0 #0a2351, inset 0 -2px 0 #0a2351"
            >
              <Tr>
                <Th color="#0a2351">Program</Th>
                <Th color="#0a2351">Program Code</Th>
                <Th color="#0a2351">Interview Required</Th>
              </Tr>
            </Thead>

            <Tbody>
              {programs.length > 0 &&
                programs.map((a: any) => (
                  <Tr key={a.mshied_programid}>
                    <Td>
                      <IconButton
                        aria-label="Details"
                        icon={<Icon as={RiFileList3Fill} />}
                        bgColor="white"
                        color="#767676"
                        _hover={{ color: "#0a2351" }}
                        transition="ease-in-out 0.5s"
                        fontSize="2xl"
                        mr={4}
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
