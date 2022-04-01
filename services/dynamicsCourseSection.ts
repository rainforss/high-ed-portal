import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsCourseSection = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAll: async () => {
      const courseSections = await retrieveMultiple(
        config,
        "mshied_coursesections",
        `$filter=statecode eq 0`
      );

      return courseSections.value;
    },

    getCourseSectionsByAcademicTerm: async () => {},
  };
};
