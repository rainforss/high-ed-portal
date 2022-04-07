import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsCourseHistory = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAllByContactId: async (contactId: string) => {
      const courseHistories = await retrieveMultiple(
        config,
        "mshied_coursehistories",
        `$filter=statecode eq 0 and _mshied_studentid_value eq '${contactId}'&$select=mshied_name,mshied_creditsattempted&$expand=mshied_CourseId($select=mshied_name),mshied_AcademicPeriodDetailsId($select=mshied_name),mshied_RegistrationStatusId($select=mshied_name),mshied_CourseSectionId($select=mshied_name,bsi_coursenumber)`
      );

      return courseHistories.value;
    },
  };
};
