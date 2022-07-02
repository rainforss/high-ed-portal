import { ClientCredentialRequest } from "@azure/msal-node";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { instantiateCca } from "../../utils/cca";
import { connect, disconnect } from "../../utils/redis";
import { withSessionRoute } from "../../utils/withSession";

async function proxyRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.session.user) {
      const error = new Error(
        "Please log in to view the the restricted information."
      );
      error.name = "Unauthorized";
      throw error;
    }
    await connect();
    const cca = await instantiateCca();
    const graphTokenRequest: ClientCredentialRequest = {
      scopes: ["https://graph.microsoft.com/.default"],
      skipCache: false,
    };
    const tokenResponse = await cca.acquireTokenByClientCredential(
      graphTokenRequest
    );
    if (!tokenResponse) {
      const error = new Error(
        "Internal server error, could not retrieve an access token for MS Graph."
      );
      error.name = "Server Error";
      throw error;
    }
    const { path } = req.query;
    const result = await axios.post(
      "https://graph.microsoft.com/v1.0/sites/betachdemo2020pcsandbox.sharepoint.com/drives/b!fUo7ChrZnEaeo-H6G3Ywc2pUAv_Ug6NBpThU2QY6p8yyJvO7pbreT7cDtwqrbKXV/root:" +
        path +
        "/createUploadSession",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      }
    );

    await disconnect();

    return res.status(200).json(result.data);
  } catch (err: any) {
    await disconnect();
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

export default withSessionRoute(proxyRoute);
