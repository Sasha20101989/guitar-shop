import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../index';
import { Product } from '../../types/product';
import { fetchProductsAction } from '../../store/api-actions/products-api-actions/products-api-actions';
import { SortingOption, SortingOrder, sortProducts } from '../../const';
import { getSortingMethod, getSortingOrderMethod, getStringFilters, getTypeFilters } from '../../store/main-process/main-process.selectors';
import { getProducts } from '../../store/main-data/main-data.selectors';

type UseFilteredAndSortedProductsProps = {
  filteredProducts: Product[];
}

function useFilteredAndSortedProducts() {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(getSortingMethod) as SortingOption;
  const sortOrder = useAppSelector(getSortingOrderMethod) as SortingOrder;
  const stringFilters = useAppSelector(getStringFilters);
  const typeFilters = useAppSelector(getTypeFilters);

  const allProducts = useAppSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const areFiltersSelected = () => {
    return (
      Object.values(stringFilters).some((isSelected) => isSelected) ||
      Object.values(typeFilters).some((isSelected) => isSelected)
    );
  };

  if (!areFiltersSelected()) {
    // Если ни один фильтр не выбран, вернуть все продукты без фильтрации.
    return allProducts;
  }

  const filteredProducts = allProducts.filter((product) => {
    const stringCountFilter = Object.entries(stringFilters).some(([stringCount, isSelected]) => {
      if (isSelected && product.numberOfStrings === stringCount) {
        return true;
      }
      return false;
    });

    const typeFilter = Object.entries(typeFilters).some(([type, isSelected]) => {
      if (isSelected && product.type === type) {
        return true;
      }
      return false;
    });

    if (stringCountFilter || typeFilter) {
      return true;
    }

    return false;
  });

  const sortedProducts = sortProducts(filteredProducts, sortBy, sortOrder);

  return sortedProducts;
}

export default useFilteredAndSortedProducts;
