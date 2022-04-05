import {
  Badge,
  Box,
  Flex,
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
    <Link href={`/applications/${application.bsi_studentapplicationid}`}>
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
          <Text
            as="h2"
            fontWeight="bold"
            fontSize="1.2rem"
            textTransform="uppercase"
          >
            {application.bsi_Program.mshied_name}
          </Text>
          <Text as="small">{application.bsi_AcademicPeriod.mshied_name}</Text>
        </Flex>
        <Flex p={4} style={{ gap: "1rem" }}>
          <Badge
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
      </Box>
    </Link>
  );
};

export default ApplicationCard;
