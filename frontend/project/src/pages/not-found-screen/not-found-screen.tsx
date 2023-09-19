import Layout from "../../components/layout/layout";

function NotFoundScreen() : JSX.Element {
  return(
    <Layout>
      <section className="error">
        <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
        <p className="error__text"> Возможно, страница была удалена или<br/>её вовсе не существовало.</p>
        <button className="button button__error button--small button--black-border">Продолжить покупки</button>
      </section>
    </Layout>
  );
}
export default NotFoundScreen;
