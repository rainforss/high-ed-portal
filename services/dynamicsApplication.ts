import {
  retrieveMultiple,
  WebApiConfig,
  retrieve,
  createWithReturnData,
} from "dataverse-webapi/lib/node";
import { ApplicationDTO } from "../types/dynamicsEntities";

export const dynamicsApplication = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAll: async () => {
      const studentApplications = await retrieveMultiple(
        config,
        "bsi_studentapplications",
        `$filter=statecode eq 0`
      );

      return studentApplications.value;
    },
    createApplication: async (application: ApplicationDTO) => {
      const result = await createWithReturnData(
        config,
        "bsi_studentapplications",
        application as ApplicationDTO,
        "$select=bsi_name,bsi_applicationstatus,bsi_applicationfeepaid,bsi_commitmentfeepaid,bsi_packagecomplete"
      );

      return result;
    },
    getApplicationsByContactId: async (contactId: string) => {
      const studentApplications = await retrieveMultiple(
        config,
        "bsi_studentapplications",
        `$filter=statecode eq 0 and _bsi_applicant_value eq '${contactId}'&$select=bsi_name,bsi_applicationstatus,bsi_applicationfeepaid,bsi_commitmentfeepaid,bsi_packagecomplete&$expand=bsi_Program($select=mshied_name),bsi_AcademicPeriod($select=mshied_name),bsi_ProgramLevel($select=mshied_name),bsi_Applicant($select=fullname),bsi_PrerequisiteProgram($select=mshied_name)`,
        { representation: true }
      );

      return studentApplications.value;
    },
    getApplicationById: async (applicationId: string) => {
      const studentApplication = await retrieve(
        config,
        "bsi_studentapplications",
        applicationId,
        `$filter=statecode eq 0&$select=bsi_name,bsi_applicationstatus,bsi_applicationfeepaid,bsi_commitmentfeepaid,bsi_packagecomplete&$expand=bsi_Program($select=mshied_name),bsi_AcademicPeriod($select=mshied_name),bsi_ProgramLevel($select=mshied_name),bsi_Applicant($select=fullname)`,
        { representation: true }
      );

      if (studentApplication.error) {
        const error = new Error((studentApplication.error as any).message);
        error.name = (studentApplication.error as any).code;
        throw error;
      }

      return studentApplication;
    },
  };
};
