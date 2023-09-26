import { Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import ProductEditorScreen from '../../pages/product-editor-screen/product-editor-screen';
import PrivateRoute from '../private-route/private-route';
import LoginScreen from '../../pages/login-screen/login-screen';
import RegisterScreen from '../../pages/register-screen/register-screen';
import { useAppSelector } from '../../hooks/index';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus) as AuthorizationStatus;
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainScreen/>}/>
      <Route path={AppRoute.Register} element={<RegisterScreen/>}/>
      <Route path={AppRoute.Login} element={<LoginScreen/>}/>
      <Route path={AppRoute.ProductForm} element={<RoomScreen/>}/>
      <Route
        path={AppRoute.EditProduct}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <ProductEditorScreen editMode/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.AddProduct}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <ProductEditorScreen editMode={false}/>
          </PrivateRoute>
        }
      />
      <Route path={'*'} element={<NotFoundScreen/>}/>
    </Routes>
  );
}

export default App;
