import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Subs } from "../../helpers/types/subs";

export const fetchSubscriptions = createAsyncThunk<Subs[]>(
  'subscriptions/fetchSubscriptions',
  async () => {
    const response = await fetch('/api/subscriptions/subscriptions.json');
    if (!response.ok) {
      throw new Error('Failed to fetch subscriptions');
    }
    const data = await response.json();
    return data.subscriptions;
  }
);

export interface SubscriptionsState {
  subscriptions: Subs[];
  status: string;
  error: string | null;
}

const initialState: SubscriptionsState = {
  subscriptions: [],
  status: 'idle',
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default subscriptionSlice.reducer;
