import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';

export const useGoToMain = (): ((event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => void) => {
  const navigate = useNavigate();
  const handleGoMainClick = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>): void => {
    navigate(AppRoute.Main);
  };
  return handleGoMainClick;
};
