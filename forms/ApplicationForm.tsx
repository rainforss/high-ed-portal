import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  Skeleton,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import ToggleInput from "../components/ToggleInput";
import { useAcademicPeriods } from "../hooks/useAcademicPeriods";
import { useApplications } from "../hooks/useApplications";
import { useProgramLevels } from "../hooks/useProgramLevels";
import { usePrograms } from "../hooks/usePrograms";
import DocumentsDrawer from "../stated-components/DocumentsDrawer";
import { Program } from "../types/dynamicsEntities";

interface IApplicationFormProps {
  applicationId?: string;
  applicantId: string;
}

type ApplicationValues = {
  name: string;
  programId: string;
  destinedProgramId: string;
  programLevelId: string;
  academicPeriodId: string;
  applicantId: string;
  missingDocuments?: string;
  appliedToTraditional: boolean;
};

const ApplicationForm: React.FunctionComponent<IApplicationFormProps> = ({
  applicationId,
  applicantId,
}) => {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const memoizedOnClose = React.useCallback(() => onClose(), []);
  const {
    academicPeriods,
    isError: isPeriodsError,
    isLoading: isPeriodsLoading,
  } = useAcademicPeriods();
  const {
    programs,
    isError: isProgramsError,
    isLoading: isProgramsLoading,
  } = usePrograms(false);
  const {
    programLevels,
    isError: isProgramLevelsError,
    isLoading: isProgramLevelsLoading,
  } = useProgramLevels();
  const {
    applications,
    isError: isApplicationError,
    isLoading: isApplicationLoading,
  } = useApplications(undefined, applicationId);

  return (
    <Box
      boxShadow="rgba(0,0,0,0.3) 0px 5px 15px"
      borderRadius="5px"
      h="100%"
      p="1.5rem"
      position="relative"
      bg="whiteAlpha.900"
    >
      {isApplicationLoading && !!applicationId && (
        <Center h="100%" flexDirection="column">
          <Spinner size="xl" />
          <Text mt={6}>Loading Application Information</Text>
        </Center>
      )}
      {!isApplicationLoading && !!isApplicationError && (
        <Box h="100%">
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>NOT FOUND</AlertTitle>
            <AlertDescription>
              Application not found from database.
            </AlertDescription>
          </Alert>
        </Box>
      )}
      {(!isApplicationLoading || !applicationId) && !isApplicationError && (
        <Formik
          initialValues={
            applications
              ? {
                  name: applications.bsi_name,
                  programId: applications.bsi_Program.mshied_programid,
                  destinedProgramId: applications.bsi_DestinedProgram
                    ? applications.bsi_DestinedProgram.mshied_programid
                    : "",
                  programLevelId: applications.bsi_ProgramLevel
                    ? applications.bsi_ProgramLevel.mshied_programlevelid
                    : "",
                  academicPeriodId:
                    applications.bsi_AcademicPeriod.mshied_academicperiodid,
                  applicantId: applications.bsi_Applicant.contactid,
                  missingDocuments: applications.bsi_missingdocuments,
                  appliedToTraditional: applications.bsi_DestinedProgram
                    ? true
                    : false,
                }
              : {
                  name: "",
                  programId: "",
                  destinedProgramId: "",
                  programLevelId: "",
                  academicPeriodId: "",
                  applicantId: applicantId,
                  missingDocuments: "",
                  appliedToTraditional: false,
                }
          }
          onSubmit={async (values, actions) => {
            try {
              if (!!applicationId) {
                return toast({
                  title: "Action Prohibited",
                  description:
                    "You are not allowed to update existing application's information.",
                  status: "warning",
                  isClosable: true,
                  duration: 5000,
                });
              }
              const createdApplication = await axios.post(
                "/api/applications",
                values
              );
              await axios.post(
                `/api/applications/${createdApplication.data.bsi_studentapplicationid}/documents`,
                { studentApplicationName: values.name }
              );

              toast({
                title: "Application Submitted",
                description:
                  "Application has been submitted to our admissions team. You can now attach supporting documents for the application.",
                status: "success",
                isClosable: true,
                duration: 5000,
                onCloseComplete: () =>
                  router.push(
                    `/applications/${createdApplication.data.bsi_studentapplicationid}`
                  ),
              });
              actions.setSubmitting(false);
            } catch (error: any) {
              actions.setSubmitting(false);
              toast({
                title: "Application Submission Failed",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          }}
        >
          {({ isSubmitting, values }: FormikProps<ApplicationValues>) => {
            return (
              <Form
                style={{
                  padding: "0",
                  display: "flex",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                {isProgramsLoading && (
                  <Skeleton
                    isLoaded={!isProgramsLoading}
                    w="100%"
                    h="72px"
                    m="1rem"
                  ></Skeleton>
                )}

                {!isProgramsLoading && (
                  <>
                    <TextInput
                      name="name"
                      id="name"
                      type="text"
                      label="Application Name"
                      disabled={!!applicationId}
                      w="50%"
                      p="1rem"
                    />
                    <SelectInput
                      options={programs.filter(
                        (p: Program) =>
                          p.bsi_iscontinuingeducation || p.bsi_islanguageprogram
                      )}
                      id="programId"
                      name="programId"
                      label="Program"
                      disabled={!!applicationId}
                      w="50%"
                      p="1rem"
                    />
                  </>
                )}

                {!isProgramsLoading && (
                  <ToggleInput
                    id="appliedToTraditional"
                    name="appliedToTraditional"
                    label="Have you applied to a traditional program in York University"
                    disabled={!!applicationId}
                    w="100%"
                    p="1rem"
                    py="2rem"
                  />
                )}

                {!isProgramsLoading && !!values.appliedToTraditional && (
                  <SelectInput
                    options={programs}
                    id="destinedProgramId"
                    name="destinedProgramId"
                    label="Destined Program"
                    disabled={!!applicationId}
                    w="100%"
                    p="1rem"
                  />
                )}

                {isProgramLevelsLoading && (
                  <Skeleton
                    isLoaded={!isProgramLevelsLoading}
                    w="100%"
                    h="72px"
                    m="1rem"
                  ></Skeleton>
                )}

                {!isProgramLevelsLoading && !!applicationId && (
                  <SelectInput
                    options={programLevels}
                    id="programLevelId"
                    name="programLevelId"
                    label="Program Level"
                    disabled={!!applicationId}
                    w="100%"
                    p="1rem"
                  />
                )}

                {isPeriodsLoading && (
                  <Skeleton
                    isLoaded={!isPeriodsLoading}
                    w="100%"
                    h="72px"
                    m="1rem"
                  ></Skeleton>
                )}

                {!isPeriodsLoading && (
                  <SelectInput
                    options={academicPeriods}
                    id="academicPeriodId"
                    name="academicPeriodId"
                    label="Academic Period"
                    disabled={!!applicationId}
                    w="100%"
                    p="1rem"
                  />
                )}

                {!isProgramLevelsLoading && !!applicationId && (
                  <TextInput
                    name="missingDocuments"
                    id="missingDocuments"
                    type="text"
                    label="Missing Documents"
                    disabled={!!applicationId}
                    w="50%"
                    p="1rem"
                  />
                )}

                {!applicationId && (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    left="2.5rem"
                    bottom="2.5rem"
                    bgColor="#e92731"
                    color="white"
                    px="2rem"
                    py="1.5rem"
                    position="absolute"
                    isLoading={isSubmitting}
                  >
                    APPLY
                  </Button>
                )}
                {!!applicantId && !!onOpen && !!applicationId && (
                  <Button
                    disabled={!applicationId}
                    left="2.5rem"
                    bottom="2.5rem"
                    bgColor="#e92731"
                    color="white"
                    px="2rem"
                    py="1.5rem"
                    position="absolute"
                    onClick={onOpen}
                  >
                    FILE ATTACHMENT
                  </Button>
                )}
                <Button
                  right="2.5rem"
                  bottom="2.5rem"
                  px="2rem"
                  py="1.5rem"
                  position="absolute"
                  as="a"
                  href="/applications"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  variant="outline"
                >
                  {!!applicationId ? "EXIT" : "CANCEL"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      )}
      {!!applicationId && applications && !!applications.bsi_name && (
        <DocumentsDrawer
          applicationId={applicationId}
          applicationName={applications.bsi_name}
          isOpen={isOpen}
          onClose={memoizedOnClose}
        />
      )}
    </Box>
  );
};

const memoizedApplicationForm = React.memo(ApplicationForm);

export default memoizedApplicationForm;
