type FooterLinkProps = {
  text: string;
  href: string;
};

function FooterLink({ text, href }: FooterLinkProps) {
  return (
    <li className="footer__nav-list-item">
      <a className="link footer__nav-link" href={href}>
        {text}
      </a>
    </li>
  );
}

export default FooterLink;
