import { IronSessionData } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      firstName: string;
      lastName: string;
      email: string;
      _id: string;
      username: string;
    };
  }
}
