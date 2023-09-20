export enum AppRoute {
  Main = '/',
  Login = '/login',
  Register = '/register',
  ProductForm = '/product-form',
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
