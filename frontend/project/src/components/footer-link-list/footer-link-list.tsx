import FooterLink from '../footer-link/footer-link';

function FooterLinkList(): JSX.Element {
  return (
    <section className="footer__nav-section footer__nav-section--links">
      <h2 className="footer__nav-title footer__nav-title--links">Информация</h2>
      <ul className="footer__nav-list">
        <FooterLink text="Где купить?" to="#top" />
        <FooterLink text="Блог" to="#top" />
        <FooterLink text="Вопрос - ответ" to="#top" />
        <FooterLink text="Возврат" to="#top" />
        <FooterLink text="Сервис-центры" to="#top" />
      </ul>
    </section>
  );
}

export default FooterLinkList;
