import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Flex,
  Icon,
  Image,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { MdChat, MdNotifications, MdSchool } from "react-icons/md";
import { SiMicrosoftacademic } from "react-icons/si";
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
    <Flex
      w="100%"
      h="100%"
      flexDirection="column"
      justify="space-between"
      p={8}
    >
      <Flex w="100%" h="32%" justify="space-between">
        <Link
          w="30%"
          h="100%"
          position="relative"
          borderRadius="10px"
          boxShadow="rgba(0,0,0, 0.35) 0px 5px 15px"
        >
          <Image
            src="/home_card_advisor1.jpg"
            alt="talk to advisor"
            w="100%"
            h="100%"
            borderRadius="10px"
          />
          <Flex
            position="absolute"
            bottom="10%"
            left="0"
            bg="rgba(0,0,0,0.5)"
            w="100%"
            h="40%"
            justify="center"
            align="center"
            style={{ gap: "1rem" }}
          >
            <Icon as={MdChat} fontSize="1.5rem" color="white" />
            <Text as="h3" fontSize="1.5rem" color="white">
              Talk with an advisor
            </Text>
          </Flex>
        </Link>
        <Link
          w="30%"
          position="relative"
          borderRadius="10px"
          boxShadow="rgba(0,0,0, 0.35) 0px 5px 15px"
        >
          <Image
            src="/home_card_courses1.jpg"
            alt="talk to advisor"
            w="100%"
            h="100%"
            borderRadius="10px"
          />
          <Flex
            position="absolute"
            bottom="10%"
            left="0"
            bg="rgba(0,0,0,0.5)"
            w="100%"
            h="40%"
            justify="center"
            align="center"
            style={{ gap: "1rem" }}
          >
            <Icon as={SiMicrosoftacademic} fontSize="1.5rem" color="white" />
            <Text as="h3" fontSize="1.5rem" color="white">
              My Courses
            </Text>
          </Flex>
        </Link>
        <Link
          w="30%"
          position="relative"
          borderRadius="10px"
          boxShadow="rgba(0,0,0, 0.35) 0px 5px 15px"
        >
          <Image
            src="/home_card_scholarship1.jpg"
            alt="talk to advisor"
            w="100%"
            h="100%"
            borderRadius="10px"
          />
          <Flex
            position="absolute"
            bottom="10%"
            left="0"
            bg="rgba(0,0,0,0.5)"
            w="100%"
            h="40%"
            justify="center"
            align="center"
            style={{ gap: "1rem" }}
          >
            <Icon as={MdNotifications} fontSize="1.5rem" color="white" />
            <Text as="h3" fontSize="1.5rem" color="white">
              My Notifications
            </Text>
          </Flex>
        </Link>
      </Flex>
      <Flex h="63%" justify="space-between">
        <Flex
          w="48%"
          flexDirection="column"
          p={6}
          boxShadow="rgba(0,0,0, 0.35) 0px 5px 15px"
          overflowY="auto"
          borderRadius="10px"
          bg="whiteAlpha.900"
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
          {!!applications &&
            !applications.find(
              (o: any) =>
                o[
                  "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue"
                ] !== "Accepted" &&
                o[
                  "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue"
                ] !== "Rejected" &&
                o[
                  "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue"
                ] !== "Rescinded"
            ) &&
            !isApplicationsLoading && (
              <Alert status="info">
                <AlertIcon /> You have no open applications at this moment.
              </Alert>
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
          w="48%"
          flexDirection="column"
          p={6}
          boxShadow="rgba(0,0,0, 0.35) 0px 5px 15px"
          overflowY="auto"
          borderRadius="10px"
          bg="whiteAlpha.900"
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
                o[
                  "bsi_offerstatus@OData.Community.Display.V1.FormattedValue"
                ] === "Open" ||
                o[
                  "bsi_offerstatus@OData.Community.Display.V1.FormattedValue"
                ] === "Open (Conditional)"
            ) &&
            !isOffersLoading && (
              <Alert status="info">
                <AlertIcon /> You have no pending offers at this moment.
              </Alert>
            )}
          {!!offers && (
            <Flex flexDirection="column" style={{ gap: "20px" }}>
              {offers.map((a: Offer) => {
                if (
                  a[
                    "bsi_offerstatus@OData.Community.Display.V1.FormattedValue"
                  ] === "Open" ||
                  a[
                    "bsi_offerstatus@OData.Community.Display.V1.FormattedValue"
                  ] === "Open (Conditional)"
                ) {
                  return <OfferCard key={a.bsi_offerid} offer={a} />;
                }
              })}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashBoard;
