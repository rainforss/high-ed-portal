import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsAcademicPeriod = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAll: async () => {
      const academicPeriods = await retrieveMultiple(
        config,
        "mshied_academicperiods",
        `$filter=statecode eq 0`
      );

      return academicPeriods.value;
    },
  };
};
