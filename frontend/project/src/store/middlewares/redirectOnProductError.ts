import { Action, Middleware } from '@reduxjs/toolkit';
import { fetchProductAction } from '../api-actions/products-api-actions/products-api-actions';
import { AppRoute } from '../../const';
import browserHistory from '../../browser-history';

export const redirectOnOfferError: Middleware = () => (next) => (action: Action) => {
  if (fetchProductAction.rejected.match(action)) {
    next(action);
    browserHistory.replace(AppRoute.NotFound);
  }

  return next(action);
};
