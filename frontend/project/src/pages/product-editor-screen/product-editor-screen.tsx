import { useParams } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { useGoToMain } from "../../hooks/use-go-to-main/use-go-to-main";
import RadioButtonGroup from "../../components/radio-button-group/radio-button-group";
import StringCountRadioGroup from "../../components/string-count-radio-group/string-count-radio-group";
import { formatDateToDDMMYYYY } from "../../utils/util-date";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { fetchProductsAction } from "../../store/api-actions/products-api-actions/products-api-actions";
import { getProducts } from "../../store/main-data/main-data.selectors";
import { Product } from "../../types/product.js";

type ProductEditorScreen = {
  editMode: boolean;
}

function ProductEditorScreen({ editMode }: ProductEditorScreen): JSX.Element {
  const handleGoToMainClick = useGoToMain();
  const { id } = useParams<{ id?: string }>();
  const dispatch = useAppDispatch();

  const products = useAppSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const selectedProduct: Product | undefined = products.find((product) => product.id === id);

  const isNewProduct = !selectedProduct && !editMode;

  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    article: '',
    description: '',
    type: '',
    numberOfStrings: '',
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title,
        price: selectedProduct.price,
        article: selectedProduct.article,
        description: selectedProduct.description,
        type: selectedProduct.type,
        numberOfStrings: selectedProduct.numberOfStrings.toString(),
      });
    }
  }, [selectedProduct]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

    return (
      <Layout>
        <section className={isNewProduct ? "add-item" : "edit-item"}>
          <div className="container">
            <h1 className={isNewProduct ? "add-item__title" : "edit-item__title"}>{isNewProduct ? "Новый товар" : formData.title}</h1>
            <ul className="breadcrumbs">
              <li className="breadcrumbs__item">
                <a className="link" onClick={handleGoToMainClick}>
                  Вход
                </a>
              </li>
              <li className="breadcrumbs__item">
                <a className="link">Товары</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="link">{isNewProduct ? 'Новый товар' : formData.title}</a>
              </li>
            </ul>
            <form className={isNewProduct ? "add-item__form" : "edit-item__form"} onSubmit={handleSaveChanges}>
              <div className={isNewProduct ? "add-item__form-left" : "edit-item__form-left"}>
                <div className={`edit-item-image ${isNewProduct ? 'add-item__form-image' : 'edit-item__form-image'}`}>
                  {!isNewProduct && selectedProduct && (
                    <div className="edit-item-image__image-wrap">
                      <img
                        className="edit-item-image__image"
                        src={selectedProduct.image}
                        srcSet={`${selectedProduct.image.split('.')[0]}@2x.${selectedProduct.image.split('.')[1]}`}
                        width="133"
                        height="332"
                        alt={formData.title}
                      />
                    </div>
                  )}
                    <div className="edit-item-image__btn-wrap">
                      <button className="button button--small button--black-border edit-item-image__btn">{isNewProduct ? "Добавить" : "Заменить"}</button>
                      <button className="button button--small button--black-border edit-item-image__btn">Удалить</button>
                    </div>
                </div>
                <RadioButtonGroup
                  selectedType={formData.type}
                  onTypeChange={(value) => setFormData({ ...formData, type: value })}
                />
                <StringCountRadioGroup
                  selectedCount={formData.numberOfStrings}
                  onCountChange={(value) => setFormData({ ...formData, numberOfStrings: value })}
                />
              </div>
              <div className={isNewProduct ? "add-item__form-right" : "edit-item__form-right"}>
                <div className={isNewProduct ? "custom-input add-item__form-input" : "custom-input edit-item__form-input"}>
                  <label>
                    <span>Дата добавления товара</span>
                    <input
                      type="text"
                      name="date"
                      value={!isNewProduct && selectedProduct ? formatDateToDDMMYYYY(new Date(selectedProduct.createdAt).toLocaleString('en-US', { month: 'long', year: 'numeric' })) : ""}
                      placeholder="Дата в формате 00.00.0000"
                      readOnly
                    />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className={isNewProduct ? "custom-input add-item__form-input" : "custom-input edit-item__form-input"}>
                  <label>
                    <span>Наименование товара</span>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Наименование"
                    />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className={isNewProduct ? "custom-input add-item__form-input add-item__form-input--price is-placeholder" : "custom-input edit-item__form-input edit-item__form-input--price"}>
                  <label>
                    <span>Цена товара</span>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Цена в формате 00 000"
                    />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className={isNewProduct ? "custom-input add-item__form-input" : "custom-input edit-item__form-input"}>
                  <label>
                    <span>Артикул товара</span>
                    <input
                      type="text"
                      name="article"
                      value={formData.article}
                      onChange={handleInputChange}
                      placeholder="Артикул товара"
                    />
                  </label>
                  <p>Заполните поле</p>
                </div>
                <div className={isNewProduct ? "custom-textarea add-item__form-textarea" : "custom-textarea edit-item__form-textarea"}>
                  <label>
                    <span>Описание товара</span>
                    <textarea
                      name="description"
                      placeholder=""
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </label>
                  <p>Заполните поле</p>
                </div>
              </div>
              <div className={isNewProduct ? "add-item__form-buttons-wrap" : "edit-item__form-buttons-wrap"}>
                <button className={isNewProduct ? "button button--small add-item__form-button" : "button button--small edit-item__form-button"} type="submit">
                  {isNewProduct ? "Создать товар" : "Сохранить изменения"}
                </button>
                <button
                  className={isNewProduct ? "button button--small add-item__form-button" : "button button--small edit-item__form-button"}
                  type="button"
                  onClick={handleGoToMainClick}
                >
                  Вернуться к списку товаров
                </button>
              </div>
            </form>
          </div>
        </section>
      </Layout>
    );
  }

export default ProductEditorScreen;
