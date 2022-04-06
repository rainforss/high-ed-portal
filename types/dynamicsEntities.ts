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

export interface Program extends Entity {
  mshied_name: string;
  mshied_programid: string;
  mshied_code: string;
  bsi_interviewrequired: boolean | null;
  bsi_applicationfee: number;
  bsi_commitmentfee: number;
  bsi_iscontinuingeducation: boolean;
  bsi_islanguageprogram: boolean;
  mshied_ProgramRequirement_Programid_mshie: Array<{
    mshied_name: string;
    mshied_programrequirementid: string;
    mshied_isrequired: boolean | null;
  }>;
}

export interface Application extends Entity {
  bsi_name: string;
  bsi_studentapplicationid: string;
  "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue": string;
  bsi_applicationfeepaid: boolean;
  bsi_commitmentfeepaid: boolean;
  bsi_packagecomplete: boolean;
  bsi_missingdocuments: string;
  bsi_Program: {
    mshied_name: string;
    mshied_programid: string;
  };
  bsi_DestinedProgram: {
    mshied_name: string;
    mshied_programid: string;
  };
  bsi_AcademicPeriod: AcademicPeriod;
  bsi_ProgramLevel: ProgramLevel;
  bsi_PrerequisiteProgram: {
    mshied_name: string;
    mshied_programid: string;
  };
}

export class ApplicationDTO implements Entity {
  [propName: string]: unknown;
  "bsi_name": string = "";
  "bsi_Applicant@odata.bind": string = "";
  "bsi_AcademicPeriod@odata.bind": string = "";
  "bsi_Program@odata.bind": string = "";
  "bsi_DestinedProgram@odata.bind": string = "";
  "bsi_applicationstatus": number = 494280000;
}

export interface AcademicPeriod {
  mshied_name: string;
  mshied_academicperiodid: string;
}

export interface ProgramLevel {
  mshied_name: string;
  mshied_programlevelid: string;
}

export interface Offer {
  bsi_name: string;
  bsi_offerid: string;
  bsi_Program: {
    mshied_name: string;
    mshied_programid: string;
  };
  bsi_PrerequisiteProgram: {
    bsi_name: string;
    mshied_programid: string;
  };
  bsi_AcademicPeriod: AcademicPeriod;
  bsi_expirationdate: string;
  bsi_offerstatus: number;
  "bsi_offerstatus@OData.Community.Display.V1.FormattedValue": string;
}
