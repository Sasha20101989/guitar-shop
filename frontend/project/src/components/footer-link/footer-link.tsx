import { Link } from 'react-router-dom';

type FooterLinkProps = {
  text: string;
  to: string;
};

function FooterLink({ text, to }: FooterLinkProps) {
  return (
    <li className="footer__nav-list-item">
      <Link to={to} className="link footer__nav-link">
        {text}
      </Link>
    </li>
  );
}

export default FooterLink;
