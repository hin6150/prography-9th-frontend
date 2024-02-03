import { configureStore } from '@reduxjs/toolkit';
import slice from './slice';

export const store = configureStore({
  reducer: {
    slice: slice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
