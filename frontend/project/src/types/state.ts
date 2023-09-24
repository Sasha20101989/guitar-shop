import {store} from '../store/index.js';
import { GuitarType } from './guitar-type.js';
import { Product } from './product.js';
import { StringCount } from './string-count.js';

export type UserState = {
  authorizationStatus: string;
  email: string | undefined;
  userId: number | null;
  isSubmitting: boolean;
}

export type MainState = {
  sortingOrderMethod: string;
  sortingMethod: string;
  stringFilters: Record<StringCount, boolean>;
  typeFilters: Record<GuitarType, boolean>;
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
