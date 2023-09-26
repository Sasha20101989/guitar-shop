import { Link } from 'react-router-dom';
import { useGoToMain } from '../../hooks/use-go-to-main/use-go-to-main';

function HeaderNavigationList(): JSX.Element {
  const handleGoToMainClick = useGoToMain();
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item"><Link to="" className="link main-nav__link" onClick={handleGoToMainClick}>Каталог</Link></li>
        <li className="main-nav__item"><Link to="#" className="link main-nav__link">Где купить?</Link></li>
        <li className="main-nav__item"><Link to="#" className="link main-nav__link">О компании</Link></li>
      </ul>
    </nav>
  );
}
export default HeaderNavigationList;
