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
import { FcViewDetails } from "react-icons/fc";
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
            <Table variant="striped" colorScheme="linkedin">
              <Thead>
                <Tr>
                  <Th>Program</Th>
                  <Th>Prerequisite Program</Th>
                  <Th>Academic Period</Th>
                  <Th>Application Fee Paid</Th>
                  <Th>Commitment Fee Paid</Th>
                  <Th>Application Status</Th>
                </Tr>
              </Thead>

              <Tbody>
                {applications.length > 0 &&
                  applications.map((a: any) => (
                    <Tr key={a.bsi_studentapplicationid}>
                      <Td
                        display="flex"
                        justifyContent="start"
                        alignItems="center"
                        style={{ gap: "1rem" }}
                      >
                        <IconButton
                          aria-label="Details"
                          as="a"
                          icon={<Icon as={FcViewDetails} />}
                          bgColor="white"
                          fontSize="2xl"
                          href={`/applications/${a.bsi_studentapplicationid}`}
                        />{" "}
                        {a.bsi_Program.mshied_name}
                      </Td>
                      <Td>
                        {a.bsi_PrerequisiteProgram
                          ? a.bsi_PrerequisiteProgram.mshied_name
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
                bgColor="#7dd956"
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
