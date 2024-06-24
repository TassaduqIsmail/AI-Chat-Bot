import {combineReducers} from '@reduxjs/toolkit';
import {authSlice} from './Lang';

const RootReducer = combineReducers({
  auth: authSlice.reducer,
});

export default RootReducer;
