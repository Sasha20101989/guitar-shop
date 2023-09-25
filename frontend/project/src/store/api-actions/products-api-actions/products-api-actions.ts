import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../../types/product';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../../const';
import { GuitarType } from '../../../types/guitar-type';
import { StringCount } from '../../../types/string-count';

export default class CreateProductDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public createdAt!: Date;

  public image!: string;

  public type!: GuitarType;

  public article!: string;

  public numberOfStrings!: StringCount;

  public price!: number;
}


export const fetchProductAction = createAsyncThunk<Product | null, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProduct',
  async (productId: string, {dispatch, extra: api}) => {
    const {data} = await api.put<Product>(`${APIRoute.Products}/${productId}`);
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

export const postProductAction = createAsyncThunk<Product, CreateProductDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postProduct',
  async (productData, { dispatch, extra: api }) => {
    const response = await api.post<Product>(`${APIRoute.Products}/${productData.id}`, productData);
    return response.data;
  }
);
