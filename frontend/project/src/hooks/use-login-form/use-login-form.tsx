import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '..';
import { AppRoute, AuthorizationStatus, isValidPassword } from '../../const';
import { loginAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';
import { toast } from 'react-toastify';
import { useIsLoggedIn } from '../use-is-logged-in/use-is-logged-in';
import { useGoToMain } from '../use-go-to-main/use-go-to-main';

type AuthData = {
  login: string;
  password: string;
}

function useLoginForm(){
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isLoggedIn = useIsLoggedIn(AuthorizationStatus.Auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(AppRoute.Main);
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = (authData: AuthData) => {
    if (!isValidPassword(authData.password)) {
      toast.warn('Password must contain at least one letter and one number.');
      return;
    }
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const handleGoMainClick = useGoToMain();

  return {
    loginRef,
    passwordRef,
    handleSubmit,
    handleGoMainClick
  };
}

export default useLoginForm;
