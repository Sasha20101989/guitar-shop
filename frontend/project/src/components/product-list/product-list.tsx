import { Product } from "../../types/product";
import { formatDateToDDMMYYYY } from "../../utils/util-date";
import ProductCard from "../product-card/product-card";

type ProductListProps = {
  products: Product[];
}

function ProductList({products}: ProductListProps):JSX.Element{
  return(
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {products.map((product, id) => {
          const keyValue = `${id}-${product.title}`;
          return <ProductCard key={keyValue} imageUrl={product.imageUrl} title={product.title} dateAdded={formatDateToDDMMYYYY(product.createdAt)} price={product.price}/>
        })}
      </ul>
    </div>
  );
}

export default ProductList;