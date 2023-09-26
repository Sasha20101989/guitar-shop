import { Link } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../hooks/index';
import { useGoToRegister } from '../../hooks/use-go-to-register/use-go-to-register';
import useLoginForm from '../../hooks/use-login-form/use-login-form';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';


function LoginScreen() : JSX.Element {
  const handleGoToRegisterClick = useGoToRegister();
  const { loginRef, passwordRef, handleSubmit } = useLoginForm();
  const isSubmitting = useAppSelector(getSubmittingStatus);
  return(
    <Layout>
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">Hовый пользователь? <Link to="" className="login__link" onClick={handleGoToRegisterClick} style={{ cursor: 'pointer' }}>Зарегистрируйтесь</Link> прямо сейчас</p>
        <form method="post" action="" onSubmit={handleSubmit}>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input type="email" id="email" ref={loginRef} name="email" autoComplete="off" required/>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="passwordLogin">Введите пароль</label>
            <span>
              <input type="password" ref={passwordRef} placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" required/>
              <button className="input-login__button-eye" type="button">
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button>
            </span>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <button className="button login__button button--medium" type="submit" disabled={isSubmitting}>Войти</button>
        </form>
      </section>
    </Layout>
  );
}
export default LoginScreen;
