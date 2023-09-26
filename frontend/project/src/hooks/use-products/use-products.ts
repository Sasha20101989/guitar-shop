import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '..';
import { getProducts } from '../../store/main-data/main-data.selectors';
import { Product } from '../../types/product';
import { fetchProductsAction } from '../../store/api-actions/products-api-actions/products-api-actions';

function useProducts(): Product[] {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProductsAction({}));
  }, [dispatch]);

  return products;
}

export default useProducts;
