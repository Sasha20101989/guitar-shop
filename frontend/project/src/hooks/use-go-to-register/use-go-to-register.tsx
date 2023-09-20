import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MouseEvent } from 'react';

export const useGoToRegister = (): ((event: MouseEvent<HTMLAnchorElement>) => void) => {
  const navigate = useNavigate();
  const handleGoRegisterClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    navigate(AppRoute.Register);
  };
  return handleGoRegisterClick;
};
