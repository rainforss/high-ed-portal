import { PlusSquareIcon } from "@chakra-ui/icons";
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
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as React from "react";
import { FcViewDetails } from "react-icons/fc";
import { RiFileList3Fill } from "react-icons/ri";
import { useAppointments } from "../hooks/useAppointments";

interface IAppointmentsListProps {
  contactId: string;
}

const AppointmentsList: React.FunctionComponent<IAppointmentsListProps> = (
  props
) => {
  const { appointments, isError, isLoading } = useAppointments(props.contactId);
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
            <Table variant="striped" colorScheme="red">
              <Thead
                position="sticky"
                top="0"
                zIndex={3}
                bg="white"
                boxShadow="inset 0 2px 0 #e31837, inset 0 -2px 0 #e31837"
              >
                <Tr>
                  <Th color="#e31837">Subject</Th>
                  <Th color="#e31837">Importance</Th>
                  <Th color="#e31837">Location</Th>
                  <Th color="#e31837">Start Time</Th>
                  <Th color="#e31837">End Time</Th>
                </Tr>
              </Thead>

              <Tbody>
                {appointments.length > 0 &&
                  appointments.map((a) => (
                    <Tr key={a.activityid}>
                      <Td>
                        <IconButton
                          aria-label="Details"
                          as="a"
                          icon={<Icon as={RiFileList3Fill} />}
                          bgColor="white"
                          color="#767676"
                          fontSize="2xl"
                          mr={4}
                          href={`/appointments/${a.activityid}`}
                        />{" "}
                        {a.subject}
                      </Td>
                      <Td>
                        {
                          a[
                            "prioritycode@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </Td>
                      <Td>{a.location}</Td>
                      <Td>{new Date(a.scheduledstart).toLocaleString()}</Td>
                      <Td>{new Date(a.scheduledend).toLocaleString()}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            {appointments && appointments.length === 0 && (
              <Center mt={16} px={8}>
                <Alert status="info">
                  <AlertIcon />
                  You have no appointments at this moment.
                </Alert>
              </Center>
            )}
          </>
        )}
      </TableContainer>
    </>
  );
};

export default AppointmentsList;
