// import Lock from 'browser-tabs-lock';
import axios from 'axios';
import { Buffer } from "buffer";

const GET_TOKEN_SILENTLY_LOCK_KEY = 'furo.lock.getTokenSilently';
axios.defaults.baseURL = 'https://api.furo.one';

const FURO_AUTH_URL = 'https://auth.furo.one'

export default class FuroClient {
  constructor(options) {
    // typeof window !== 'undefined' && validateCrypto();\
    this.domain = options.domain;
    this.clientId = options.client_id;
    this.redirectURI = options.redirect_uri;
    if(options.api_url) axios.defaults.baseURL = options.api_url;
  }

  async buildAuthorizeUrl(options) {
    // const { redirect_uri, appState, ...authorizeOptions } = options;
    const baseUrl = `${this.domain}/login/${this.clientId}`;
    if (this.redirectURI)
      return `${baseUrl}?redirect_uri=${encodeURIComponent(this.redirectURI)}`
    else
      return baseUrl;
  }

  async getUser(options) {
    // check if user exists in localstorage
    const accessToken = await localStorage.getItem(`furo-${this.clientId}-token`);

    if (!accessToken) return null;

    // get user profile
    const { data: user } = await axios.get(`/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return user;
  }

  async loginWithRedirect() {
    const url = await this.buildAuthorizeUrl();
    window.location.href = url;
  }

  async handleRedirectCallback(url = window.location.search) {
    // 1. check params
    const params = new URLSearchParams(url);
    const code = params.get('code');
    const response = await axios.post(`/sessions/code/authenticate`, { code });
    const { access_token: accessToken, refresh_token: refreshToken } = response.data;
    // if (!code || !uid)
    //   throw `Missing ${!code && 'code'} ${!code && !uid && '/'} ${
    //     !uid && 'UID'
    //   }`;

    // Check if token's pid and clientId is match
    const base64Payload = accessToken.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    const { pid } = JSON.parse(payload.toString());
    if (!pid || pid !== this.clientId) return null;

    // 2. Call to get tokens (accessToken, refreshToken)
    // const { accessToken, refreshToken } = await axios.post(`${baseURL}/oauth/token`)
    // 3. Save them to storage
    await localStorage.setItem(`furo-${this.clientId}-token`, accessToken);
    await localStorage.setItem(`furo-${this.clientId}-refresh`, refreshToken);

    return {};
  }

  async checkSession(options) {
    // check if the storage has
    return await sessionStorage.getItem(`furo-${this.clientId}-token`);
  }

  async getTokenSilently(options) {
    // 1. If there's a valid token stored, return it.
    // 2. If not, open an iframe with '/authorize' URL and get the new token
  }

  async refreshTokenSilently(options) {
    const refreshToken = await localStorage.getItem(`furo-${this.clientId}-refresh`);
    if (!refreshToken) return null;
    const accessToken = await localStorage.getItem(`furo-${this.clientId}-token`);
    const { data } = await axios.post(`/sessions/token/refresh`, {
      accessToken
    }, {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    const { access_token, refresh_token } = data;
    await localStorage.setItem(`furo-${this.clientId}-token`, access_token);
    await localStorage.setItem(`furo-${this.clientId}-refresh`, refresh_token);
    return { access_token, refresh_token };
  }

  async logout(options) {
    await localStorage.removeItem(`furo-${this.clientId}-token`);
    await localStorage.removeItem(`furo-${this.clientId}-refresh`);
    await localStorage.removeItem('furo-user');
    return {};
  }

  async loginWithKakao(KAKAO_REST_API_KEY) {
    if (!KAKAO_REST_API_KEY) throw 'API KEY is empty';
    const redirectUri = encodeURIComponent(
      `${FURO_AUTH_URL}/oauth/kakao/${this.clientId}`,
    );
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = url;
  }
}

// --------UTILS------

// export const getCrypto = () => {
//     //ie 11.x uses msCrypto
//     return (window.crypto || (window as any).msCrypto) as Crypto;
//   };

//   export const validateCrypto = () => {
//     if (!getCrypto()) {
//       throw new Error(
//         'For security reasons, `window.crypto` is required to run `auth0-spa-js`.'
//       );
//     }
//     if (typeof getCryptoSubtle() === 'undefined') {
//       throw new Error(`
//         auth0-spa-js must run on a secure origin. See https://github.com/auth0/auth0-spa-js/blob/master/FAQ.md#why-do-i-get-auth0-spa-js-must-run-on-a-secure-origin for more information.
//       `);
//     }
//   };
