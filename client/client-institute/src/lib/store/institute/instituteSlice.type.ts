import { Status } from "@/lib/types/type";

export interface IInstitute {
  instituteName: string;
  instituteEmail: string;
  institutePhoneNumber: string;
  instituteAddress: string;
  institutePanNo: string;
  instituteVatNo: string;
}
export interface IInstituteInitialData {
  institute: IInstitute;
  status: Status;
}
export const iInstituteInitialState: IInstituteInitialData = {
  institute: {
    instituteName: "",
    instituteEmail: "",
    institutePhoneNumber: "",
    instituteAddress: "",
    institutePanNo: "",
    instituteVatNo: "",
  },
  status: Status.LOADING,
};
