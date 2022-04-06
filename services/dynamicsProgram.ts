import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsProgram = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAll: async (isContinuingEd?: boolean) => {
      const programs = await retrieveMultiple(
        config,
        "mshied_programs",
        `$filter=statecode eq 0${
          isContinuingEd
            ? " and (bsi_iscontinuingeducation eq true or bsi_islanguageprogram eq true)"
            : ""
        }&$select=mshied_name,mshied_code,bsi_interviewrequired,bsi_applicationfee,bsi_commitmentfee,bsi_iscontinuingeducation,bsi_islanguageprogram&$expand=mshied_ProgramRequirement_Programid_mshie($select=mshied_name,mshied_isrequired)&$orderby=mshied_name asc`
      );

      return programs.value;
    },
  };
};
