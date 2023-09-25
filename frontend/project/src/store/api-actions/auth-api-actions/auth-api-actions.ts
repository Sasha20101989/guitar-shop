import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserData } from '../../../types/user-data';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { dropToken, saveToken } from '../../../services/token';
import { RegisterData } from '../../../types/register-data';

class UserDto {
  public email!: string;
}

class CreateUserDto {
  public email!: string;
  public name!: string;
  public password!: string;
}

export const checkAuthAction = createAsyncThunk<UserDto, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const response = await api.get<UserDto>(APIRoute.Login);
    return response.data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const result = await api.post<UserData>(APIRoute.Login, {email, password});
    if (result.data.token) {
      saveToken(result.data.token);
    }
    dispatch(checkAuthAction());
    return result.data;
  },
);

export const registerAction = createAsyncThunk<CreateUserDto, RegisterData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/register',
  async ({login: email, password, name}, {dispatch, extra: api}) => {
    const {data} = await api.post<CreateUserDto>(APIRoute.Register, {email, password, name});
    //dispatch(checkAuthAction());
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
