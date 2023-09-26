import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';

export const useGoToUpdateProduct = (id: string): ((event: MouseEvent<HTMLAnchorElement>) => void) => {
  const navigate = useNavigate();
  const handleGoToUpdateProduct = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    navigate(`/products/edit/${id}`);
  };
  return handleGoToUpdateProduct;
};
