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
import { useTasks } from "../hooks/useTasks";

interface INotificationsListProps {
  contactId: string;
}

const NotificationsList: React.FunctionComponent<INotificationsListProps> = (
  props
) => {
  const { tasks, isError, isLoading } = useTasks(props.contactId);
  return (
    <>
      <TableContainer
        h="100%"
        overflowX="auto"
        overflowY="auto"
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
          <>
            <Table variant="striped" colorScheme="red">
              <Thead>
                <Tr>
                  <Th>Subject</Th>
                  <Th>Importance</Th>
                  <Th>Description</Th>
                  <Th>Due Date</Th>
                </Tr>
              </Thead>

              <Tbody>
                {tasks.length > 0 &&
                  tasks.map((a) => (
                    <Tr key={a.activityid}>
                      <Td>
                        <IconButton
                          aria-label="Details"
                          as="a"
                          icon={<Icon as={FcViewDetails} />}
                          bgColor="white"
                          fontSize="2xl"
                          mr={4}
                          href={`/tasks/${a.activityid}`}
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
                      <Td>{a.description}</Td>
                      <Td>{new Date(a.scheduledend).toLocaleString()}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            {tasks && tasks.length === 0 && (
              <Center mt={16} px={8}>
                <Alert status="info">
                  <AlertIcon />
                  You have no notifications at this moment.
                </Alert>
              </Center>
            )}
          </>
        )}
      </TableContainer>
    </>
  );
};

export default NotificationsList;