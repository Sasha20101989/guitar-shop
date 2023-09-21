import { useGoToProduct } from "../../hooks/use-go-to-product/use-go-to-product";
import { useGoToUpdateProduct } from "../../hooks/use-go-to-update-product/use-go-to-update-product";
import { Product } from "../../types/product";
import { formatDateToDDMMYYYY } from "../../utils/util-date";

type ProductCardProps = {
  product: Product;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

function ProductCard({ product, onMouseEnter, onMouseLeave }: ProductCardProps): JSX.Element {
  const {id, imageUrl, createdAt, price, title} = product;
  const handleGoToUpdateProductClick = useGoToUpdateProduct(id);
  const handleGoToProductClick = useGoToProduct(id);

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src={imageUrl} srcSet={`${imageUrl.split('.')[0]}@2x.${imageUrl.split('.')[1]}`} width="36" height="93" alt={`Картинка ${title}`} />
        <div className="catalog-item__data-wrapper">
          <a className="link" onClick={handleGoToProductClick}>
            <p className="catalog-item__data-title" onMouseEnter = {onMouseEnter} onMouseLeave = {onMouseLeave}>{title}</p>
          </a>
          <br />
          <p className="catalog-item__data-date">Дата добавления {formatDateToDDMMYYYY(createdAt)} </p>
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

export default ProductCard;
