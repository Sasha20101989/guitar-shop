import { Product } from './../../types/product';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DataState } from '../../types/state';
import { fetchProductAction, fetchProductsAction, removeProductAction } from '../api-actions/products-api-actions/products-api-actions';

export const initialState: DataState = {
  products: [],
  isDataLoading: false,
  selectedProduct: null,
  isSubmitting: false,
  isSubmittingSuccess: false,
};

export const mainData = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setProductsDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
    loadProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    resetSubmittingSuccessStatus: (state, action: PayloadAction<boolean>) => {
      state.isSubmittingSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchProductsAction.rejected, (state, action) => {
        state.isDataLoading = false;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchProductAction.rejected, (state, action) => {
        state.selectedProduct = null;
        state.isDataLoading = false;
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(removeProductAction.fulfilled, (state, action) => {
        state.selectedProduct = null;
        state.isDataLoading = false;
      })
      .addCase(removeProductAction.rejected, (state, action) => {
        state.isDataLoading = false;
      })
      .addCase(removeProductAction.pending, (state) => {
        state.isDataLoading = true;
      });
  },
});

export const {
  loadProducts,
  setProductsDataLoadingStatus,
  loadProduct,
  resetSubmittingSuccessStatus
} = mainData.actions;
