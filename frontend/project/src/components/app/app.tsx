import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import ProductEditorScreen from '../../pages/product-editor-screen/product-editor-screen';
import PrivateRoute from '../private-route/private-route';
import LoginScreen from '../../pages/login-screen/login-screen';
import RegisterScreen from '../../pages/register-screen/register-screen';
import { products } from '../../mocks/products';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainScreen products={products}/>}/>
      <Route path={AppRoute.Register} element={<RegisterScreen/>}/>
      <Route path={AppRoute.Login} element={<LoginScreen/>}/>
      <Route path={AppRoute.ProductForm} element={<RoomScreen products={products}/>}/>
      <Route
        path={AppRoute.EditProduct}
        element={
          <PrivateRoute>
            <ProductEditorScreen products={products} editMode={true}/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.AddProduct}
        element={
          <PrivateRoute>
            <ProductEditorScreen products={products} editMode={false}/>
          </PrivateRoute>
        }
      />
      <Route path={'*'} element={<NotFoundScreen/>}/>
    </Routes>
  );
}

export default App;
