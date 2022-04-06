import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import ApplicationCard from "../components/ApplicationCard";
import OfferCard from "../components/OfferCard";
import { useApplications } from "../hooks/useApplications";
import { useOffers } from "../hooks/useOffers";
import { Application, Offer } from "../types/dynamicsEntities";

interface IDashBoardProps {
  contactId: string;
}

const DashBoard: React.FunctionComponent<IDashBoardProps> = (props) => {
  const {
    applications,
    isError: isApplicationsError,
    isLoading: isApplicationsLoading,
  } = useApplications(props.contactId);
  const {
    offers,
    isLoading: isOffersLoading,
    isError: isOffersError,
  } = useOffers(props.contactId);

  console.log(offers);

  return (
    <Flex h="100%" justify="space-around">
      <Flex
        w="45%"
        flexDirection="column"
        p={6}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        overflowY="scroll"
      >
        <Text as="h2" fontWeight="bold" textTransform="uppercase" mb={6}>
          Open Applications
        </Text>
        {isApplicationsLoading && (
          <Center h="100%" flexDirection="column">
            <Spinner size="xl" />
            <Text mt={6}>Loading Open Application Information</Text>
          </Center>
        )}
        {!!applications && (
          <Flex flexDirection="column" style={{ gap: "20px" }}>
            {applications.map((a: Application) => {
              if (
                a[
                  "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue"
                ] !== "Accepted" &&
                a[
                  "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue"
                ] !== "Rejected" &&
                a[
                  "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue"
                ] !== "Rescinded"
              ) {
                return (
                  <ApplicationCard
                    key={a.bsi_studentapplicationid}
                    application={a}
                  />
                );
              }
            })}
          </Flex>
        )}
      </Flex>
      <Flex
        w="45%"
        flexDirection="column"
        p={6}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        overflowY="scroll"
      >
        <Text as="h2" fontWeight="bold" textTransform="uppercase" mb={6}>
          Pending Offers
        </Text>
        {isOffersLoading && (
          <Center h="100%" flexDirection="column">
            <Spinner size="xl" />
            <Text mt={6}>Loading Pending Offer Information</Text>
          </Center>
        )}
        {!!offers &&
          !offers.find(
            (o: any) =>
              o["bsi_offerstatus@OData.Community.Display.V1.FormattedValue"] ===
              "Open"
          ) &&
          !isOffersLoading && (
            <Alert status="info">
              <AlertIcon /> You have no open offers at this moment.
            </Alert>
          )}
        {!!offers && (
          <Flex flexDirection="column" style={{ gap: "20px" }}>
            {offers.map((a: Offer) => {
              if (
                a[
                  "bsi_offerstatus@OData.Community.Display.V1.FormattedValue"
                ] === "Open"
              ) {
                return <OfferCard key={a.bsi_offerid} offer={a} />;
              }
            })}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default DashBoard;
