import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user-data';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { dropToken, saveToken } from '../../../services/token';
import { RegisterData } from '../../../types/register-data';
import { CustomError, errorHandle } from '../../../services/error-handler';
import { setAuthorizationStatus } from '../../user-process/user-process.slice';

class UserDto {
  public email!: string;
}

class CreateUserDto {
  public email!: string;
  public name!: string;
  public password!: string;
}

export const checkAuthAction = createAsyncThunk<void, undefined,
{
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try{
      const response = await api.get<UserDto>(APIRoute.Login);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch(error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      errorHandle(error as CustomError);
    }
  }
);

export const loginAction = createAsyncThunk<UserData | undefined, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    try {
      const result = await api.post<UserData>(APIRoute.Login, { email, password });

      if (result.data.token) {
        saveToken(result.data.token);
      }

      dispatch(checkAuthAction());
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      return result.data;
    } catch (error) {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      errorHandle(error as CustomError);
      return undefined;
    }
  }
);

export const registerAction = createAsyncThunk<CreateUserDto | undefined, RegisterData,
{
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async ({ login: email, password, name }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<CreateUserDto>(APIRoute.Register, { email, password, name });
      dispatch(loginAction({login: data.email, password}));
      return data;
    } catch (error) {
      errorHandle(error as CustomError);
      return undefined;
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.post(APIRoute.Logout);
    dropToken();
  },
);
