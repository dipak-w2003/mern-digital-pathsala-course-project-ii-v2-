import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthData, IAuthInititialData, IAuthLoginData } from "./auth-type";
import { Status } from "@/lib/global/types/global-type";
import teacherApi from "@/lib/global/http/api";
import { AppDispatch } from "../store";
const initialState: IAuthInititialData = {
  authData: null,
  status: Status.LOADING,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    setStatus(state: IAuthInititialData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setAuthData(state: IAuthInititialData, action: PayloadAction<IAuthData>) {
      state.authData = action.payload;
    },
  },
});
export const { setAuthData, setStatus } = authSlice.actions;
export default authSlice.reducer;

/** @Thunks */
export function teacherLogin(data: IAuthLoginData) {
  return async function teacherLoginThink(dispatch: AppDispatch) {
    try {
      const response = await teacherApi.post("/login", data);
      if (response.status === 201) {
        setStatus(Status.SUCCESS);
        response.data.data && dispatch(setAuthData(response.data.data));
      } else {
        setStatus(Status.ERROR);
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
