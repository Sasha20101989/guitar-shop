import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../../types/product';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../../const';

export const fetchProductAction = createAsyncThunk<Product | null, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProduct',
  async (productId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Product>(`${APIRoute.Products}/${productId}`);
    return data;
  },
);

export const fetchProductsAction = createAsyncThunk<Product[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Product[]>(APIRoute.Products);
    return data;
  },
);
