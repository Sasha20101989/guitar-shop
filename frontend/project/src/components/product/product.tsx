import { useGoToUpdateProduct } from "../../hooks/use-go-to-update-product/use-go-to-update-product";

type ProductProps = {
  imageUrl: string;
  title: string;
  dateAdded: string;
  price: string;
};

function Product({ imageUrl, title, dateAdded, price }: ProductProps): JSX.Element {
  const handleGoToUpdateProductClick = useGoToUpdateProduct();
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={imageUrl} srcSet={`${imageUrl.split('.')[0]}@2x.${imageUrl.split('.')[1]} 2x`} width="36" height="93" alt={`Картинка ${title}`} />
        <div className="catalog-item__data-wrapper">
          <a className="link" href="./product.html">
            <p className="catalog-item__data-title">{title}</p>
          </a>
          <br />
          <p className="catalog-item__data-date">Дата добавления {dateAdded}</p>
          <p className="catalog-item__data-price">{price} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <a className="button button--small button--black-border" onClick={handleGoToUpdateProductClick} aria-label="Редактировать товар">
          Редактировать
        </a>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">
          Удалить
        </button>
      </div>
    </li>
  );
}

export default Product;
