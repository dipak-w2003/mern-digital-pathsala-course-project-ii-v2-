import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IInstitute,
  IInstituteInitialData,
  iInstituteInitialState,
} from "./instituteSlice.type";
import { Status } from "@/lib/types/type";
import { UseDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { APIWITHTOKEN } from "@/lib/http";
const instituteSlice = createSlice({
  name: "institute",
  initialState: iInstituteInitialState,
  reducers: {
    setInstitute(
      state: IInstituteInitialData,
      action: PayloadAction<IInstitute>
    ) {
      state.institute = action.payload;
    },
    setStatus(state: IInstituteInitialData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

const { setInstitute, setStatus } = instituteSlice.actions;
export default instituteSlice.reducer;

// custom thunks for API Call

export function createInstitute(data: IInstitute) {
  return async function createInstitute(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("institute", data);
      if (response.status !== 200) return dispatch(setStatus(Status.ERROR));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getInstitute(id: string | number) {
  return async function getInstituteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get(`institute/${id}`);
      const data = response.data;
      if (response.status !== 200) return dispatch(setStatus(Status.ERROR));
      dispatch(setStatus(Status.SUCCESS));
      dispatch(setInstitute(data));
    } catch (error) {
      console.log(error);
    }
  };
}
export function getInstitutes() {
  return async function getInstitutesThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("institute");
      const data = response.data;
      if (response.status !== 200) return dispatch(setStatus(Status.ERROR));
      dispatch(setStatus(Status.SUCCESS));
      dispatch(setInstitute(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteInstitute(id: string | number) {
  return async function deleteInstituteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete(`institute/${id}`);
      if (response.status !== 200) return dispatch(setStatus(Status.ERROR));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateInstitute(data: IInstitute, id: string | number) {
  return async function updateInstituteThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post(`institute/${id}`, data);
      if (response.status !== 200) return dispatch(setStatus(Status.ERROR));
      dispatch(setStatus(Status.SUCCESS));
    } catch (error) {
      console.log(error);
    }
  };
}
