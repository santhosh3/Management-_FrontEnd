import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3002";

const userAdapter = createEntityAdapter({});

const initialState = userAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${URL}/user`);
  console.log(response.data);
  return response.data;
});

export const createUser = createAsyncThunk(
  "users/addUsers",
  async (formData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${URL}/user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateProjectToUser = createAsyncThunk(
  "users/projectUpdate",
  async ({ userId, projects }) => {
    const response = await axios.put(`${URL}/user/project/${userId}`, {
      projects,
    });
    return response.data.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await axios.delete(`${URL}/user/${id}`);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        userAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        userAdapter.addOne(state, action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        userAdapter.removeOne(state, action.payload);
      })
      .addCase(updateProjectToUser.fulfilled, (state, action) => {
        userAdapter.upsertOne(state, action.payload);
      });
  },
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  userAdapter.getSelectors((state) => state.user);

export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;

export default userSlice.reducer;
