import {configureStore} from '@reduxjs/toolkit';
import {authSlice} from './Lang';
import RootReducer from './Reducers';

export const store = configureStore({
  reducer: RootReducer,
});
