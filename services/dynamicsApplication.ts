import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

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
    getApplicationsByContactId: async (contactId: string) => {
      const studentApplications = await retrieveMultiple(
        config,
        "bsi_studentapplications",
        `$filter=statecode eq 0 and _bsi_applicant_value eq '${contactId}'&$select=bsi_applicationstatus,bsi_applicationfeepaid,bsi_commitmentfeepaid,bsi_packagecomplete&$expand=bsi_Program($select=mshied_name),bsi_studentapplication_SharePointDocuments($select=readurl,editurl,absoluteurl),bsi_AcademicPeriod($select=mshied_name)`,
        { representation: true }
      );

      return studentApplications.value;
    },
  };
};
