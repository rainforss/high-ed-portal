import { ClientCredentialRequest } from "@azure/msal-node";
import { NextApiRequest, NextApiResponse } from "next";
import { dynamicsContact } from "../../../services/dynamicsContact";
import { instantiateCca } from "../../../utils/cca";
import bcrypt from "bcrypt";
import { withSessionRoute } from "../../../utils/withSession";

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  // await connect();
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

  const { user } = req.body;

  const users = await dynamicsContact(
    tokenResponse.accessToken
  ).getByUsernameOrEmail(user.username, user.email);

  try {
    if (users && users.length > 0) {
      const error = new Error("Bad Request");
      (error.name = "Duplicate account"),
        (error.message =
          "Bad request. Username or email address already taken, please try another one.");
      throw error;
    }

    user.password = await bcrypt.hash(user.password, 2);

    const createdUser = await dynamicsContact(
      tokenResponse.accessToken
    ).createUser(user);

    req.session.user = {
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.emailaddress1,
      _id: user.contactid,
      username: user.bsi_username,
    };

    await req.session.save();

    // await disconnect();
    return res.status(200).json({
      _id: createdUser.contactid,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      username: user.username,
    });
  } catch (err: any) {
    // await disconnect();
    if (err.name === "Duplicate Account") {
      return res
        .status(400)
        .json({ error: { name: err.name, message: err.message } });
    }
    if (err.name === "Server Error") {
      return res.status(500).json({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    }
    return res.status(500).json({
      error: { name: "Internal Server Error", message: err.message },
    });
  }
}

export default withSessionRoute(registerRoute);
