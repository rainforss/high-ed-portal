import { WebApiConfig, create } from "dataverse-webapi/lib/node";

export const dynamicsApplicationProcess = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    createApplicationProcess: async (applicationId: string) => {
      const result = await create(config, "bsi_studentapplicationprocesss", {
        "bpf_bsi_studentapplicationid@odata.bind": `/bsi_StudentApplications(${applicationId})`,
        "activestageid@odata.bind":
          "/processstages(80ea034c-1dac-41ff-92c3-f3b20d4ac7ff)",
      });
      return result;
    },
  };
};
