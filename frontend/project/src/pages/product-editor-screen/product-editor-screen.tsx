import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { fetchProductAction } from '../../store/api-actions/products-api-actions/products-api-actions';
import { getProduct } from '../../store/main-data/main-data.selectors';
import ProductAddForm from '../../components/product-add-form/product-add-form';
import ProductEditForm from '../../components/product-edit-form/product-edit-form';

type ProductEditorScreenProps = {
  editMode: boolean;
}

function ProductEditorScreen({ editMode }: ProductEditorScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();

  const selectedProduct = useAppSelector(getProduct);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductAction(id));
    }
  }, [dispatch, id, selectedProduct]);

  const isNewProduct = !editMode;

  if (isNewProduct) {
    return (
      <Layout>
        <ProductAddForm />
      </Layout>
    );
  }

  if (!selectedProduct) {
    return (
      <Layout>
        <p>Гитара не найдена.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductEditForm product={selectedProduct} />
    </Layout>
  );
}

export default ProductEditorScreen;
