import { FormEvent, Fragment, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGoToMain } from '../../hooks/use-go-to-main/use-go-to-main';
import { Product } from '../../types/product';
import { GuitarType } from '../../types/guitar-type';
import { StringCount } from '../../types/string-count';
import { formatDateToDDMMYYYY } from '../../utils/util-date';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/index';
import { editProductAction } from '../../store/api-actions/products-api-actions/products-api-actions';

type ProductEditFormProps ={
  product: Product;
}

function ProductEditForm({product}: ProductEditFormProps): JSX.Element {
  const handleGoToMainClick = useGoToMain();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {id, title, description, createdAt, image, type, article, numberOfStrings, price } = product;

  const [selectedTitle, setSelectedTitle] = useState<string | null>(title);
  const [selectedType, setSelectedType] = useState<GuitarType | null>(type);
  const [selectedNumberOfStrings, setSelectedNumberOfStrings] = useState<StringCount | null>(numberOfStrings);
  const [selectedImage, setImage] = useState<string | null>(image);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(price);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(article);
  const [selectedDescription, setSelectedDescription] = useState<string | null>(description);

  const [formattedDate] = useState(formatDateToDDMMYYYY(new Date(createdAt).toISOString()));

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const createdAtRef = useRef<HTMLInputElement | null>(null);
  const articleRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageInputClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setImage('');
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value as GuitarType);
  };

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNumberOfStrings(event.target.value as StringCount);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrice(parseInt(event.target.value, 10));
  };

  const handleArticleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedArticle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedDescription(event.target.value);
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

  const onSubmit = (productData: Product) => {
    const errors = validateProductData(productData);

    if (errors) {
      showNotSuccessNotification(errors);
    } else {
      dispatch(editProductAction(productData));
      navigate(AppRoute.Main);
    }
  };

  const showNotSuccessNotification = (errors: { [key: string]: string }) => {
    const errorMessages = Object.values(errors).join('\n');
    toast.warn(errorMessages, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 10000,
    });
  };

  const validateProductData = (productData: Product) => {
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
      onSubmit({
        id: id,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        createdAt: formattedDate,
        image: selectedImage,
        type: selectedType,
        article: articleRef.current.value,
        numberOfStrings: selectedNumberOfStrings,
        price: parseInt(priceRef.current.value, 10),
      });
    }
  };

  return (
    <section className="edit-item">
      <div className="container">
        <h1 className="edit-item__title">{selectedTitle}</h1>
        <ul className="breadcrumbs">
          <li className="breadcrumbs__item"><Link to="" className="link" onClick={handleGoToMainClick}>Вход</Link>
          </li>
          <li className="breadcrumbs__item"><Link to="" className="link" onClick={handleGoToMainClick}>Товары</Link>
          </li>
          <li className="breadcrumbs__item"><Link to="" className="link">{selectedTitle}</Link>
          </li>
        </ul>
        <form className="edit-item__form" onSubmit={handleSubmit}>
          <div className="edit-item__form-left">
            <div className="edit-item-image edit-item__form-image">
              <div className="edit-item-image__image-wrap">
                <img
                  className="edit-item-image__image"
                  src={selectedImage || ''}
                  srcSet={(selectedImage ? `${selectedImage.split('.')[0]}@2x.${selectedImage.split('.')[1]}` : '')}
                  width="133"
                  height="332"
                  alt={title}
                />
                <input type="file" id="image-input" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} ref={imageInputRef}/>
              </div>
              <div className="edit-item-image__btn-wrap">
                <button className="button button--small button--black-border edit-item-image__btn" onClick={handleImageInputClick}>Заменить
                </button>
                <button className="button button--small button--black-border edit-item-image__btn" onClick={handleRemoveImage}>Удалить</button>
              </div>
            </div>
            <div className="input-radio edit-item__form-radio">
              <span>Тип товара</span>
              {Object.values(GuitarType).map((guitarType) => (
                <Fragment key={guitarType}>
                  <input
                    type="radio"
                    id={`type-${guitarType}`}
                    name="item-type"
                    value={guitarType}
                    checked={selectedType === guitarType}
                    onChange={handleTypeChange}
                  />
                  <label htmlFor={`type-${guitarType}`}>{guitarType}</label>
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
          <div className="edit-item__form-right">
            <div className="custom-input edit-item__form-input">
              <label><span>Дата добавления товара</span>
                <input type="text" name="date" value={formattedDate} ref={createdAtRef} placeholder="Дата в формате 00.00.0000" readOnly/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label><span>Наименование товара</span>
                <input type="text" name="title" ref={titleRef} value={selectedTitle ?? ''} onChange={handleTitleChange} placeholder="Наименование"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input edit-item__form-input--price">
              <label><span>Цена товара</span>
                <input type="text" name="price" ref={priceRef} value={selectedPrice ?? 0} onChange={handlePriceChange} placeholder="Цена в формате 00 000"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-input edit-item__form-input">
              <label><span>Артикул товара</span>
                <input type="text" name="sku" ref={articleRef} value={selectedArticle ?? ''} onChange={handleArticleChange} placeholder="Артикул товара"/>
              </label>
              <p>Заполните поле</p>
            </div>
            <div className="custom-textarea edit-item__form-textarea">
              <label><span>Описание товара</span>
                <textarea name="description" placeholder="" ref={descriptionRef} defaultValue={selectedDescription ?? ''} onChange={handleDescriptionChange}></textarea>
              </label>
              <p>Заполните поле</p>
            </div>
          </div>
          <div className="edit-item__form-buttons-wrap">
            <button className="button button--small edit-item__form-button" type="submit">Сохранить изменения</button>
            <button className="button button--small edit-item__form-button" type="button" onClick={handleGoToMainClick}>Вернуться к списку товаров</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProductEditForm;
