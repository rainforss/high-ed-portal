import { ClientCredentialRequest } from "@azure/msal-node";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { dynamicsDocument } from "../../../../../services/dynamicsDocument";
import { instantiateCca } from "../../../../../utils/cca";
import { withSessionRoute } from "../../../../../utils/withSession";

async function documentsRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.session.user) {
      const error = new Error(
        "Please log in to view the the restricted information."
      );
      error.name = "Unauthorized";
      throw error;
    }
    // await connect();
    const cca = await instantiateCca();
    const clientCredentialsRequest: ClientCredentialRequest = {
      scopes: [`${process.env.CLIENT_URL}/.default`],
      skipCache: false,
    };
    const graphTokenRequest: ClientCredentialRequest = {
      scopes: ["https://graph.microsoft.com/.default"],
      skipCache: false,
    };
    // const tokenResponse = await cca.acquireTokenByClientCredential(
    //   clientCredentialsRequest
    // );
    // const graphTokenResponse = await cca.acquireTokenByClientCredential(
    //   graphTokenRequest
    // );

    const tokenRequests = [
      cca.acquireTokenByClientCredential(clientCredentialsRequest),
      cca.acquireTokenByClientCredential(graphTokenRequest),
    ];

    const tokenResponses = await Promise.all(tokenRequests);

    if (!tokenResponses[0]) {
      const error = new Error(
        "Internal server error, could not retrieve an access token for Dynamics 365 environment."
      );
      error.name = "Server Error";
      throw error;
    }

    if (!tokenResponses[1]) {
      const error = new Error(
        "Internal server error, could not retrieve an access token for SharePoint environment."
      );
      error.name = "Server Error";
      throw error;
    }

    const { applicationId } = req.query;
    switch (req.method) {
      case "GET":
        const documentLocations = await dynamicsDocument(
          tokenResponses[0].accessToken
        ).getAllDocumentsForStudentApplication(applicationId as string);

        const documents = await axios.get(
          `https://graph.microsoft.com/v1.0/sites/betachdemo2020pcsandbox.sharepoint.com/drives/b!fUo7ChrZnEaeo-H6G3Ywc2pUAv_Ug6NBpThU2QY6p8yyJvO7pbreT7cDtwqrbKXV/root:/${documentLocations[0].relativeurl}:/children`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponses[1].accessToken}`,
            },
          }
        );
        // await disconnect();

        return res.status(200).json(documents.data.value);

      case "POST":
        const createdDocumentLocation = await dynamicsDocument(
          tokenResponses[0].accessToken
        ).createDocumentLocationForStudentApplication(
          applicationId as string,
          req.body.studentApplicationName
        );

        await axios.post(
          "https://graph.microsoft.com/v1.0/sites/betachdemo2020pcsandbox.sharepoint.com/drives/b!fUo7ChrZnEaeo-H6G3Ywc2pUAv_Ug6NBpThU2QY6p8yyJvO7pbreT7cDtwqrbKXV/items",
          {
            name: createdDocumentLocation.relativeurl,
            folder: {},
            "@microsoft.graph.conflictBehavior": "fail",
          },
          {
            headers: {
              Authorization: `Bearer ${tokenResponses[1].accessToken}`,
            },
          }
        );

        // await disconnect();

        return res.status(200).json(createdDocumentLocation);

      default:
        const error = new Error(
          `Method ${req.method} is not allowed for this endpoint.`
        );
        error.name = "Method Not Allowed";
        throw error;
    }
  } catch (err: any) {
    // await disconnect();
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

export default withSessionRoute(documentsRoute);
