import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';

export const useGoToProduct = (): ((event: MouseEvent<HTMLAnchorElement>) => void) => {
  const navigate = useNavigate();
  const handleGoToProduct = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    navigate(AppRoute.ProductForm);
  };
  return handleGoToProduct;
};
