import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../../types/product';
import { AppDispatch, State } from '../../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, HTTP_CODE } from '../../../const';
import { redirectToRoute } from '../../action';
import { ProductData } from '../../../types/product-data';
import { CustomError, errorHandle } from '../../../services/error-handler';
import { adaptAddProductToServer, adaptEditProductToServer, adaptImageToServer } from '../../../utils/adapters/adapters-to-server';
import UpdateProductDto from '../../../dto/update-product.dto';
import CreateProductDto from '../../../dto/create-product.dto';

export const fetchProductAction = createAsyncThunk<Product | null, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProduct',
  async (productId: string, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Product>(`${APIRoute.Products}/${productId}`);
      return data;
    } catch (error) {
      errorHandle(error as CustomError);
      return null;
    }
  },
);

export const fetchProductsAction = createAsyncThunk<Product[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchProducts',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Product[]>(APIRoute.Products);
      return data;
    } catch (error) {
      errorHandle(error as CustomError);
      return [];
    }
  },
);

export const postProductAction = createAsyncThunk<CreateProductDto | undefined, ProductData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postProduct',
  async (productData, { dispatch, extra: api }) => {
    try {
      const response = await api.post<CreateProductDto>(`${APIRoute.Products}/`, adaptAddProductToServer(productData));
      return response.data;
    } catch (error) {
      errorHandle(error as CustomError);
      return undefined;
    }
  }
);

export const removeProductAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/removeProduct',
  async (productId, {dispatch, extra: api}) => {
    await api.delete<Product>(`${APIRoute.Products}/${productId}`);
    await dispatch(fetchProductsAction());
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const editProductAction = createAsyncThunk<
  void,
  Product,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/editProduct',
  async (productData, {dispatch, extra: api}) => {
    try {
      const postData = await api.put<UpdateProductDto>(`${APIRoute.Products}/${productData.id}`, adaptEditProductToServer(productData));

      if (postData.status === HTTP_CODE.OK && productData.image) {
        const postImageApiRoute = `${APIRoute.Products}/${productData.id}/image`;
        await api.post(postImageApiRoute, adaptImageToServer(productData.image), {
          headers: {'Content-Type': 'multipart/form-data'},
        });
      }

      await dispatch(fetchProductsAction());
      dispatch(redirectToRoute(`${AppRoute.EditProduct}/${productData.id}`));
    } catch (error) {
      errorHandle(error as CustomError);
    }
  },
);
