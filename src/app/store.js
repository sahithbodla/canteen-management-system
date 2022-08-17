import { configureStore } from '@reduxjs/toolkit';
import { employee } from '../ducks';

export const store = configureStore({
  reducer: {
    employee,
  },
});
