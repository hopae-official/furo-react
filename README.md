<p align="center">
  <img src="./furo.svg" alt="Furo Logo" width="400" height="240">
</p>

# Furo React SDK

Check Furo's [Official Documentation](https://docs.furo.one/react-sdk).

## FuroProvider

This is a component required for the Furo plugin implementation function, and all paths to use the Furo SDK must be wrapped.

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { FuroProvider } from 'furo-react';
import App from './App';

ReactDOM.render(
  <FuroProvider
    domain="https://auth.furo.one"
    clientId="YOUR_CLIENT_ID_GOES_HERE"
    redirectUri={window.location.origin}
  >
    <App />
  </FuroProvider>,
  document.getElementById('root'),
);
```

### Parameters

| Name        | Type   | Description                                                                                        | Required |
| ----------- | ------ | -------------------------------------------------------------------------------------------------- | -------- |
| domain      | string | Using loginWithRedirect The login page to redirect to, using the default of https://auth.furo.one. | Yes      |
| clientId    | string | This is the client identifier assigned when creating the Furo project.                             | Yes      |
| redirectUri | string | This is the uri of the page to go to after login.                                                  | Yes      |

## useFuro

This is a hook that provides the Furo SDK instance.

```javascript
// src/App.js
import React from 'react';
import { useFuro } from 'furo-react';

function App() {
  const { isLoading, isAuthenticated, user, loginWithRedirect, logout } =
    useFuro();

  const onLogout = () => {
    logout();
    loginWithRedirect();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name} <button onClick={onLogout}>Log out</button>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>{`Log in`}</button>;
  }
}

export default App;
```

### Property

- loginWithRedirect

This function moves to the domain specified by FuroProvider.

```javascript
const loginWithRedirect: () => void;
```

- logOut

This is the logout function.

```javascript
const logout: () => void;
```

- isLoading

A status value that takes true if login is in progress, false otherwise.

```javascript
const isLoading: boolean;
```

- isAuthenticated

A state value that holds true if logged in and false if not logged in.

```javascript
const isAuthenticated: boolean;
```

- user

A user object containing login information.

```javascript
const isAuthenticated: User;
```
