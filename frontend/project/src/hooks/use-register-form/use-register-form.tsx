import { FormEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '..';
import { AppRoute, AuthorizationStatus, isValidPassword } from '../../const';
import { loginAction, registerAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';
import { toast } from 'react-toastify';
import { useIsLoggedIn } from '../use-is-logged-in/use-is-logged-in';
import { useGoToMain } from '../use-go-to-main/use-go-to-main';
import { RegisterData } from '../../types/register-data';

type AuthData = {
  name: string;
  email: string;
  password: string;
}

function useRegisterForm(){
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (authData: RegisterData) => {
    if (!isValidPassword(authData.password)) {
      toast.warn('Password must contain at least one letter and one number.');
      return;
    }
    dispatch(registerAction(authData));
    navigate(AppRoute.Login)
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (nameRef.current !== null && passwordRef.current !== null && emailRef.current !== null) {
      onSubmit({
        name: nameRef.current.value,
        login: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const handleGoMainClick = useGoToMain();

  return {
    nameRef,
    emailRef,
    passwordRef,
    handleSubmit,
    handleGoMainClick
  };
}

export default useRegisterForm;
