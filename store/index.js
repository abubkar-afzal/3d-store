import { configureStore } from '@reduxjs/toolkit';
import configuratorReducer from './configuratorSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    configurator: configuratorReducer,
    ui: uiReducer,
  },
});