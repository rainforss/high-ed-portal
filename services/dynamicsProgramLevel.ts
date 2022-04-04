import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsProgramLevel = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAll: async () => {
      const programLevels = await retrieveMultiple(
        config,
        "mshied_programlevels",
        `$filter=statecode eq 0&$select=mshied_name`
      );

      return programLevels.value;
    },
  };
};
