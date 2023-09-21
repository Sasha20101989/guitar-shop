import { useState } from 'react';
import Layout from "../../components/layout/layout";
import ProductList from '../../components/product-list/product-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import FilterOptions from '../../components/filter-options/filter-options';
import Pagination from '../../components/pagination/pagination';
import { useGoToMain } from '../../hooks/use-go-to-main/use-go-to-main';
import { useGoToAddNewProduct } from '../../hooks/use-go-to-add-new-product/use-go-to-add-new-product';
import { Product } from '../../types/product';

type MainScreenProps = {
  products: Product[];
}

function MainScreen({products}: MainScreenProps) : JSX.Element {
  const handleGoToMainClick = useGoToMain();
  const handleGoToAddNewProductClick = useGoToAddNewProduct();
  const [activeProductId, setActiveProduct] = useState<string>();
  //const authorizationStatus = useAppSelector(getAuthorizationStatus);
  //const isOffersLoading = useAppSelector(isDataLoading);

  //const isLoading = authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading;
  //if(!isLoading){

  const handlePageChange = (newPage: number) => {
    // код для обработки смены страницы, например, обновление данных на странице или запрос на сервер
    console.log(`Выбрана страница ${newPage}`);
  }

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleFilterChange = (filteredProducts: Product[]) => {
    setFilteredProducts(filteredProducts);
  };

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
              <FilterOptions products={products} onFilterChange={handleFilterChange} />
              <SortingOptions />
              <ProductList products={filteredProducts} setActiveProduct={setActiveProduct} />
            </div>
            <button className="button product-list__button button--red button--big" onClick={handleGoToAddNewProductClick}>Добавить новый товар</button>
            <Pagination currentPage={2} totalPages={5} onPageChange={(newPage) => handlePageChange(newPage)} />
          </div>
        </section>
      </Layout>
    );
  //}
  //return (<LoadingScreen/>);
}

export default MainScreen;