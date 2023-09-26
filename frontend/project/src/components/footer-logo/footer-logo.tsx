import { Link } from 'react-router-dom';
import { useGoToMain } from '../../hooks/use-go-to-main/use-go-to-main';
import SocialLinkList from '../social-link-list/social-link-list';

function FooterLogo(): JSX.Element {
  const handleGoToMainClick = useGoToMain();
  return (
    <div className="footer__logo-wrapper">
      <Link to="" className="footer__logo logo" onClick={handleGoToMainClick}>
        <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
      </Link>
      <div className="socials footer__socials">
        <SocialLinkList />
      </div>
    </div>
  );
}

export default FooterLogo;
