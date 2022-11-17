export declare interface FuroProviderOptions {
  domain: string;
  clientId: string;
  redirectUri: string;
  apiUrl?: string;
  children?: React.ReactNode;
}

export declare function FuroProvider(options: FuroProviderOptions): JSX.Element

export declare function useFuro(): {
    getAccessTokenSilently: () => void;
    loginWithRedirect: () => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any;
};