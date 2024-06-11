import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:3002";

const storyAdapter = createEntityAdapter({});

const initialState = storyAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});

export const fetchStories = createAsyncThunk(
  "story/fetchStories",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${URL}/card/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

const storySlice = createSlice({
  name: "story",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchStories.pending, (state, action) => {
        state.status = "loading";
        storyAdapter.removeMany(state, Object.keys(state.entities));
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = "succeeded";
        storyAdapter.addMany(state, action.payload);
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectAllStories, selectById: selectStoryById } =
  storyAdapter.getSelectors((state) => state.story);

export const getStoryStatus = (state) => state.story.status;
export const getStoryError = (state) => state.story.error;

export default storySlice.reducer;
