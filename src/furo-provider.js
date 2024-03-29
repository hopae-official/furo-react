import React, { useState, useEffect, useReducer, useCallback } from 'react';
import FuroClient from './FuroClient';
import FuroContext from './furo-context';
import { reducer as FuroReducer, initialState } from './reducer';
import { hasAuthParams } from './utils';
import { Buffer } from "buffer";

const defaultOnRedirectCallback = (appState, opts) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname,
  );

  window.location.href = opts.redirectUri;
};

const toFuroClientOptions = (opts) => {
  const { clientId, redirectUri, apiUrl, maxAge, ...validOpts } = opts;
  return {
    ...validOpts,
    client_id: clientId,
    redirect_uri: redirectUri,
    api_url: apiUrl,
    max_age: maxAge,
    furoClient: {
      name: 'furo-react',
      // version: __VERSION__,
    },
  };
};

const toFuroLoginRedirectOptions = (opts) => {
  return opts;
};

const FuroProvider = (opts) => {
  const {
    children,
    skipRedirectCallback,
    onRedirectCallback = defaultOnRedirectCallback,
    ...clientOpts
  } = opts;
  // initialize Furo Client
  // const client = new FuroClient({ domain, clientId, redirectUri });
  const [client] = useState(
    () => new FuroClient(toFuroClientOptions(clientOpts)),
  );
  // initialize Reducer
  const [state, dispatch] = useReducer(FuroReducer, initialState);

  // check
  useEffect(() => {
      const init = async () => {
      try {
        // check if url has auth params
        if (hasAuthParams() && !skipRedirectCallback) {
          // const { appState } = await client.handleRedirectCallback();
          // onRedirectCallback(appState);
          await client.handleRedirectCallback();
          onRedirectCallback({}, opts);
        } else {
          // check if the user is stored in storage. Lock the tab and load the user info
          // await client.checkSession();
          console.log(`Getting token from storage... Checking Sessions`);
        }
        const user = await client.getUser();
        if(!user) logout();
        dispatch({ type: 'INITIALISED', user });
      } catch (error) {
        console.error(error);
        try {
          const {access_token, refresh_token} = await client.refreshTokenSilently();
          if (access_token && refresh_token) init();
        } catch (error) {
        // normalize error instance later error: loginError(error);
          dispatch({ type: 'ERROR', error: error });
        }
      }
    };
    init();
  }, [client, onRedirectCallback, skipRedirectCallback]);

  const buildAuthorizeUrl = useCallback(
    (opts) => client.buildAuthorizeUrl(toFuroLoginRedirectOptions(opts)),
    [client],
  );

  const buildLogoutUrl = useCallback(
    (opts) => client.buildLogoutUrl(opts),
    [client],
  );

  const loginWithRedirect = useCallback(
    (opts) => client.loginWithRedirect(toFuroLoginRedirectOptions(opts)),
    [client],
  );

  // const loginWithPopup =

  const loginWithKakao = useCallback(
    (opts) => client.loginWithKakao(toFuroLoginRedirectOptions(opts)),
    [client],
  );

  const refreshTokenSilently = useCallback(
    (opts) => client.refreshTokenSilently(toFuroLoginRedirectOptions(opts)),
    [client],
  );

  const logout = useCallback(
    (opts) => {
      localStorage.removeItem('furo-user');
      localStorage.removeItem(`furo-${client.clientId}-token`);
      sessionStorage.removeItem(`furo-${client.clientId}-token`);
      dispatch({ type: 'LOGOUT' });
      // const maybePromise = client.logout(opts);
      // if (opts.localOnly) {
      //   if (maybePromise && typeof maybePromise.then === 'function') {
      //     return maybePromise.then(() => dispatch({ type: 'LOGOUT' }));
      //   }
      //   dispatch({ type: 'LOGOUT' });
      // }
      // return maybePromise
    },
    [client],
  );

  const getAccessTokenSilently = useCallback(
    async (opts, config) => {
      // let token;
      // try {
      //   token = await client.getTokenWithPopup(opts, config);
      // } catch (error) {
      //   // define type for errors later e.g.) tokenError(error)
      //   throw error;
      // } finally {
      //   dispatch({
      //     type: 'GET_ACCESS_TOKEN_COMPLETE',
      //     user: await client.getUser(),
      //   });
      // }
      const token = await localStorage.getItem(`furo-${client.clientId}-token`);
      const payloadBase64 = token.split('.')[1];
      const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
      const decoded = JSON.parse(decodedJson);
      const exp = decoded.exp;
      if(!exp) return token;
      const expired = (Date.now() >= exp * 1000)
      if(!expired) return token;
      else {
        const { access_token: token } = await refreshTokenSilently()
        return token;
      }
    },
    [client],
  );

  // const getIdTokenClaims =

  const handleRedirectCallback = useCallback(
    async (url) => {
      try {
        return await client.handleRedirectCallback(url);
      } catch (error) {
        // define type for errors later e.g.) tokenError(error)
        throw error;
      } finally {
        dispatch({
          type: 'HANDLE_REDIRECT_COMPLETE',
          user: await client.getUser(),
        });
      }
    },
    [client],
  );

  return (
    <FuroContext.Provider
      value={{
        ...state,
        buildAuthorizeUrl,
        buildLogoutUrl,
        getAccessTokenSilently,
        // getAccessTokenWithPopup,
        // getIdTokenClaims,
        refreshTokenSilently,
        loginWithRedirect,
        // loginWithPopup,
        loginWithKakao,
        logout,
        handleRedirectCallback,
      }}
    >
      {children}
    </FuroContext.Provider>
  );
};

export default FuroProvider;
