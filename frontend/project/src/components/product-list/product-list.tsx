import Product from "../product/product";

function ProductList():JSX.Element{
  return(
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        <Product imageUrl="img/content/catalog-product-1.png" title="ЭлектроГитара Честер bass" dateAdded="19.09.2022" price="17 500 ₽"/>
        <Product imageUrl="img/content/catalog-product-1.png" title="ЭлектроГитара Честер bass" dateAdded="19.09.2022" price="17 500 ₽"/>
        <Product imageUrl="img/content/catalog-product-1.png" title="ЭлектроГитара Честер bass" dateAdded="19.09.2022" price="17 500 ₽"/>
        <Product imageUrl="img/content/catalog-product-1.png" title="ЭлектроГитара Честер bass" dateAdded="19.09.2022" price="17 500 ₽"/>
        <Product imageUrl="img/content/catalog-product-1.png" title="ЭлектроГитара Честер bass" dateAdded="19.09.2022" price="17 500 ₽"/>
        <Product imageUrl="img/content/catalog-product-1.png" title="ЭлектроГитара Честер bass" dateAdded="19.09.2022" price="17 500 ₽"/>
        <Product imageUrl="img/content/catalog-product-1.png" title="ЭлектроГитара Честер bass" dateAdded="19.09.2022" price="17 500 ₽"/>
      </ul>
    </div>
  );
}

export default ProductList;