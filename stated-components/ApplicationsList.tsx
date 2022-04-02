import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FcViewDetails } from "react-icons/fc";
import * as React from "react";
import { useApplications } from "../hooks/useApplications";
import ApplicationModal from "./ApplicationModal";

interface IApplicationsListProps {
  contactId: string;
}

const ApplicationsList: React.FunctionComponent<IApplicationsListProps> = (
  props
) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { applications, isError, isLoading } = useApplications(props.contactId);
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="linkedin">
          <TableCaption>Active Applications</TableCaption>
          <Thead>
            <Tr>
              <Th>Program</Th>
              <Th>Academic Period</Th>
              <Th>Application Fee Paid</Th>
              <Th>Commitment Fee Paid</Th>
              <Th>Application Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!isLoading &&
              applications.length > 0 &&
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
                      icon={<Icon as={FcViewDetails} />}
                      fontSize="2xl"
                      onClick={onOpen}
                    />{" "}
                    {a.bsi_Program.mshied_name}
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
      </TableContainer>
      <ApplicationModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default ApplicationsList;
