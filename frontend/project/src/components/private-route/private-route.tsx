import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
//import { useIsLoggedIn } from '../../hooks/use-is-logged-in/use-is-logged-in';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;

  return (
    //useIsLoggedIn(AuthorizationStatus.Auth)
    true
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;