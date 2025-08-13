import { Status } from "@/lib/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IToken {
  token: string | number | boolean | any;
}
export interface IItokenInitialData {
  token: IToken;
  status: Status;
}
const IItokenInitialState: IItokenInitialData = {
  token: { token: "" },
  status: Status.LOADING,
};

export const storeTokenLocalStorage = (
  key: "token",
  value: IItokenInitialData
): void => {
  localStorage.setItem(`${key}`, JSON.stringify(value));
};

const retrievedTokenLocalStorage = (
  key: "token" | "auth"
): IItokenInitialData => {
  try {
    const storedData = localStorage.getItem("token");
    return storedData
      ? JSON.parse(storedData)
      : {
          token: { token: "" },
          status: Status.SUCCESS,
        };
  } catch (error) {
    console.log(error);
    return IItokenInitialState;
  }
};

export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState: retrievedTokenLocalStorage("token"),
  reducers: {
    setToken(state: IItokenInitialData, action: PayloadAction<IToken>) {
      state.token = action.payload;
    },
    setStatus(state: IItokenInitialData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setToken, setStatus } = tokenSlice.actions;
export default tokenSlice;

