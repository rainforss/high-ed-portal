import { Entity } from "dataverse-webapi/lib/node";

export interface Contact extends Entity {
  contactid: string;
  firstname: string;
  lastname: string;
  emailaddress1: string;
  bsi_username: string;
  bsi_password: string;
  bsi_epbcid: string;
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  epbcId: string;
};

export type CurrentUser = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  _id: string;
};
