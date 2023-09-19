import HeaderNavigationList from "../header-navigation-list/header-navigation-list";

type HeaderProps = {
  isLoginScreen?: boolean;
}

function Header({isLoginScreen}: HeaderProps): JSX.Element {
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  // const offers: Offer[] = useAppSelector(getOffers);
  // const favoriteOffers: Offer[] = offers.filter((offer) => offer.isFavorite);
  // const email = useAppSelector(getUserEmail);
  // const avatarUrl = useAppSelector(getUserAvatarUrl);
  // const isLoggedIn = useIsLoggedIn(AuthorizationStatus.Auth);

  // const handleFavoritesClick: MouseEventHandler<HTMLAnchorElement> = (evt) => {
  //   evt.preventDefault();
  //   navigate(AppRoute.Favorites);
  // };

  // const handleLogout: MouseEventHandler<HTMLAnchorElement> = () => {
  //   dispatch(logoutAction());
  // };

  // const handleLogin: MouseEventHandler<HTMLAnchorElement> = (evt) => {
  //   evt.preventDefault();
  //   navigate(AppRoute.Login);
  // };

  return (
    <header className="header" id="header">
      <div className="container">
        <div className="header__wrapper"><a className="header__logo logo" href="main.html"><img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/></a>
          <HeaderNavigationList/>
          <div className="header__container"><span className="header__user-name">Имя</span>
            <a className="header__link" href="login.html" aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
