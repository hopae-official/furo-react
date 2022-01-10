import React, { useEffect } from 'react';
import useFuro from './use-furo';

const defaultOnRedirecting = () => <>Redirecting...</>;

const defaultReturnTo = () =>
  `${window.location.pathname}${window.location.search}`;

const withAuthenticationRequired = (Component, options = {}) => {
  return function WithAuthenticationRequired(props) {
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useFuro();
    const {
      returnTo = defaultReturnTo,
      onRedirecting = defaultOnRedirecting,
      claimCheck = () => true,
      loginOptions,
    } = options;

    const routeIsAuthenticated = isAuthenticated && claimCheck(user);

    useEffect(() => {
      if (isLoading || routeIsAuthenticated) {
        return;
      }
      const opts = {
        ...loginOptions,
        appState: {
          ...(loginOptions && loginOptions.appState),
          returnTo: typeof returnTo === 'function' ? returnTo() : returnTo,
        },
      };
      async () => {
        await loginWithRedirect(opts);
      };
    }, [
      isLoading,
      routeIsAuthenticated,
      loginWithRedirect,
      loginOptions,
      returnTo,
    ]);

    return routeIsAuthenticated ? <Component {...props} /> : onRedirecting();
  };
};

export default withAuthenticationRequired;
