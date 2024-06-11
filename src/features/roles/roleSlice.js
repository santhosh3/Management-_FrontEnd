import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3002";

const roleAdapter = createEntityAdapter({});

const initialState = roleAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await axios.get(`${URL}/role`);
  return response.data;
});

export const createRole = createAsyncThunk("roles/addNewRole", async (data) => {
  const response = await axios.post(`${URL}/role`, data);
  return response.data;
});

export const modifyRole = createAsyncThunk(
  "roles/modifyRoles",
  async (modifiedData) => {
    const { id, name, roleId } = modifiedData;
    const response = await axios.put(`${URL}/role/${id}`, { name, roleId });
    return response.data;
  }
);

export const deleteRole = createAsyncThunk("roles/removeRole", async (id) => {
  const response = await axios.delete(`${URL}/role/${id}`);
  return response.data;
});

const roleSlice = createSlice({
  name: "role",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchRoles.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        roleAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        roleAdapter.addOne(state, action.payload);
      })
      .addCase(modifyRole.fulfilled, (state, action) => {
        roleAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        roleAdapter.removeOne(state, action.payload);
      });
  },
});

export const { selectAll: selectAllRoles, selectById: selectRoleById } =
  roleAdapter.getSelectors((state) => state.role);

export const getRoleStatus = (state) => state.role.status;
export const getRoleError = (state) => state.role.error;

export default roleSlice.reducer;
