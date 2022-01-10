import { createContext } from 'react';
import { initialState } from './reducer';

const stub = () => {
  throw new Error('You forgot to wrap your component in <FuroProvider>.');
};

const initialContext = {
  ...initialState,
  buildAuthorizeUrl: stub,
  buildLogoutUrl: stub,
  getAccessTokenSilently: stub,
  getAccessTokenWithPopup: stub,
  getIdTokenClaims: stub,
  loginWithRedirect: stub,
  loginWithPopup: stub,
  logout: stub,
  handleRedirectCallback: stub,
};

const FuroContext = createContext(initialContext);

export default FuroContext;
