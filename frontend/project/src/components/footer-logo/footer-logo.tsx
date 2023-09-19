import SocialLinkList from "../social-link-list/social-link-list";

function FooterLogo(): JSX.Element {
  return (
    <div className="footer__logo-wrapper">
      <a className="footer__logo logo" href="main.html">
        <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
      </a>
      <div className="socials footer__socials">
        <SocialLinkList />
      </div>
    </div>
  );
}

export default FooterLogo;
