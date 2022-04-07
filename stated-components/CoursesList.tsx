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
import { useCourseHistories } from "../hooks/useCourseHistories";

interface ICoursesListProps {
  contactId: string;
}

const CoursesList: React.FunctionComponent<ICoursesListProps> = (props) => {
  const { courseHistories, isError, isLoading } = useCourseHistories(
    props.contactId
  );
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
                  <Th>Course</Th>
                  <Th>Course Section</Th>
                  <Th>Academic Period</Th>
                  <Th>Credits Attempted</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>

              <Tbody>
                {courseHistories.length > 0 &&
                  courseHistories.map((a) => (
                    <Tr key={a.mshied_coursehistoryid}>
                      <Td>
                        <IconButton
                          aria-label="Details"
                          as="a"
                          icon={<Icon as={FcViewDetails} />}
                          bgColor="white"
                          fontSize="2xl"
                          mr={4}
                          href={`/courseHistories/${a.mshied_coursehistoryid}`}
                        />{" "}
                        {a.mshied_CourseId.mshied_name}
                      </Td>
                      <Td>{a.mshied_CourseSectionId.bsi_coursenumber}</Td>
                      <Td>{a.mshied_AcademicPeriodDetailsId.mshied_name}</Td>
                      <Td>{a.mshied_creditsattempted}</Td>
                      <Td>{a.mshied_RegistrationStatusId.mshied_name}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            {courseHistories && courseHistories.length === 0 && (
              <Center mt={16} px={8}>
                <Alert status="info">
                  <AlertIcon />
                  You have no course histories at this moment.
                </Alert>
              </Center>
            )}
          </>
        )}
      </TableContainer>
    </>
  );
};

export default CoursesList;
