import { Link, useParams } from 'react-router-dom';

import Layout from '../../components/layout/layout';
import { useGoToMain } from '../../hooks/use-go-to-main/use-go-to-main';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { fetchProductAction } from '../../store/api-actions/products-api-actions/products-api-actions';
import useProducts from '../../hooks/use-products/use-products';

function RoomScreen(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const products = useProducts();

  useEffect(() => {
    if(id){
      dispatch(fetchProductAction(id));
    }
  }, [dispatch, id]);

  const selectedProduct = products.find((product) => product.id === id);
  const handleGoToMainClick = useGoToMain();

  const [activeTab, setActiveTab] = useState('characteristics');

  if(selectedProduct){
    const { title, image, article, type, numberOfStrings, description } = selectedProduct;

    const switchToCharacteristics = () => {
      setActiveTab('characteristics');
    };

    const switchToDescription = () => {
      setActiveTab('description');
    };

    return(
      <Layout>
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><Link to="" className="link">Главная</Link>
          </li>
          <li className="breadcrumbs__item"><Link to="" className="link" onClick={handleGoToMainClick}>Каталог</Link>
          </li>
          <li className="breadcrumbs__item"><Link to="" className="link">Товар</Link>
          </li>
        </ul>
        <div className="product-container">
          <img className="product-container__img" src={image} srcSet={`${image.split('.')[0]}@2x.${image.split('.')[1]}`} width="90" height="235" alt={title}/>
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{title}</h2>
            <br/>
            <br/>
            <div className="tabs">
              <Link className={`button button--medium tabs__button ${activeTab === 'characteristics' ? 'active' : ''}`} to="#characteristics" onClick={switchToCharacteristics}>
                Характеристики
              </Link>
              <Link className={`button button--black-border button--medium tabs__button ${activeTab === 'description' ? 'active' : ''}`} to="#description" onClick={switchToDescription}>
                Описание
              </Link>
              {activeTab === 'characteristics' && (
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{article}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{type}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{`${numberOfStrings} струнная`}</td>
                    </tr>
                  </table>
                </div>
              )}

              {activeTab === 'description' && (
                <div className="tabs__content" id="description">
                  <p className="tabs__product-description">{description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }else{
    return null;
  }
}
export default RoomScreen;
