import { GuitarType } from "./types/guitar-type";
import { Product } from "./types/product.js";
import { StringCount } from "./types/string-count";


export enum AppRoute {
  Main = '/',
  Login = '/login',
  Register = '/register',
  ProductForm = '/product/:id',
  NotFound = '*',
  EditProduct = "/products/edit/:id",
  AddProduct = "/product/add",
  Logout = "/logout"
}


export enum APIRoute {
  Products = '/products',
  Login = '/users/login',
  Register = '/users/register',
  Logout = '/users/logout'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NameSpace {
  Data = 'data',
  Main = 'main',
  User = 'user',
}

export enum SortingOption {
  Price= 'price',
  Date= 'date',
}

export enum SortingOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export const sortProducts = (filteredProducts: Product[], sortBy: SortingOption, sortOrder: SortingOrder) =>{
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let result = 0;

    if (sortBy === SortingOption.Price) {
      result = sortOrder === SortingOrder.Asc
        ? a.price - b.price
        : b.price - a.price;
    } else if (sortBy === SortingOption.Date) {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      result = sortOrder === SortingOrder.Asc ? dateA - dateB : dateB - dateA;
    }

    return result;
  });

  return sortedProducts;
};

export const filterProducts = (
  products: Product[],
  stringFilters: Record<StringCount, boolean>,
  typeFilters: Record<GuitarType, boolean>
): Product[] => {
  return products.filter((product) => {
    const stringCountFilter = Object.entries(stringFilters).some(([stringCount, isSelected]) => {
      if (isSelected && product.numberOfStrings === stringCount) {
        return true;
      }
      return false;
    });

    const typeFilter = Object.entries(typeFilters).some(([type, isSelected]) => {
      if (isSelected && product.type === type) {
        return true;
      }
      return false;
    });

    if (stringCountFilter || typeFilter) {
      return true;
    }

    return false;
  });
};

export const RING_LOADER_COLOR = '#123abc';

export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
  return regex.test(password);
};

export const isAuthorization = (status: AuthorizationStatus) =>
  status === AuthorizationStatus.Auth;

export const isAuthorizationUnknown = (status: AuthorizationStatus) =>
  status === AuthorizationStatus.Unknown;

