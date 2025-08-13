import { Status } from "@/lib/global/types/global-type";
export interface IAuthData {
  teacherToken: string;
  teacherInstituteNumber: string;
  teacherEmail: string;
}
export interface IAuthLoginData extends IAuthData {
  password: string;
}
export interface IAuthInititialData {
  status: Status;
  authData: IAuthData | null;
}
