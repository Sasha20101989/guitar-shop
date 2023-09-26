import Layout from '../../components/layout/layout';
import ProductList from '../../components/product-list/product-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import FilterOptions from '../../components/filter-options/filter-options';
import Pagination from '../../components/pagination/pagination';
import { useGoToMain } from '../../hooks/use-go-to-main/use-go-to-main';
import { useGoToAddNewProduct } from '../../hooks/use-go-to-add-new-product/use-go-to-add-new-product';
import useFilteredAndSortedProducts from '../../hooks/use-filtered-and-sorted-offers/use-filtered-and-sorted-offers';
import { useAppSelector } from '../../hooks/index';
import { isDataLoading } from '../../store/main-data/main-data.selectors';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { Link } from 'react-router-dom';

function MainScreen() : JSX.Element {
  const handleGoToMainClick = useGoToMain();
  const handleGoToAddNewProductClick = useGoToAddNewProduct();

  const isOffersLoading = useAppSelector(isDataLoading);

  const sortedAndFilteredProducts = useFilteredAndSortedProducts();

  const handlePageChange = (_newPage: number) => {
  //TODO: в последнюю очередь
  };

  if(!isOffersLoading){
    return(
      <Layout>
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><Link to="" className="link" onClick={handleGoToMainClick}>Вход</Link></li>
              <li className="breadcrumbs__item"><Link to="" className="link">Товары</Link></li>
            </ul>
            <div className="catalog">
              <FilterOptions/>
              <SortingOptions/>
              <ProductList products={sortedAndFilteredProducts} />
            </div>
            <button className="button product-list__button button--red button--big" onClick={handleGoToAddNewProductClick}>Добавить новый товар</button>
            <Pagination currentPage={2} totalPages={5} onPageChange={(newPage) => handlePageChange(newPage)} />
          </div>
        </section>
      </Layout>
    );
  }
  return (<LoadingScreen/>);
}

export default MainScreen;
