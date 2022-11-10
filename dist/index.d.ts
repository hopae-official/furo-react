export declare interface FuroProviderOptions {
  domain: string;
  clientId: string;
  redirectUri: string;
  children?: React.ReactNode;
}

export declare function FuroProvider(options: FuroProviderOptions): JSX.Element

export declare function useFuro(): {
    loginWithRedirect: () => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any;
};