import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, isAuthorization, isAuthorizationUnknown} from '../../const';
import LoadingScreen from '../loading-screen/loading-screen';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  if (isAuthorization(authorizationStatus)) {
    return children;
  }

  if (isAuthorizationUnknown(authorizationStatus)) {
    return <LoadingScreen />;
  }

  return <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
