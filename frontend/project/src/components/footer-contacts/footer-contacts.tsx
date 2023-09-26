function FooterContacts(): JSX.Element {
  return(
    <section className="footer__nav-section footer__nav-section--contacts">
      <h2 className="footer__nav-title footer__nav-title--contacts">Контакты</h2>
      <p className="footer__nav-text footer__nav-text--address">г. Санкт-Петербург,<br/> м. Невский проспект, ул. Казанская 6.</p><a className="link footer__nav-link footer__nav-link--phone" href="tel:88125005050">8-812-500-50-50</a>
      <p className="footer__nav-text footer__nav-text--work-hours-title">Режим работы:<span className="footer__nav-text footer__nav-text--work-hours">с 11:00 до 20:00</span></p>
      <p className="footer__nav-text footer__nav-text--weekends">без выходных</p>
    </section>
  );
}

export default FooterContacts;
