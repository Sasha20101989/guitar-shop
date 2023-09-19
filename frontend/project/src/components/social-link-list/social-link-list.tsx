import SocialLink from "../social-link/social-link";

function SocialLinkList(): JSX.Element  {
  return (
    <ul className="socials__list">
      <SocialLink href="https://www.skype.com/" label="Мы в skype" icon="#icon-skype"/>
      <SocialLink href="https://www.vsco.co/" label="Мы в vsco" icon="#icon-vsco" />
      <SocialLink href="https://www.pinterest.com/" label="Мы в pinterest" icon="#icon-pinterest" />
    </ul>
  );
}

export default SocialLinkList;
