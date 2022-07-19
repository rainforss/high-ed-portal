import {
  TableContainer,
  Flex,
  Skeleton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Icon,
  Center,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as React from "react";
import { FcViewDetails } from "react-icons/fc";
import { RiFileList3Fill } from "react-icons/ri";
import { useProgramHistories } from "../hooks/useProgramHistories";

interface IProgramHistoriesListProps {
  contactId: string;
}

const ProgramHistoriesList: React.FunctionComponent<
  IProgramHistoriesListProps
> = (props) => {
  const { programHistories, isError, isLoading } = useProgramHistories(
    props.contactId
  );
  return (
    <>
      <TableContainer
        h="100%"
        overflowX="auto"
        overflowY="auto"
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
          <>
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
                  <Th color="#0a2351">Start Academic Period</Th>
                  <Th color="#0a2351">GPA</Th>
                  <Th color="#0a2351">Status</Th>
                </Tr>
              </Thead>

              <Tbody>
                {programHistories.length > 0 &&
                  programHistories.map((a) => (
                    <Tr key={a.bsi_programhistoryid}>
                      <Td>
                        <IconButton
                          aria-label="Details"
                          as="a"
                          icon={<Icon as={RiFileList3Fill} />}
                          bgColor="white"
                          color="#767676"
                          _hover={{ color: "#0a2351" }}
                          transition="ease-in-out 0.5s"
                          fontSize="2xl"
                          mr={4}
                          href={`/programHistories/${a.bsi_programhistoryid}`}
                        />{" "}
                        {a.bsi_Program.mshied_name}
                      </Td>
                      <Td>{a.bsi_StartAcademicPeriod?.mshied_name}</Td>
                      <Td>{a.bsi_gpa}</Td>
                      <Td>
                        {
                          a[
                            "bsi_programhistorystatus@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            {programHistories && programHistories.length === 0 && (
              <Center mt={16} px={8}>
                <Alert status="info">
                  <AlertIcon />
                  You have no program histories at this moment.
                </Alert>
              </Center>
            )}
          </>
        )}
      </TableContainer>
    </>
  );
};

export default ProgramHistoriesList;
