import { Product } from '../../types/product';
import ProductCard from '../product-card/product-card';

type ProductListProps = {
  products: Product[];
}

function ProductList({products}: ProductListProps):JSX.Element{
  return(
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {products.map((product, id) => {
          const keyValue = `${id}-${product.title}`;
          return(<ProductCard key={keyValue} product={product}/>);
        })}
      </ul>
    </div>
  );
}

export default ProductList;
