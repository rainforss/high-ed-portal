import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsTask = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAllByContactId: async (contactId: string) => {
      const tasks = await retrieveMultiple(
        config,
        "tasks",
        `$filter=statecode eq 0 and _regardingobjectid_value eq '${contactId}'&$select=subject,scheduledend,description,prioritycode&$orderby=scheduledend asc`,
        { representation: true }
      );

      return tasks.value;
    },
  };
};
