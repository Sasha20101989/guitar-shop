import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserState } from '../../types/state';
import { loginAction, logoutAction, registerAction } from '../api-actions/auth-api-actions/auth-api-actions';

export const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isSubmitting: false,
};

export const userProcess = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setIsSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(loginAction.fulfilled, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(loginAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(registerAction.pending, (state, _action) => {
        state.isSubmitting = true;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isSubmitting = false;
      })
      .addCase(registerAction.rejected, (state, _action) => {
        state.isSubmitting = false;
      })
      .addCase(logoutAction.fulfilled, (state, _action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const {
  setIsSubmitting,
  setAuthorizationStatus
} = userProcess.actions;
