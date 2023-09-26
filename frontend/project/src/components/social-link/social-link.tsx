import { Link } from 'react-router-dom';

type SocialLinkProps = {
  href: string;
  label: string;
  icon: string;
};

function SocialLink({ href, label, icon }: SocialLinkProps): JSX.Element {
  return (
    <li className="socials-item">
      <Link className="socials__link" to={href} aria-label={label}>
        <svg className="socials__icon" width="24" height="24" aria-hidden="true">
          <use xlinkHref={icon}></use>
        </svg>
      </Link>
    </li>
  );
}

export default SocialLink;
