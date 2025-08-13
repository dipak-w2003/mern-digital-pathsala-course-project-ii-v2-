import { Status } from "@/lib/types/type";

interface IInstituteCourseInitialDataCourse {
  // courseName : string,
  // coursePrice : string,
  // id : string
  id: string;
  courseName: string;
  courseDescription: string;
  coursePrice: string;
  createdAt: Date;
}

export interface IInstituteCourseInitialData {
  status: Status;
  courses: IInstituteCourseInitialDataCourse[];
}

export interface ICoursePostData {
  courseName: string;
  courseDescription: string;
  coursePrice: string;
  courseDuration: string;
  courseThumbnail: File | null;
  categoryId: string;
  courseLevel: string;
}
