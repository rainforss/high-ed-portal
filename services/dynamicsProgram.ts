import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsProgram = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAll: async () => {
      const programs = await retrieveMultiple(
        config,
        "mshied_programs",
        `$filter=statecode eq 0&$select=mshied_name,mshied_code,bsi_interviewrequired&$orderby=mshied_name asc`
      );

      return programs.value;
    },
  };
};
