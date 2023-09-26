import Footer from '../footer/footer';
import Header from '../header/header';

type LayoutProps = {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Header/>
      <main className="page-content">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Layout;
