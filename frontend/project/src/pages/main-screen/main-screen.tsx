import { useEffect, useState } from 'react';
import Layout from "../../components/layout/layout";
import ProductList from '../../components/product-list/product-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import FilterOptions from '../../components/filter-options/filter-options';
import Pagination from '../../components/pagination/pagination';
import { useGoToMain } from '../../hooks/use-go-to-main/use-go-to-main';
import { useGoToAddNewProduct } from '../../hooks/use-go-to-add-new-product/use-go-to-add-new-product';
import useFilteredAndSortedProducts from '../../hooks/use-filtered-and-sorted-offers/use-filtered-and-sorted-offers';
import { useAppSelector } from '../../hooks/index';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { AuthorizationStatus } from '../../const';
import { isDataLoading } from '../../store/main-data/main-data.selectors';

function MainScreen() : JSX.Element {
  const handleGoToMainClick = useGoToMain();
  const handleGoToAddNewProductClick = useGoToAddNewProduct();
  const [activeProductId, setActiveProduct] = useState<string>();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(isDataLoading);

  const isLoading = authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading;
  //if(!isLoading){

  const sortedAndFilteredProducts = useFilteredAndSortedProducts();

  const handlePageChange = (newPage: number) => {
    // код для обработки смены страницы, например, обновление данных на странице или запрос на сервер
    console.log(`Выбрана страница ${newPage}`);
  }
  if(!isLoading){
    return(
      <Layout>
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" onClick={handleGoToMainClick}>Вход</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Товары</a>
              </li>
            </ul>
            <div className="catalog">
              <FilterOptions/>
              <SortingOptions/>
              <ProductList products={sortedAndFilteredProducts} setActiveProduct={setActiveProduct} />
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
