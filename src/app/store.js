import { configureStore } from '@reduxjs/toolkit';
import { listOfEmployeesReducer } from '../ducks';

export const store = configureStore({
  reducer: {
    listOfEmployees: listOfEmployeesReducer,
  },
});
