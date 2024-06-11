import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3002";

const projectAdapter = createEntityAdapter({});

const initialState = projectAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await axios.get(`${URL}/board`);
    return response.data;
  }
);

export const addNewProjects = createAsyncThunk(
  "projects/addNewProjects",
  async (formData) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(`${URL}/board`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);

export const updateUserToProject = createAsyncThunk(
  "project/userUpdate",
  async ({ projectId, userIds }) => {
    const response = await axios.put(`${URL}/board/${projectId}`, { userIds });
    return response.data.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        projectAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewProjects.fulfilled, (state, action) => {
        projectAdapter.addOne(state, action.payload);
      })
      .addCase(updateUserToProject.fulfilled, (state, action) => {
        console.log(action.payload);
        projectAdapter.upsertOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
} = projectAdapter.getSelectors((state) => state.project);

export const getProjectStatus = (state) => state.project.status;
export const getProjectError = (state) => state.project.error;

export default projectSlice.reducer;
