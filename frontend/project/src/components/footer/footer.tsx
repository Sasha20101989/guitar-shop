import FooterAbout from "../footer-about/footer-about";
import FooterContacts from "../footer-contacts/footer-contacts";
import FooterLinkList from "../footer-link-list/footer-link-list";
import FooterLogo from "../footer-logo/footer-logo";

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <FooterLogo/>
          <FooterAbout/>
          <FooterLinkList/>
          <FooterContacts/>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
