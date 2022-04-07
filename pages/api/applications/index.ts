import { ClientCredentialRequest } from "@azure/msal-node";
import { NextApiRequest, NextApiResponse } from "next";
import { dynamicsApplication } from "../../../services/dynamicsApplication";
import { dynamicsApplicationProcess } from "../../../services/dynamicsApplicationProcess";
import { ApplicationDTO } from "../../../types/dynamicsEntities";
import { instantiateCca } from "../../../utils/cca";
import { connect, disconnect } from "../../../utils/redis";
import { withSessionRoute } from "../../../utils/withSession";

async function applicationsRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.session.user) {
      const error = new Error(
        "Please log in to view the the restricted information."
      );
      error.name = "Unauthorized";
      throw error;
    }
    switch (req.method) {
      case "POST":
        await connect();
        const cca = await instantiateCca();
        const clientCredentialsRequest: ClientCredentialRequest = {
          scopes: [`${process.env.CLIENT_URL}/.default`],
          skipCache: false,
        };
        const tokenResponse = await cca.acquireTokenByClientCredential(
          clientCredentialsRequest
        );
        if (!tokenResponse) {
          const error = new Error(
            "Internal server error, could not retrieve an access token for Dynamics 365 environment."
          );
          error.name = "Server Error";
          throw error;
        }
        const newApplication = new ApplicationDTO();
        newApplication[
          "bsi_AcademicPeriod@odata.bind"
        ] = `/mshied_academicperiods(${req.body.academicPeriodId})`;
        newApplication[
          "bsi_Applicant@odata.bind"
        ] = `/mshied_academicperiods(${req.body.applicantId})`;
        newApplication[
          "bsi_Program@odata.bind"
        ] = `/mshied_academicperiods(${req.body.programId})`;
        if (req.body.destinedProgramId) {
          newApplication[
            "bsi_DestinedProgram@odata.bind"
          ] = `/mshied_programs(${req.body.destinedProgramId})`;
        }

        newApplication.bsi_name = req.body.name;

        const createdApplication = await dynamicsApplication(
          tokenResponse.accessToken
        ).createApplication(newApplication);

        await dynamicsApplicationProcess(
          tokenResponse.accessToken
        ).createApplicationProcess(
          createdApplication.bsi_studentapplicationid as string
        );

        await disconnect();

        return res.status(200).json(createdApplication);

      default:
        const error = new Error(
          `Method ${req.method} is not allowed for this endpoint.`
        );
        error.name = "Method Not Allowed";
        throw error;
    }
  } catch (err: any) {
    await disconnect();
    if (err.name === "Method Not Allowed") {
      return res
        .status(405)
        .json({ error: { name: err.name, message: err.message } });
    }
    if (err.name === "Unauthorized") {
      return res
        .status(401)
        .json({ error: { name: err.name, message: err.message } });
    }
    if (err.name === "Server Error") {
      return res
        .status(500)
        .json({ error: { name: err.name, message: err.message } });
    }
    return res
      .status(500)
      .json({ error: { name: "Internal Server Error", message: err.message } });
  }
}

export default withSessionRoute(applicationsRoute);
