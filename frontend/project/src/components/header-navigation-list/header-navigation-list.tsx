import { useGoToMain } from "../../hooks/use-go-to-main/use-go-to-main";

function HeaderNavigationList(): JSX.Element {
  const handleGoToMainClick = useGoToMain();
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item"><a className="link main-nav__link" onClick={handleGoToMainClick}>Каталог</a>
        </li>
        <li className="main-nav__item"><a className="link main-nav__link" href="#">Где купить?</a>
        </li>
        <li className="main-nav__item"><a className="link main-nav__link" href="#">О компании</a>
        </li>
      </ul>
      </nav>
  );
}
export default HeaderNavigationList;
