import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Location } from "../../helpers/types/location";

interface LocationState {
  locations: Location[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LocationState = {
  locations: [],
  status: 'idle',
  error: null,
};

export const fetchLocations = createAsyncThunk<Location[]>(
  'locations/fetchLocations',
  async () => {
    const response = await fetch('/api/locations/locations.json');
    const data = await response.json();
    return data.locations;
  }
);

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default locationSlice.reducer;
