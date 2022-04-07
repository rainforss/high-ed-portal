import { Badge, Box, Flex, Link, Text, Tooltip } from "@chakra-ui/react";
import * as React from "react";
import { Offer } from "../types/dynamicsEntities";

interface IOfferCardProps {
  offer: Offer;
}

const OfferCard: React.FunctionComponent<IOfferCardProps> = ({ offer }) => {
  return (
    <Box
      position="relative"
      color="white"
      bgColor="#e92731"
      borderRadius="15px"
    >
      <Flex p={4} align="center" justifyContent="space-between">
        <Badge fontSize="0.8rem" variant="ghost">
          {offer["bsi_offerstatus@OData.Community.Display.V1.FormattedValue"]}
        </Badge>
        <Tooltip
          hasArrow
          label="Prerequisite Program"
          bg="gray.300"
          color="black"
        >
          <Text as="h4">
            {offer.bsi_PrerequisiteProgram
              ? offer.bsi_PrerequisiteProgram.mshied_name
              : "N/A"}
          </Text>
        </Tooltip>
      </Flex>
      <Flex p={4} align="center" style={{ gap: "1.2rem" }}>
        <Link href={`/offers/${offer.bsi_offerid}`}>
          <Text
            as="h2"
            fontWeight="bold"
            fontSize="1.2rem"
            textTransform="uppercase"
          >
            {offer.bsi_Program.mshied_name}
          </Text>
        </Link>
        <Text as="small">{offer.bsi_AcademicPeriod.mshied_name}</Text>
      </Flex>
    </Box>
  );
};

export default OfferCard;
