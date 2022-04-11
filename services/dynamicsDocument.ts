import {
  retrieveMultiple,
  WebApiConfig,
  createWithReturnData,
} from "dataverse-webapi/lib/node";

export const dynamicsDocument = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAllDocumentsForStudentApplication: async (
      studentApplicationId: string
    ) => {
      const spDocuments = await retrieveMultiple(
        config,
        "sharepointdocumentlocations",
        `$filter=_regardingobjectid_value eq ${studentApplicationId}`
      );
      return spDocuments.value;
    },
    createDocumentLocationForStudentApplication: async (
      studentApplicationId: string,
      _studentApplicationName: string
    ) => {
      const documentLocation = await createWithReturnData(
        config,
        "sharepointdocumentlocations",
        {
          name: "Documents on Default Site 1",
          "parentsiteorlocation_sharepointdocumentlocation@odata.bind":
            "/sharepointdocumentlocations(514f1e36-fc89-ec11-8d20-000d3af4f149)",
          "regardingobjectid_bsi_studentapplication@odata.bind": `/bsi_studentapplications(${studentApplicationId})`,
          relativeurl:
            "_" + studentApplicationId.replace(/-/g, "").toUpperCase(),
        },
        "$select=name,relativeurl"
      );

      return documentLocation;
    },
  };
};
