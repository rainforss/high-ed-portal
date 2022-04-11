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
  bsi_description: string;
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
  bsi_SupportingDocument_mshied_program_msh: Array<{
    bsi_name: string;
    "bsi_filetype@OData.Community.Display.V1.FormattedValue": string;
    bsi_requiredfilenameprefix: string;
    bsi_supportingdocumentid: string;
    bsi_isrequired: boolean;
  }>;
}

export interface Application extends Entity {
  bsi_name: string;
  bsi_studentapplicationid: string;
  "bsi_applicationstatus@OData.Community.Display.V1.FormattedValue": string;
  bsi_applicationfeepaid: boolean;
  bsi_applicaitonfeepaymentlink: string;
  bsi_commitmentfeepaid: boolean;
  bsi_commitmentfeepaymentlink: string;
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
    mshied_name: string;
    mshied_programid: string;
    bsi_commitmentfee: number;
  };
  bsi_StudentApplication: {
    bsi_name: string;
    bsi_commitmentfeepaid?: boolean;
    bsi_commitmentfeepaymentlink?: string;
  };
  bsi_AcademicPeriod: AcademicPeriod;
  bsi_expirationdate: string;
  bsi_offerstatus: number;
  "bsi_offerstatus@OData.Community.Display.V1.FormattedValue": string;
}

export interface Appointment {
  subject: string;
  activityid: string;
  location: string;
  scheduledstart: Date;
  scheduledend: Date;
  description: string;
  "prioritycode@OData.Community.Display.V1.FormattedValue": string;
  prioritycode: number;
}

export interface CourseHistory {
  mshied_name: string;
  mshied_coursehistoryid: string;
  mshied_creditsattempted: number;
  mshied_CourseId: {
    mshied_courseid: string;
    mshied_name: string;
  };
  mshied_CourseSectionId: {
    mshied_coursesectionid: string;
    bsi_coursenumber: string;
  };
  mshied_AcademicPeriodDetailsId: AcademicPeriod;
  mshied_RegistrationStatusId: {
    mshied_registrationstatusid: string;
    mshied_name: string;
  };
}

export interface ProgramHistory {
  bsi_programhistoryid: string;
  bsi_programhistorystatus: number;
  "bsi_programhistorystatus@OData.Community.Display.V1.FormattedValue": string;
  bsi_gpa: number;
  bsi_Program: {
    mshied_name: string;
    mshied_programid: string;
  };
  bsi_StartAcademicPeriod: AcademicPeriod;
}

export interface Task {
  activityid: string;
  subject: string;
  scheduledstart: Date;
  scheduledend: Date;
  description: string;
  "prioritycode@OData.Community.Display.V1.FormattedValue": string;
  prioritycode: number;
}
