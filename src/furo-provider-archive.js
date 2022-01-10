import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { FuroContext } from './furo-context';
import { FuroReducer, initialState } from './reducer';
import { hasAuthParams } from './utils';

const defaultOnRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname,
  );
};

const toFuroClientOptions = (opts) => {
  const { clientId, redirectUri, maxAge, ...validOpts } = opts;
  return {
    ...validOpts,
    client_id: clientId,
    redirect_uri: redirectUri,
    max_age: maxAge,
    furoClient: {
      name: 'furo-react',
      version: __VERSION__,
    },
  };
};

export const FuroProvider = (opts) => {
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
    (async () => {
      try {
        // check if url has auth params
        if (hasAuthParams() && !skipRedirectCallback) {
          const { appState } = await client.handleRedirectCallback();
          onRedirectCallback(appState);
        } else {
          await client.checkSession();
        }
        const user = await client.getUser();
        dispatch({ type: 'INITIALIZED', user });
      } catch (error) {
        // normalize error instance later error: loginError(error);
        dispatch({ type: 'ERROR', error: error });
      }
    })();
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

  const logout = useCallback(
    (opts) => {
      const maybePromise = client.logout(opts);
      if (opts.localOnly) {
        if (maybePromise && typeof maybePromise.then === 'function') {
          return maybePromise.then(() => dispatch({ type: 'LOGOUT' }));
        }
        dispatch({ type: 'LOGOUT' });
      }
      return maybePromise;
    },
    [client],
  );

  const getAccessTokenSilently = useCallback(
    async (opts, config) => {
      let token;
      try {
        token = await client.getTokenWithPopup(opts, config);
      } catch (error) {
        // define type for errors later e.g.) tokenError(error)
        throw error;
      } finally {
        dispatch({
          type: 'GET_ACCESS_TOKEN_COMPLETE',
          user: await client.getUser(),
        });
      }
      return token;
    },
    [client],
  );

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
        getAccessTokenWithPopup,
        // getIdTokenClaims,
        loginWithRedirect,
        // loginWithPopup,
        logout,
        handleRedirectCallback,
      }}
    >
      {children}
    </FuroContext.Provider>
  );

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // const fetchUser = () => {
  //   setLoading(true);
  //   const params = new URLSearchParams(window.location.search);
  //   const token = params.get('auth');
  //   const uid = params.get('uid');
  //   if (!token) setError('Missing required params');
  //   console.log(token, uid);
  //   fetch('https://api.furo.one/users/' + uid, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       if (response.uid === uid) {
  //         localStorage.setItem('furo-user', JSON.stringify(response));
  //         localStorage.setItem('furo-token', token);
  //         setLoading(false);
  //         dispatch({ type: 'SET_USER', user: response });
  //         // window.location.href = redirectUri;
  //       } else {
  //         setError('Auth failed');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError('Something went wrong.');
  //     });
  // };
  // useEffect(() => {
  //   if (window.location.pathname === '/furo/callback') {
  //     fetchUser();
  //   }
  // }, []);

  return (
    <FuroStateContext.Provider value={state}>
      <FuroDispatchContext.Provider value={dispatch}>
        {error ? (
          <div>{error}</div>
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          children
        )}
      </FuroDispatchContext.Provider>
    </FuroStateContext.Provider>
  );
};

const getUserFromStore = () => {
  return user;
};

export const useFuro = () => {
  const state = useFuroState();
  const dispatch = useFuroDispatch();
  const { user, client, loading: isLoading } = state;

  const login = (user) => {
    dispatch({ type: 'LOGIN', user: user });
  };

  const loginWithRedirect = () => {
    // add some fancy nonce and challenges here
    // and redirect to the given uri
    location.href = client.domain;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleRedirectCallback = (token) => {
    //verify token
    // redirect to redirectURI
    setTimeout(() => {
      location.assign = 'http://localhost:3001';
    }, 2000);
  };

  const isAuthenticated = user ? true : false;
  return {
    user,
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    logout,
    handleRedirectCallback,
  };
};

class FuroClient {
  constructor(options) {
    this.domain = options.domain;
    this.clientId = options.clientId;
    this.redirectUri = options.redirectUri;
    return this;
  }
}
