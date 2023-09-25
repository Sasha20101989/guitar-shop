import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/index";
import { useGoToMain } from "../../hooks/use-go-to-main/use-go-to-main";
import { ChangeEvent, FormEvent, Fragment, useRef, useState } from "react";
import { postProductAction } from "../../store/api-actions/products-api-actions/products-api-actions";
import { ProductData } from "../../types/product-data";
import { GuitarType } from "../../types/guitar-type";
import { StringCount } from "../../types/string-count";
import { formatDateToDDMMYYYY } from "../../utils/util-date";
import { AppRoute } from "../../const";
import { toast } from "react-toastify";

function ProductAddForm(): JSX.Element {
  const handleGoToMainClick = useGoToMain();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState<GuitarType | null>(null);
  const [selectedNumberOfStrings, setSelectedNumberOfStrings] = useState<StringCount | null>(null);
  const [selectedImage, setImage] = useState<string | null>(null);

  const [formattedDate] = useState(formatDateToDDMMYYYY(new Date().toISOString()));

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const createdAtRef = useRef<HTMLInputElement | null>(null);
  const articleRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (productData: ProductData) => {
    const errors = validateProductData(productData);

    if (errors) {
      showNotSuccessNotification(errors);
    } else {
      dispatch(postProductAction(productData));
      navigate(AppRoute.Main);
    }
  };

  const showNotSuccessNotification = (errors: { [key: string]: string }) => {
    const errorMessages = Object.values(errors).join("\n");
    toast.warn(errorMessages, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 10000,
    });
  };

  const validateProductData = (productData: ProductData) => {
    const errors: { [key: string]: string } = {};

    if (productData.title.length < 10 || productData.title.length > 100) {
      errors.title = 'Title must be between 10 and 100 characters.';
    }

    if (productData.description.length < 20 || productData.description.length > 1024) {
      errors.description = 'Description must be between 20 and 1024 characters.';
    }

    if (!productData.createdAt) {
      errors.createdAt = 'Creation date is required.';
    }

    if (!productData.image) {
      errors.image = 'Image is required.';
    }

    if (!Object.values(GuitarType).includes(productData.type)) {
      errors.type = 'Invalid guitar type.';
    }

    if (productData.article.length < 5 || productData.article.length > 40) {
      errors.article = 'Article must be between 5 and 40 characters.';
    }

    if (!Object.values(StringCount).includes(productData.numberOfStrings)) {
      errors.numberOfStrings = 'Invalid number of strings.';
    }

    if (isNaN(productData.price) || productData.price < 100 || productData.price > 1000000) {
      errors.price = 'Price must be between 100 and 1,000,000.';
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    return null;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (titleRef.current !== null &&
        descriptionRef.current !== null &&
        createdAtRef.current !== null &&
        selectedImage !== null &&
        selectedType !== null &&
        articleRef.current !== null &&
        selectedNumberOfStrings !== null &&
        priceRef.current !== null
    ) {
      const date = new Date().toISOString();
      onSubmit({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        createdAt: date,
        image: selectedImage,
        type: selectedType,
        article: articleRef.current.value,
        numberOfStrings: selectedNumberOfStrings,
        price: parseInt(priceRef.current.value, 10),
      });
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value as GuitarType);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNumberOfStrings(event.target.value as StringCount);
  };

  const handleImageInputClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click(); // Вызывает клик на скрытом поле
    }
  };

  const handleRemoveImage = () => {
      setImage('');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const isJpegOrPng = file?.type === 'image/jpeg' || file?.type === 'image/png';

    if (isJpegOrPng) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      toast.warn('Выбранный файл должен быть формата JPEG (jpg) или PNG (png).', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  return (
    <section className="add-item">
      <div className="container">
        <h1 className="add-item__title">Новый товар</h1>
        <ul className="breadcrumbs">
          <li className="breadcrumbs__item">
            <a className="link" onClick={handleGoToMainClick}>
              Вход
            </a>
          </li>
          <li className="breadcrumbs__item">
            <a className="link" onClick={handleGoToMainClick}>Товары</a>
          </li>
          <li className="breadcrumbs__item">
            <a className="link">Новый товар</a>
          </li>
        </ul>
        <form className="add-item__form" onSubmit={handleSubmit}>
          <div className="add-item__form-left">
            <div className="edit-item-image add-item__form-image">
              <div className="edit-item-image__image-wrap">
              <img
                  className="edit-item-image__image"
                  src={selectedImage || '/default-image.png'}
                  width="133"
                  height="332"
                  alt="Product Image"

                  />
              </div>
              <input
                type="file"
                id="image-input"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                ref={imageInputRef}
              />
              <div className="edit-item-image__btn-wrap">
                <button className="button button--small button--black-border edit-item-image__btn" onClick={handleImageInputClick}>Добавить
                </button>
                <button className="button button--small button--black-border edit-item-image__btn" onClick={handleRemoveImage}>Удалить</button>
              </div>
            </div>
            <div className="input-radio edit-item__form-radio">
              <span>Тип товара</span>
              {Object.values(GuitarType).map((type) => (
                <Fragment key={type}>
                  <input
                    type="radio"
                    id={`type-${type}`}
                    name="item-type"
                    value={type}
                    checked={selectedType === type}
                    onChange={handleTypeChange}
                  />
                  <label htmlFor={`type-${type}`}>{type}</label>
                </Fragment>
              ))}
            </div>
            <div className="input-radio edit-item__form-radio">
              <span>Количество струн</span>
              {Object.values(StringCount).map((count) => (
                <Fragment key={count}>
                  <input
                    type="radio"
                    id={`string-qty-${count}`}
                    name="string-qty"
                    value={count}
                    checked={selectedNumberOfStrings === count}
                    onChange={handleCountChange}
                  />
                  <label className={`string-qty-${count}`} htmlFor={`string-qty-${count}`}>
                    {count}
                  </label>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="add-item__form-right">
            <div className="custom-input add-item__form-input">
              <label><span>Дата добавления товара</span>
                <input type="text" name="date" ref={createdAtRef} value={formattedDate} placeholder="Дата в формате 00.00.0000" readOnly/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите наименование товара</span>
                <input type="text" name="title" ref={titleRef} placeholder="Наименование"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
              <label><span>Введите цену товара</span>
                <input type="text" name="price" ref={priceRef} placeholder="Цена в формате 00 000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input add-item__form-input">
              <label><span>Введите артикул товара</span>
                <input type="text" name="sku" ref={articleRef} placeholder="Артикул товара"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea add-item__form-textarea">
              <label><span>Введите описание товара</span>
                <textarea name="description" ref={descriptionRef} placeholder=""></textarea>
              </label>
              <p>Заполните поле</p>
            </div>
          </div>
          <div className="add-item__form-buttons-wrap">
            <button
              className="button button--small add-item__form-button"
              type="submit"
            >
              Сохранить изменения
            </button>
            <button
              className="button button--small add-item__form-button"
              type="button"
              onClick={handleGoToMainClick}
            >
              Вернуться к списку товаров
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductAddForm;
