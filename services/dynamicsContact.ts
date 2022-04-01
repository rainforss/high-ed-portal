import {
  WebApiConfig,
  retrieveMultiple,
  createWithReturnData,
} from "dataverse-webapi/lib/node";
import { Contact, User } from "../types/dynamicsEntities";

export const dynamicsContact = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getByUsername: async (username: string) => {
      const contact = await retrieveMultiple(
        config,
        "contacts",
        `$filter=statecode eq 0 and bsi_username eq '${username}'`
      );

      return contact.value as Contact[];
    },

    getByUsernameOrEmail: async (username: string, email: string) => {
      const contact = await retrieveMultiple(
        config,
        "contacts",
        `$filter=statecode eq 0 and (bsi_username eq '${username}' or emailaddress1 eq '${email}')`
      );

      return contact.value as Contact[];
    },

    createUser: async (user: User) => {
      const createdUser = await createWithReturnData(
        config,
        "contacts",
        {
          bsi_username: user.username,
          bsi_password: user.password,
          bsi_epbcid: user.epbcId,
          firstname: user.firstName,
          lastname: user.lastName,
          emailaddress1: user.email,
        },
        "$select=contactid"
      );

      return createdUser;
    },
  };
};
