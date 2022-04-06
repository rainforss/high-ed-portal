import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  StackDivider,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useOffers } from "../hooks/useOffers";

interface IOfferFormProps {
  offerId: string;
}

const OfferForm: React.FunctionComponent<IOfferFormProps> = ({ offerId }) => {
  const { offers, isError, isLoading } = useOffers(undefined, offerId);
  return (
    <Box
      boxShadow="#e92731 0px 5px 15px"
      borderRadius="5px"
      h="100%"
      p="2rem"
      position="relative"
    >
      {!isLoading && (
        <>
          <Flex flexDirection="column">
            <Flex justify="space-between" alignItems="center" mb={12}>
              <Text as="h2" fontWeight="bold" fontSize="1.5rem">
                {offers.bsi_name}
              </Text>
              <Badge fontSize="1rem" bg="red.400" color="white">
                {
                  offers[
                    "bsi_offerstatus@OData.Community.Display.V1.FormattedValue"
                  ]
                }
              </Badge>
            </Flex>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              <Flex>
                <Stat>
                  <StatLabel>Prerequisite Program</StatLabel>
                  <StatNumber>
                    {offers.bsi_PrerequisiteProgram.mshied_name}
                  </StatNumber>
                  <StatHelpText>
                    Program to be completed for admission
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Destined Program</StatLabel>
                  <StatNumber>{offers.bsi_Program.mshied_name}</StatNumber>
                  <StatHelpText>Program of admission</StatHelpText>
                </Stat>
              </Flex>
              <Flex>
                <Stat>
                  <StatLabel>Starting Academic Period</StatLabel>
                  <StatNumber>
                    {offers.bsi_AcademicPeriod.mshied_name}
                  </StatNumber>
                  <StatHelpText>
                    Academic period to start the prerequisite program
                  </StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel>Offer Expiration Date</StatLabel>
                  <StatNumber>
                    {new Date(offers.bsi_expirationdate).toLocaleString()}
                  </StatNumber>
                  <StatHelpText>
                    Academic period to start the prerequisite program
                  </StatHelpText>
                </Stat>
              </Flex>
              <Flex>
                <Alert status="warning">
                  <AlertIcon />
                  You must complete &nbsp;
                  <Text as="strong">
                    {offers.bsi_PrerequisiteProgram.mshied_name}
                  </Text>{" "}
                  &nbsp; to be admitted into &nbsp;
                  <Text as="strong">{offers.bsi_Program.mshied_name}</Text>
                </Alert>
              </Flex>
            </VStack>
          </Flex>
          <Flex position="absolute" bottom="4rem" left="2rem">
            <ButtonGroup spacing="6">
              <Button bg="#e92731" color="white">
                Accept
              </Button>
              <Button>Reject</Button>
            </ButtonGroup>
          </Flex>
          <Button position="absolute" bottom="4rem" right="2rem" px={8}>
            Exit
          </Button>
        </>
      )}
    </Box>
  );
};

export default OfferForm;
