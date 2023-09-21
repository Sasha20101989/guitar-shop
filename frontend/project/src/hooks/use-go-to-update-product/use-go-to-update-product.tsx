import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';

export const useGoToUpdateProduct = (id: string): ((event: MouseEvent<HTMLAnchorElement>) => void) => {
  const navigate = useNavigate();
  const handleGoToUpdateProduct = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    navigate(`/product/edit/${id}`);
  };
  return handleGoToUpdateProduct;
};
