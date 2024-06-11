import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";


const URL = "http://localhost:3002";

const taskAdapter = createEntityAdapter({});

const initialState = taskAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${URL}/task`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
});

export const createTaskFetch = createAsyncThunk(
  "tasks/createTasks",
  async (formData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${URL}/task`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

export const editTaskFetch = createAsyncThunk(
  "tasks/editTask",
  async (id, formData) => {
    const token = localStorage.getItem('token')
    const response = await axios.put(`${URL}/task/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

export const deleteTaskById = createAsyncThunk(
  "tasks/deleteTask",
  async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${URL}/task/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        taskAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTaskFetch.fulfilled, (state, action) => {
        taskAdapter.addOne(state, action.payload);
      })
      .addCase(editTaskFetch.fulfilled, (state, action) => {
        taskAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteTaskById.fulfilled, (state, action) => {
        const { id } = action.payload;
        taskAdapter.removeOne(state, id);
      });
  },
});

export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  taskAdapter.getSelectors((state) => state.task);

export const getTaskStatus = (state) => state.task.status;
export const getTaskError = (state) => state.task.error;

export default taskSlice.reducer;
