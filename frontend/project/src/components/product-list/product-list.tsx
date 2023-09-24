import { Product } from "../../types/product";
import ProductCard from "../product-card/product-card";

type ProductListProps = {
  products: Product[];
  setActiveProduct?: (id: string) => void;
}

function ProductList({products, setActiveProduct}: ProductListProps):JSX.Element{
  return(
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {products.map((product, id) => {
          const keyValue = `${id}-${product.title}`;
          return <ProductCard
            key={keyValue}
            product={product}
            onMouseEnter={() => setActiveProduct && setActiveProduct(product.id)}
            onMouseLeave={() => setActiveProduct && setActiveProduct("")}/>
        })}
      </ul>
    </div>
  );
}

export default ProductList;
