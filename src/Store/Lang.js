import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  isError: false,
  isAuthenticated: false,
  email: null,
  language: 'eng',
  logindata: null,
  lang: 'Italiano',
  writting: 'Argomentativo',
  tone: 'Autorevole',
  datalang: [],
};

export const logout = createAsyncThunk('auth/logout', async () => {
  return {};
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLanguage: state => {
      state.language = state.language === 'eng' ? 'itl' : 'eng';
    },
    setverified: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setlogindata: (state, action) => {
      console.log('logindata', action.payload);
      state.logindata = action.payload;
    },
    setlogindata: (state, action) => {
      console.log('logindata', action.payload);
      state.logindata = action.payload;
    },
    setlang: (state, action) => {
      console.log('logindata', action.payload);
      state.lang = action.payload;
    },
    settone: (state, action) => {
      console.log('log', action.payload);
      state.tone = action.payload;
    },
    setwritting: (state, action) => {
      console.log('log', action.payload);
      state.writting = action.payload;
    },
    setlogout: state => {
      return initialState;
    },
    setdefault: state => {
      state.writting = 'Argomentativo';
      state.tone = 'Autorevole';
      state.lang = 'Italiano';
    },
  },
});

export const {
  toggleLanguage,
  setverified,
  setlogindata,
  setlang,
  setwritting,
  settone,
  setlogout,
  setdefault,
} = authSlice.actions;

export default authSlice.reducer;
