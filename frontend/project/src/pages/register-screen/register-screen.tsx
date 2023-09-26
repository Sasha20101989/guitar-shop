import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../hooks/index';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';

function RegisterScreen() : JSX.Element {
  const isSubmitting = useAppSelector(getSubmittingStatus);
  const { nameRef, emailRef, passwordRef, handleSubmit } = useRegisterForm();
  return(
    <Layout>
      <section className="login">
        <h1 className="login__title">Регистрация</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="input-login">
            <label htmlFor="name">Введите имя</label>
            <input ref={nameRef} type="text" id="name" name="name" autoComplete="off" required/>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input type="email" ref={emailRef} id="email" name="email" autoComplete="off" required/>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="password">Придумайте пароль</label>
            <span>
              <input type="password" ref={passwordRef} placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" required/>
              <button className="input-login__button-eye" type="button">
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button>
            </span>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <button className="button login__button button--medium" type="submit" disabled={isSubmitting}>Зарегистрироваться</button>
        </form>
      </section>
    </Layout>
  );
}
export default RegisterScreen;
