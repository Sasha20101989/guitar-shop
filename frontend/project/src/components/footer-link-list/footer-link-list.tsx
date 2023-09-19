import FooterLink from "../footer-link/footer-link";

function FooterLinkList(): JSX.Element {
  return (
    <section className="footer__nav-section footer__nav-section--links">
      <h2 className="footer__nav-title footer__nav-title--links">Информация</h2>
      <ul className="footer__nav-list">
        <FooterLink text="Где купить?" href="#top" />
        <FooterLink text="Блог" href="#top" />
        <FooterLink text="Вопрос - ответ" href="#top" />
        <FooterLink text="Возврат" href="#top" />
        <FooterLink text="Сервис-центры" href="#top" />
      </ul>
      </section>
  );
}

export default FooterLinkList;
