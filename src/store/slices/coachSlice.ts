import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Coach } from "../../helpers/types/coach";

export const fetchCoaches = createAsyncThunk<Coach[]>(
  'coaches/fetchCoaches',
  async () => {
    const response = await fetch('/api/coaches/coaches.json');
    const data = await response.json();
    return data as Coach[];
  }
);

export interface CoachesState {
  coaches: Coach[];
  status: string;
  error: string | null;
}

const initialState: CoachesState = {
  coaches: [],  
  status: 'idle',
  error: null
};

const coachSlice = createSlice({
  name: 'coaches',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoaches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoaches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coaches = action.payload;
      })
      .addCase(fetchCoaches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  }
});

export default coachSlice.reducer;
