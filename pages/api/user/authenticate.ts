import { ClientCredentialRequest } from "@azure/msal-node";
import { NextApiRequest, NextApiResponse } from "next";
import { dynamicsContact } from "../../../services/dynamicsContact";
import { instantiateCca } from "../../../utils/cca";
import bcrypt from "bcrypt";
import { withSessionRoute } from "../../../utils/withSession";
import { connect, disconnect } from "../../../utils/redis";

async function authenticateRoute(req: NextApiRequest, res: NextApiResponse) {
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
    return res.status(500).json({
      error: {
        name: "Server Error",
        message:
          "Internal server error, could not retrieve an access token for Dynamics 365 environment.",
      },
    });
  }

  const { username, password } = req.body;
  switch (req.method) {
    case "POST":
      const users = await dynamicsContact(
        tokenResponse.accessToken
      ).getByUsername(username);

      try {
        if (!users || users.length === 0) {
          const error = new Error("User not found");
          error.name = "Credential Mismatch";
          error.message = `User of ${username} is not found in the system. Please check your username and password.`;
          throw error;
        }
        if (!bcrypt.compareSync(password, users[0].bsi_password)) {
          const error = new Error("User not found");
          error.name = "Credential Mismatch";
          error.message = `User of ${username} is not found in the system. Please check your username and password.`;
          throw error;
        }

        req.session.user = {
          firstName: users[0].firstname,
          lastName: users[0].lastname,
          email: users[0].emailaddress1,
          _id: users[0].contactid,
          username: users[0].bsi_username,
        };

        await req.session.save();
        await disconnect();
        return res.status(200).json({
          _id: users[0].contactid,
          firstName: users[0].firstname,
          lastName: users[0].lastname,
          email: users[0].emailaddress1,
          username: users[0].bsi_username,
          epbcId: users[0].bsi_epbcid,
        });
      } catch (err: any) {
        await disconnect();
        if (err.name === "Credential Mismatch") {
          return res
            .status(401)
            .json({ error: { name: err.name, message: err.message } });
        }
        return res.status(500).json({
          error: {
            name: "Internal Server Error",
            message: err.message,
            stack: err.stack,
          },
        });
      }

    default:
      await disconnect();
      return res.status(405).json({
        error: {
          name: "Not Supported",
          message: `Method ${req.method} is not allowed`,
        },
      });
  }
}

export default withSessionRoute(authenticateRoute);
