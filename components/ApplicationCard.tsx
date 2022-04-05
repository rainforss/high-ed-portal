import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  Icon,
  Link,
  Skeleton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import * as React from "react";
import { Application } from "../types/dynamicsEntities";

interface IApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FunctionComponent<IApplicationCardProps> = ({
  application,
}) => {
  return (
    <Box
      position="relative"
      color="white"
      bgColor="#7070ff"
      borderRadius="15px"
    >
      <Flex p={4} align="center" justifyContent="space-between">
        <Badge fontSize="1rem" variant="ghost">
          {
            application[
              "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue"
            ]
          }
        </Badge>
        <Tooltip
          hasArrow
          label="Prerequisite Program"
          bg="gray.300"
          color="black"
        >
          <Text as="h4">
            {application.bsi_PrerequisiteProgram
              ? application.bsi_PrerequisiteProgram.mshied_name
              : "N/A"}
          </Text>
        </Tooltip>
      </Flex>
      <Flex p={4} align="center" style={{ gap: "1.2rem" }}>
        <Link href={`/applications/${application.bsi_studentapplicationid}`}>
          <Text
            as="h2"
            fontWeight="bold"
            fontSize="1.2rem"
            textTransform="uppercase"
          >
            {application.bsi_Program.mshied_name}
          </Text>
        </Link>
        <Text as="small">{application.bsi_AcademicPeriod.mshied_name}</Text>
      </Flex>
      <Flex p={4} justify="space-between">
        <Flex>
          <Badge
            mr={4}
            colorScheme={application.bsi_applicationfeepaid ? "green" : "red"}
          >
            Application Fee{" "}
            {application.bsi_applicationfeepaid ? "PAID" : "UNPAID"}
          </Badge>
          <Badge
            colorScheme={application.bsi_commitmentfeepaid ? "green" : "red"}
          >
            Commitment Fee{" "}
            {application.bsi_commitmentfeepaid ? "PAID" : "UNPAID"}
          </Badge>
        </Flex>
        {application.bsi_packagecomplete ? (
          <Tooltip hasArrow label="Package Complete" bg="green" color="white">
            <CheckCircleIcon color="white" />
          </Tooltip>
        ) : (
          <Tooltip hasArrow label="Package Inomplete" bg="red" color="white">
            <WarningIcon color="white" />
          </Tooltip>
        )}
      </Flex>
    </Box>
  );
};

export default ApplicationCard;
