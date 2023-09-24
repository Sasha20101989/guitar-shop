import { NameSpace } from '../../const';
import { Product } from '../../types/product.js';
import { State } from '../../types/state';

export const getProducts = (state: State): Product[] => state[NameSpace.Data].products;
export const getProduct = (state: State): Product | null => state[NameSpace.Data].selectedProduct;
export const isDataLoading = (state: State): boolean => state[NameSpace.Data].isDataLoading;
export const getSubmittingStatus = (state: State): boolean => state[NameSpace.Data].isSubmitting;
export const getSubmittingSuccessStatus = (state: State): boolean => state[NameSpace.Data].isSubmittingSuccess;
