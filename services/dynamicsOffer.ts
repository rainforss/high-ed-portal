import {
  retrieveMultiple,
  WebApiConfig,
  updateWithReturnData,
  Entity,
} from "dataverse-webapi/lib/node";

export const dynamicsOffer = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getOffersByApplicantId: async (applicantId: string) => {
      const offers = await retrieveMultiple(
        config,
        "bsi_offers",
        `$filter=statecode eq 0 and _bsi_applicant_value eq '${applicantId}'&$select=bsi_name,bsi_expirationdate,bsi_offerstatus&$expand=bsi_Program($select=mshied_name),bsi_StudentApplication($select=bsi_name),bsi_ProgramHistoryCondition($select=bsi_name),bsi_AcademicPeriod($select=mshied_name)`,
        { representation: true }
      );

      return offers.value;
    },
    updateOfferByOfferId: async (offerId: string, offerData: Entity) => {
      const offer = await updateWithReturnData(
        config,
        "bsi_offers",
        offerId,
        offerData,
        "$select=bsi_name,bsi_expirationdate,bsi_offerstatus"
      );

      return offer;
    },
    // rejectOffer: async (offerId: string) => {
    //   const offer = await updateWithReturnData(
    //     config,
    //     "bsi_offers",
    //     offerId,
    //     { bsi_offerstatus: 861560002 },
    //     "$select=bsi_name,bsi_expirationdate,bsi_offerstatus"
    //   );

    //   return offer;
    // },
    // acceptOffer: async (offerId: string) => {
    //   const offer = await updateWithReturnData(
    //     config,
    //     "bsi_offers",
    //     offerId,
    //     { bsi_offerstatus: 861560001 },
    //     "$select=bsi_name,bsi_expirationdate,bsi_offerstatus"
    //   );

    //   return offer;
    // },
  };
};
