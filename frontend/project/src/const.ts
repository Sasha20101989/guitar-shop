export enum AppRoute {
  Main = '/',
  Login = '/login',
  Register = '/register',
  Room = '/product/:id',
  ProductForm = '/product-form',
  NotFound = '*',
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
