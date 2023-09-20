import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';

export const useGoToAddNewProduct = (): ((event: MouseEvent<HTMLButtonElement>) => void) => {
  const navigate = useNavigate();
  const handleGoToAddNewProduct = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    navigate(AppRoute.AddProduct);
  };
  return handleGoToAddNewProduct;
};
