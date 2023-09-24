export enum AppRoute {
  Main = '/',
  Login = '/login',
  Register = '/register',
  ProductForm = '/product/:id',
  NotFound = '*',
  EditProduct = "/product/edit/:id",
  AddProduct = "/product/add"
}

export enum APIRoute {
  Products = '/products',
  Login = '/login',
  Register = '/register',
  Logout = '/logout'
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
