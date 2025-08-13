import { Status } from "@/lib/types/type"

export interface ICategoryAddData {
  categoryName: string,
  categoryDescription: string
}

export interface ICategoryData extends ICategoryAddData {
  createdAt: string
  id: string,
  updatedAt: string
}

export interface ICategoryInitialData {
  data: ICategoryData[],
  status: Status
}


