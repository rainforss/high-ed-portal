import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Icon,
  IconButton,
  Skeleton,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import { RiFileList3Fill } from "react-icons/ri";
import * as React from "react";
import { useApplications } from "../hooks/useApplications";
import { PlusSquareIcon } from "@chakra-ui/icons";

interface IApplicationsListProps {
  contactId: string;
}

const ApplicationsList: React.FunctionComponent<IApplicationsListProps> = (
  props
) => {
  const { applications, isError, isLoading } = useApplications(props.contactId);

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
                  <Th color="#e31837">Applied Program</Th>
                  <Th color="#e31837">Destined Program</Th>
                  <Th color="#e31837">Academic Period</Th>
                  <Th color="#e31837">Application Fee</Th>
                  <Th color="#e31837">Commitment Fee</Th>
                  <Th color="#e31837">Application Status</Th>
                </Tr>
              </Thead>

              <Tbody>
                {applications.length > 0 &&
                  applications.map((a: any) => (
                    <Tr key={a.bsi_studentapplicationid}>
                      <Td>
                        <IconButton
                          aria-label="Details"
                          as="a"
                          icon={<Icon as={RiFileList3Fill} />}
                          bgColor="white"
                          color="#767676"
                          fontSize="2xl"
                          mr={4}
                          href={`/applications/${a.bsi_studentapplicationid}`}
                        />{" "}
                        {a.bsi_Program.mshied_name}
                      </Td>
                      <Td>
                        {a.bsi_DestinedProgram
                          ? a.bsi_DestinedProgram.mshied_name
                          : "None"}
                      </Td>
                      <Td>{a.bsi_AcademicPeriod.mshied_name}</Td>
                      <Td>{a.bsi_applicationfeepaid ? "Yes" : "No"}</Td>
                      <Td>{a.bsi_commitmentfeepaid ? "Yes" : "No"}</Td>
                      <Td>
                        {
                          a[
                            "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue"
                          ]
                        }
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            <Center mt={16}>
              <Button
                as="a"
                href="/applications/new"
                bgColor="#e92731"
                color="white"
                px={6}
                leftIcon={<PlusSquareIcon />}
              >
                NEW APPLICATION
              </Button>
            </Center>
          </>
        )}
      </TableContainer>
    </>
  );
};

export default ApplicationsList;
