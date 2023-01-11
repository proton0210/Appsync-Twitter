import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    user: '',
    signUpStep: 0
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = '';
    },
    setSignUpStep: (state, action) => {
      state.signUpStep = action.payload;
    }
  }
});

export const { login, logout, setSignUpStep } = AuthSlice.actions;
export default AuthSlice.reducer;
