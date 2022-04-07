import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsProgramHistory = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAllByContactId: async (contactId: string) => {
      const programHistories = await retrieveMultiple(
        config,
        "bsi_programhistories",
        `$filter=statecode eq 0 and _bsi_student_value eq '${contactId}'&$select=bsi_programhistorystatus,bsi_gpa&$expand=bsi_Program($select=mshied_name),bsi_StartAcademicPeriod($select=mshied_name)`,
        { representation: true }
      );

      console.log(programHistories);
      return programHistories.value;
    },
  };
};
