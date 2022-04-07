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
        }&$select=mshied_name,mshied_code,bsi_interviewrequired,bsi_applicationfee,bsi_commitmentfee,bsi_iscontinuingeducation,bsi_islanguageprogram&$expand=mshied_ProgramRequirement_Programid_mshie($select=mshied_name,mshied_isrequired),bsi_SupportingDocument_mshied_program_msh($select=bsi_name,bsi_requiredfilenameprefix,bsi_filetype,bsi_isrequired)&$orderby=mshied_name asc`,
        { representation: true }
      );

      return programs.value;
    },
  };
};
