import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logUser: {
      reducer(state,action) {
        state.user = action.payload;
      },
    },
  },
});

export const { logUser } = loginSlice.actions;
export const Loginuser = (state) => state.login.user;
export default loginSlice.reducer;
