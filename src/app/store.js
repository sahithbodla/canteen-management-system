import { configureStore } from '@reduxjs/toolkit';
import { employee, menu, transactions } from '../ducks';

export const store = configureStore({
  reducer: {
    employee,
    menu,
    transactions,
  },
});
