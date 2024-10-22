import { configureStore } from '@reduxjs/toolkit';
import coachReducer from "./slices/coachSlice";
import subsReducer from "./slices/subsSlice";
import commentsReducer from "./slices/commentSlice";
import locationsReducer from "./slices/locationSlice";

export const store = configureStore({
  reducer: {
    coaches: coachReducer,
    subs: subsReducer,
    comments: commentsReducer,
    locations: locationsReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;