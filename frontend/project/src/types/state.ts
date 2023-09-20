import {store} from '../store/index.js';
import { Product } from './product.js';

export type UserState = {
  authorizationStatus: string;
  email: string | undefined;
  userId: number | null;
  isSubmitting: boolean;
}

export type MainState = {
  sortingOrderMethod: string;
  sortingMethod: string;
}

export type DataState = {
  products: Product[];
  selectedProduct: Product | null;
  isDataLoading: boolean;
  isSubmitting: boolean;
  isSubmittingSuccess: boolean;
}

export type AppState = {
  main: MainState;
  data: DataState;
  user: UserState;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;