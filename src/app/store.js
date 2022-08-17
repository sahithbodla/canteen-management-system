import { configureStore } from '@reduxjs/toolkit';
import { employee, menu } from '../ducks';

export const store = configureStore({
  reducer: {
    employee,
    menu,
  },
});
