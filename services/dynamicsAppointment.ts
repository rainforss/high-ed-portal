import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsAppointment = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAllByContactId: async (contactId: string) => {
      const appointments = await retrieveMultiple(
        config,
        "appointments",
        `$filter=statecode eq 0 and _regardingobjectid_value eq '${contactId}'&$select=subject,location,scheduledstart,scheduledend,description,prioritycode&$orderby=scheduledstart asc`,
        { representation: true }
      );

      return appointments.value;
    },
  };
};
