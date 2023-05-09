export interface IOAuthService {
  handleAuthentication(code: string, providerType: string): Promise<void>;
}
