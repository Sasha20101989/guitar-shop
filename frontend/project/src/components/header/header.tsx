import { MouseEvent } from 'react';
import { AuthorizationStatus } from '../../const';
import { useGoToLogin } from '../../hooks/use-go-to-login/use-go-to-login';
import { useGoToMain } from '../../hooks/use-go-to-main/use-go-to-main';
import { useIsLoggedIn } from '../../hooks/use-is-logged-in/use-is-logged-in';
import HeaderNavigationList from '../header-navigation-list/header-navigation-list';
import { useAppDispatch } from '../../hooks/index';
import { logoutAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';
import { Link } from 'react-router-dom';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleGoToLoginClick = useGoToLogin();
  const handleGoToMainClick = useGoToMain();

  const isLoggedIn = useIsLoggedIn(AuthorizationStatus.Auth);

  const handleLogout = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const handleLinkClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    if (!isLoggedIn) {
      handleGoToLoginClick(evt);
    } else {
      handleLogout(evt);
    }
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper"><Link to="" className="header__logo logo" onClick={handleGoToMainClick}><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/></Link>
          <HeaderNavigationList/>
          <div className="header__container"><span className="header__user-name">Имя</span>
            <Link to="" className="header__link" onClick={handleLinkClick} style={{ cursor: 'pointer' }} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              {!isLoggedIn ? ( <span className="header__link-text">Вход</span>) : ( <span className="header__link-text">Выход</span>)}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
